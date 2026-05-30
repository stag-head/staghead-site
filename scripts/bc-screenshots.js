#!/usr/bin/env node
/**
 * Budget Pro — AppSource screenshot capture
 *
 * SETUP (one-time):
 *   cd scripts && npm install && npx playwright install chromium
 *
 * USAGE:
 *   node bc-screenshots.js                   # all shots, all users
 *   node bc-screenshots.js penny             # Penny's shots only
 *   node bc-screenshots.js penny steve       # multiple users
 *   node bc-screenshots.js --login           # force fresh login for all users
 *   node bc-screenshots.js --login sam       # force fresh login for Sam only
 *   node bc-screenshots.js penny --debug     # slow mode, browser visible
 *
 * REQUIRED DATA STATE IN BC BEFORE RUNNING:
 *   - Budget Approval Setup configured (approval dimension + values)
 *   - FY2027 Budget Cycle exists
 *   - SALES-SAM assignment exists, owner = Sam Sales, approver = Steve Strategy
 *   - SALES-RACHEL assignment exists, owner = Rachel Revenue, approver = Steve Strategy
 *   - SALES-STEVE assignment exists, owner = Steve Strategy, approver = Penny Profit
 *   - Budget entries exist on SALES-STEVE (for the entries shot)
 *   For Pending Approval shots: SALES-SAM must be in Pending Approval status
 *   For all-Approved shots: all three must be Approved
 *   For In Review shot: FY2027 cycle must be in In Review status
 *   — You may need to run the script in stages and adjust data between runs.
 */

'use strict';

const { chromium } = require('playwright');
const path = require('path');
const fs   = require('fs');

// ── Config — update these before running ─────────────────────────────────────

const TENANT  = '3d5a8a6c-9bfb-4ae9-8764-17e51813df8b';
const ENV     = 'SH-Sandbox';
const COMPANY = 'CRONUS New Zealand Ltd.'; // ← check via BC URL after login if unsure

const USERS = {
  penny:  { label: 'Penny Profit',   role: 'Finance Manager',   email: 'penny@staghead.nz' },
  steve:  { label: 'Steve Strategy', role: 'Dept Head',         email: 'steve@staghead.nz' },
  sam:    { label: 'Sam Sales',      role: 'Salesperson',       email: 'sam@staghead.nz'   },
  rachel: { label: 'Rachel Revenue', role: 'Salesperson',       email: 'rachel@staghead.nz'},
};

// ── Paths ─────────────────────────────────────────────────────────────────────

const BC       = `https://businesscentral.dynamics.com/${TENANT}/${ENV}`;
const AUTH_DIR = path.join(__dirname, '.auth');
const OUT_DIR  = path.join(__dirname, '..', 'assets', 'screenshots');
const DBG_DIR  = path.join(__dirname, '.debug');

// ── BC page IDs ───────────────────────────────────────────────────────────────

const PAGE = {
  APPROVAL_SETUP:  73382687,
  ASSIGNMENT_LIST: 73382688,
  CYCLE_LIST:      73382690,
  WORK_QUEUE:      73382695,
};

// ── BC helpers ────────────────────────────────────────────────────────────────

function bcUrl(pageId) {
  return `${BC}/?company=${encodeURIComponent(COMPANY)}&page=${pageId}`;
}

/**
 * Wait for BC to finish loading. BC is a heavy SPA with multiple loading phases:
 *   1. Initial network activity settles
 *   2. aria-busy clears on the main content container
 *   3. Any visible spinner/loading bar disappears
 *   4. Final render settle
 */
async function waitForBC(page, timeout = 30_000) {
  const deadline = Date.now() + timeout;

  // Phase 1 — network quiet
  try {
    await page.waitForLoadState('networkidle', { timeout: Math.min(15_000, deadline - Date.now()) });
  } catch { /* carry on — BC sometimes keeps connections open */ }

  // Phase 2 — aria-busy cleared (BC sets this while rendering page content)
  try {
    await page.locator('[aria-busy="true"]')
      .waitFor({ state: 'hidden', timeout: Math.min(10_000, deadline - Date.now()) });
  } catch {}

  // Phase 3 — loading bar / spinner gone
  try {
    await page.locator([
      '.ms-Spinner',
      '[class*="loadingIndicator"]',
      '[class*="loading-indicator"]',
      '[data-testid*="loading"]',
    ].join(', ')).waitFor({ state: 'hidden', timeout: Math.min(8_000, deadline - Date.now()) });
  } catch {}

  // Phase 4 — let BC finish painting and any CSS transitions settle
  await page.waitForTimeout(1800);
}

/**
 * Navigate to a BC page by ID and wait for it to load.
 */
async function goto(page, pageId) {
  await page.goto(bcUrl(pageId), { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await waitForBC(page);
  await guardSession(page);
}

/**
 * Check the page hasn't drifted to a login or error screen.
 * Throws if the session has expired mid-run.
 */
async function guardSession(page) {
  const url = page.url();
  if (url.includes('login.microsoftonline.com') || url.includes('login.live.com')) {
    throw new Error(`Session expired — delete .auth/ and re-run to log in again.`);
  }
}

/**
 * Dismiss common BC notification banners / dialogs that can obscure content.
 */
async function dismissBC(page) {
  const selectors = [
    // "Welcome" tour / "What's new" dialog
    'button[aria-label="Close"]',
    'button[title="Close"]',
    // Notification bar X button
    '[class*="notification"] button[class*="close"]',
    '[class*="messageBar"] button[class*="close"]',
    // "You've been inactive" session warning
    'button:has-text("Continue")',
    'button:has-text("Stay signed in")',
  ];
  for (const sel of selectors) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 800 })) {
        await el.click({ timeout: 2000 });
        await page.waitForTimeout(400);
      }
    } catch {}
  }
}

/**
 * Open a row in a BC list by matching text in any cell, then wait for the card.
 * Falls back to the first row if text is empty.
 */
async function openRow(page, text) {
  let row;
  if (text) {
    row = page.locator('table tbody tr').filter({ hasText: text }).first();
  } else {
    row = page.locator('table tbody tr').first();
  }
  await row.waitFor({ state: 'visible', timeout: 15_000 });
  await row.dblclick();
  await waitForBC(page);
  await guardSession(page);
}

/**
 * Click a BC action bar button by its visible label.
 * Tries the promoted action first, then looks inside any "More" / "..." dropdown.
 */
async function clickAction(page, label) {
  // 1. Try promoted action (directly visible in the ribbon)
  const promoted = page.locator([
    `button:has-text("${label}")`,
    `[data-value="${label}"]`,
    `[title="${label}"]`,
    `[aria-label="${label}"]`,
  ].join(', ')).first();

  if (await promoted.isVisible({ timeout: 3_000 })) {
    await promoted.click();
    await waitForBC(page);
    return;
  }

  // 2. Try opening the "More options" / "..." overflow menu
  const more = page.locator('button[title="More options"], button[aria-label="More options"], button:has-text("...")').first();
  if (await more.isVisible({ timeout: 2_000 })) {
    await more.click();
    await page.waitForTimeout(500);
    const item = page.locator(`[role="menuitem"]:has-text("${label}"), li:has-text("${label}")`).first();
    await item.waitFor({ state: 'visible', timeout: 5_000 });
    await item.click();
    await waitForBC(page);
    return;
  }

  throw new Error(`Action "${label}" not found in ribbon or overflow menu`);
}

/**
 * Retry wrapper — re-runs fn up to `attempts` times on failure.
 */
async function withRetry(fn, attempts = 3, delayMs = 2000) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); }
    catch (e) {
      lastErr = e;
      if (i < attempts - 1) {
        log(`  ⚠  Retrying (${i + 1}/${attempts - 1})…`);
        await new Promise(r => setTimeout(r, delayMs));
      }
    }
  }
  throw lastErr;
}

// ── Screenshot capture ────────────────────────────────────────────────────────

async function shot(page, filename, label) {
  await dismissBC(page);
  // Scroll to top so we always get the same framing
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  const filepath = path.join(OUT_DIR, filename);
  await page.screenshot({ path: filepath, fullPage: false });
  log(`  ✓  [${filename}] ${label}`);
}

async function shotWithDebug(page, filename, label, user) {
  try {
    await shot(page, filename, label);
  } catch (e) {
    const debugFile = path.join(DBG_DIR, `FAIL-${user}-${filename}`);
    fs.mkdirSync(DBG_DIR, { recursive: true });
    await page.screenshot({ path: debugFile, fullPage: true });
    log(`  ✗  [${filename}] ${label} — FAILED (debug screenshot saved)`);
    log(`     ${e.message}`);
  }
}

// ── Login ─────────────────────────────────────────────────────────────────────

async function ensureLogin(browser, user, forceLogin = false) {
  const authFile = path.join(AUTH_DIR, `${user}.json`);
  const { label, role, email } = USERS[user];

  if (!forceLogin && fs.existsSync(authFile)) {
    return;
  }

  log('');
  log(`┌─────────────────────────────────────────────────────────┐`);
  log(`│  Login required: ${label.padEnd(39)}│`);
  log(`│  Role: ${role.padEnd(49)}│`);
  log(`│  Sign in as: ${email.padEnd(43)}│`);
  log(`│                                                         │`);
  log(`│  1. The browser will open at the BC login page          │`);
  log(`│  2. Sign in with the account above (handle MFA as       │`);
  log(`│     normal — the browser is real and fully interactive) │`);
  log(`│  3. Wait until BC fully loads (you see the Role Center) │`);
  log(`│  4. Come back here and press ENTER                      │`);
  log(`└─────────────────────────────────────────────────────────┘`);

  const ctx  = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(BC);

  // Wait for Enter key from the user
  await new Promise(resolve => {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdout.write('\n  Press ENTER when BC has fully loaded → ');
    process.stdin.once('data', () => { process.stdin.pause(); resolve(); });
  });

  await waitForBC(page);
  await ctx.storageState({ path: authFile });
  await ctx.close();
  log(`  ✓  Session saved for ${label}\n`);
}

// ── Shot definitions ──────────────────────────────────────────────────────────
//
// Each session is a function that receives an open page and takes its shots.
// Keep each shot in withRetry() so transient BC flakiness doesn't abort the run.

async function shotsPenny(page) {
  log('\n── Penny Profit (Finance Manager / Admin) ──────────────────');

  // 1. Budget Approval Setup card
  await withRetry(async () => {
    await goto(page, PAGE.APPROVAL_SETUP);
    await shotWithDebug(page, '01-approval-setup.png', 'Budget Approval Setup card', 'penny');
  });

  // 2. FY2027 Budget Cycle card — should be status Collecting
  await withRetry(async () => {
    await goto(page, PAGE.CYCLE_LIST);
    await openRow(page, 'FY2027');
    await shotWithDebug(page, '02-cycle-card-collecting.png', 'FY2027 Cycle card (Collecting)', 'penny');
  });

  // 3. Budget Assignment List — admin view showing all three assignments
  await withRetry(async () => {
    await goto(page, PAGE.ASSIGNMENT_LIST);
    await shotWithDebug(page, '03-assignment-list-admin.png', 'Assignment List — Penny admin view (all 3 rows)', 'penny');
  });

  // 4. SALES-SAM assignment card (shows card layout + fields)
  await withRetry(async () => {
    await goto(page, PAGE.ASSIGNMENT_LIST);
    await openRow(page, 'SALES-SAM');
    await shotWithDebug(page, '04-assignment-card-sam.png', 'Budget Assignment Card (SALES-SAM)', 'penny');
  });

  // 5. Assignment List — all three Approved (run after approval workflow complete)
  await withRetry(async () => {
    await goto(page, PAGE.ASSIGNMENT_LIST);
    await shotWithDebug(page, '05-assignment-list-all-approved.png', 'Assignment List — all Approved', 'penny');
  });

  // 6. FY2027 Cycle card — In Review status (run after cycle progressed)
  await withRetry(async () => {
    await goto(page, PAGE.CYCLE_LIST);
    await openRow(page, 'FY2027');
    await shotWithDebug(page, '06-cycle-card-in-review.png', 'FY2027 Cycle card (In Review)', 'penny');
  });
}

async function shotsSteve(page) {
  log('\n── Steve Strategy (Dept Head / Approver) ───────────────────');

  // 7. Budget Assignment List — Steve's view (sees his own + Sam + Rachel as approver)
  await withRetry(async () => {
    await goto(page, PAGE.ASSIGNMENT_LIST);
    await shotWithDebug(page, '07-assignment-list-steve.png', 'Assignment List — Steve view (3 rows: own + 2 approver)', 'steve');
  });

  // 8. Approver Work Queue — Sam and Rachel pending
  await withRetry(async () => {
    await goto(page, PAGE.WORK_QUEUE);
    await shotWithDebug(page, '08-approver-work-queue.png', 'Approver Work Queue (Sam + Rachel pending)', 'steve');
  });

  // 9. SALES-STEVE assignment card with Budget Entries open
  await withRetry(async () => {
    await goto(page, PAGE.ASSIGNMENT_LIST);
    await openRow(page, 'SALES-STEVE');
    await clickAction(page, 'Budget Entries');
    await shotWithDebug(page, '09-budget-entries-steve.png', 'Budget Entries — SALES-STEVE dept expenses', 'steve');
  });
}

async function shotsSam(page) {
  log('\n── Sam Sales (Salesperson / Budget Owner) ──────────────────');

  // 10. Assignment List — Sam's scoped view (ONE row only — the key privacy shot)
  await withRetry(async () => {
    await goto(page, PAGE.ASSIGNMENT_LIST);
    await shotWithDebug(page, '10-assignment-list-sam-scoped.png', 'Assignment List — Sam scoped view (1 row only)', 'sam');
  });

  // 11. Sam's assignment card — Pending Approval status (after she has submitted)
  await withRetry(async () => {
    await goto(page, PAGE.ASSIGNMENT_LIST);
    await openRow(page, ''); // first (only) row
    await shotWithDebug(page, '11-assignment-card-pending-approval.png', "Sam's card — Pending Approval status", 'sam');
  });
}

async function shotsRachel(page) {
  log('\n── Rachel Revenue (Salesperson / Budget Owner) ─────────────');

  // 12. Assignment List — Rachel's scoped view (ONE row only)
  await withRetry(async () => {
    await goto(page, PAGE.ASSIGNMENT_LIST);
    await shotWithDebug(page, '12-assignment-list-rachel-scoped.png', 'Assignment List — Rachel scoped view (1 row only)', 'rachel');
  });
}

// ── Session runner ────────────────────────────────────────────────────────────

async function runSession(browser, user, shotsFn, debug) {
  const authFile = path.join(AUTH_DIR, `${user}.json`);
  if (!fs.existsSync(authFile)) {
    log(`  ⚠  Skipping ${USERS[user].label} — no saved session (run --login first)`);
    return;
  }

  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    storageState: authFile,
  });
  const page = await ctx.newPage();

  // Slow down in debug mode so you can see what's happening
  if (debug) page.setDefaultTimeout(60_000);

  try {
    await shotsFn(page);
  } catch (e) {
    await ctx.close();
    await browser.close();

    log('');
    log('╔══════════════════════════════════════════════════════════╗');
    log(`║  ✗  Shot failed for ${USERS[user].label.padEnd(35)}║`);
    log('╠══════════════════════════════════════════════════════════╣');

    if (e.message.includes('locator(') && e.message.includes('hasText')) {
      const m = e.message.match(/hasText: '([^']+)'/);
      const needle = m ? m[1] : '(unknown)';
      log(`║  Could not find a row matching: "${needle}"             `);
      log('║                                                          ');
      log('║  The required BC data does not exist yet. Set up:        ');
      log('║    - Budget Cycle "FY2027"                               ');
      log('║    - Budget Assignments: SALES-SAM, SALES-RACHEL,        ');
      log('║      SALES-STEVE (with correct owners + approvers)       ');
      log('║    - Budget entries on SALES-STEVE                       ');
    } else {
      log(`║  ${e.message.slice(0, 55).padEnd(55)}║`);
    }

    log('╚══════════════════════════════════════════════════════════╝');
    log('');
    process.exit(1);
  }
  await ctx.close();
}

// ── CLI + main ────────────────────────────────────────────────────────────────

function log(msg) { console.log(msg); }

(async () => {
  const args    = process.argv.slice(2);
  const debug   = args.includes('--debug');
  const doLogin = args.includes('--login');
  const userArgs = args.filter(a => !a.startsWith('--'));

  // Which users to run — default: all
  const allUsers  = ['penny', 'steve', 'sam', 'rachel'];
  const runUsers  = userArgs.length > 0
    ? userArgs.filter(u => allUsers.includes(u))
    : allUsers;

  if (runUsers.length === 0) {
    log('No recognised users specified. Valid: penny, steve, sam, rachel');
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR,  { recursive: true });
  fs.mkdirSync(AUTH_DIR, { recursive: true });

  // ── Login phase — always uses a visible browser so you can sign in ──────────
  log('\n═══ Login phase ════════════════════════════════════════════');
  const loginNeeded = runUsers.some(u => doLogin || !fs.existsSync(path.join(AUTH_DIR, `${u}.json`)));
  if (loginNeeded) {
    const loginBrowser = await chromium.launch({ headless: false, slowMo: 0 });
    for (const user of runUsers) {
      await ensureLogin(loginBrowser, user, doLogin);
    }
    await loginBrowser.close();
  } else {
    for (const user of runUsers) {
      log(`  ✓  ${USERS[user].label} — using saved session`);
    }
  }

  const browser = await chromium.launch({ headless: !debug, slowMo: debug ? 500 : 0 });

  // ── Screenshot phase ─────────────────────────────────────────────────────────
  log('\n═══ Screenshot phase ═══════════════════════════════════════');

  const sessionMap = {
    penny:  shotsPenny,
    steve:  shotsSteve,
    sam:    shotsSam,
    rachel: shotsRachel,
  };

  for (const user of runUsers) {
    await runSession(browser, user, sessionMap[user], debug);
  }

  await browser.close();

  // ── Summary ──────────────────────────────────────────────────────────────────
  const taken = fs.existsSync(OUT_DIR)
    ? fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.png'))
    : [];

  log('\n═══ Done ═══════════════════════════════════════════════════');
  log(`  ${taken.length} screenshot(s) in assets/screenshots/`);
  if (fs.existsSync(DBG_DIR) && fs.readdirSync(DBG_DIR).length > 0) {
    log(`  ⚠  Some shots failed — debug screenshots in scripts/.debug/`);
  }
  log('');
  log('  Capture manually:');
  log('  • 13-excel-export.png — Excel workbook open showing the exported budget');
  log('');
  log('  Next: drop the PNGs into the <figure> blocks in help.html and walkthrough.html');
})();
