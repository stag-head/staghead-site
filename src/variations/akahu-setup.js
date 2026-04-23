/* Akahu Banking for Business Central — Setup Help Page */
window.SH_AkahuSetup = function () {
  return `
<div class="akahu-consumer">

  <section class="shell akc-hero">
    <div class="akc-hero__text">
      <p class="eyebrow"><span class="bar"></span> Setup Guide</p>
      <h1>Setting Up Akahu Open&nbsp;Banking</h1>
      <p class="akc-lead">Step-by-step instructions for connecting Microsoft Dynamics&nbsp;365 Business Central to Akahu. The guided setup wizard inside Business Central will walk you through each step — this page provides additional detail and troubleshooting help.</p>
    </div>
    <div class="akc-hero__meta">
      <div class="akc-badge">
        <span class="akc-badge__label">Estimated time</span>
        <span class="akc-badge__value">5–10 minutes</span>
      </div>
      <div class="akc-badge">
        <span class="akc-badge__label">BC permission required</span>
        <span class="akc-badge__value">SUPER or Akahu Edit</span>
      </div>
      <div class="akc-badge">
        <span class="akc-badge__label">External account required</span>
        <span class="akc-badge__value">Akahu · my.akahu.nz</span>
      </div>
    </div>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 01 · Before you begin</span>
      <h2>Prerequisites</h2>
    </div>
    <ul class="akc-benefits">
      <li class="akc-benefit">
        <span class="akc-benefit__icon">①</span>
        <div>
          <h4>An Akahu account with your bank accounts connected</h4>
          <p>If you haven't already, create an account at <a href="https://my.akahu.nz" target="_blank" rel="noopener">my.akahu.nz</a> and connect the bank accounts you want to use with Business Central. Akahu supports all major New Zealand banks.</p>
        </div>
      </li>
      <li class="akc-benefit">
        <span class="akc-benefit__icon">②</span>
        <div>
          <h4>Administrator access to your Business Central company</h4>
          <p>The setup wizard requires you to register a Stag Head service application in BC's Microsoft Entra Applications settings. This step requires a BC user with SUPER permissions or equivalent administrator access.</p>
        </div>
      </li>
      <li class="akc-benefit">
        <span class="akc-benefit__icon">③</span>
        <div>
          <h4>The Akahu Open Banking extension installed</h4>
          <p>Install the extension from Microsoft AppSource via Business Central's Extension Management page. Once installed, search for <strong>Assisted Setup</strong> in the Tell Me search bar and select <em>Set Up Akahu Open Banking</em> to launch the wizard.</p>
        </div>
      </li>
    </ul>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 02 · Wizard walkthrough</span>
      <h2>Step by step</h2>
    </div>
    <div class="akc-grid">
      <div class="akc-card">
        <span class="akc-card__num">01</span>
        <h4>Welcome</h4>
        <p>Review the overview and prerequisites. Click <strong>Next</strong> when you are ready to begin.</p>
      </div>
      <div class="akc-card">
        <span class="akc-card__num">02</span>
        <h4>Authorise the Stag Head Service</h4>
        <p>The Stag Head service needs one-time permission to write data back into your BC company — for storing your Akahu token and updating payment statuses.</p>
        <p style="margin-top:10px">Click <strong>Open Microsoft Entra Applications</strong> in the wizard. Create a new entry, set the <strong>Client ID</strong> to the Stag Head App ID shown on screen, and set <strong>State</strong> to Enabled. Then add the <strong>Akahu Service</strong> permission set in the User Permission Sets section on the same card.</p>
        <p style="margin-top:10px"><strong>Do not click Grant Consent.</strong> That button is for a different scenario — clicking it will produce an error. The required permissions have already been granted in Azure by Stag Head and no action is needed from you.</p>
        <p style="margin-top:10px">Return to the wizard and click <strong>Refresh Status</strong> to confirm and continue.</p>
      </div>
      <div class="akc-card">
        <span class="akc-card__num">03</span>
        <h4>Connect to Akahu</h4>
        <p>Click <strong>Open Akahu Authorisation Page</strong>. Your browser will open Akahu's authorisation flow — log in to Akahu, select the bank accounts you want to share, and approve access.</p>
        <p style="margin-top:10px">Once you have finished in the browser, return to BC and click <strong>I've completed the authorisation</strong>. The wizard will confirm the connection was established before allowing you to continue.</p>
      </div>
      <div class="akc-card">
        <span class="akc-card__num">04</span>
        <h4>Map Bank Accounts</h4>
        <p>Click <strong>Open Akahu Accounts</strong> to open the Akahu Account List. For each Akahu account you want to use, set the <strong>BC Bank Account No.</strong> field to the corresponding Business Central bank account.</p>
        <p style="margin-top:10px">At least one mapping is required before you can continue. Click <strong>Refresh</strong> once you have mapped at least one account.</p>
      </div>
      <div class="akc-card">
        <span class="akc-card__num">05</span>
        <h4>Payment Settings</h4>
        <p>Choose a <strong>Payment Method Code</strong> to identify Akahu payments on vendor cards and payment journals. The default is <code>AKAHU</code> — the wizard will create this code automatically if it doesn't already exist.</p>
        <p style="margin-top:10px">Optionally set a <strong>Maximum Payment Amount</strong> as a safety limit on individual Akahu payments. Set to 0 for no limit.</p>
      </div>
      <div class="akc-card">
        <span class="akc-card__num">06</span>
        <h4>Test Connection</h4>
        <p>Click <strong>Test Connection</strong> to verify that Business Central can reach Akahu using your connected account. A successful test confirms your tokens are valid and the integration is working correctly.</p>
      </div>
      <div class="akc-card">
        <span class="akc-card__num">07</span>
        <h4>Finish</h4>
        <p>Click <strong>Finish</strong> to save your settings. The Akahu payment method code is created and the setup is recorded as complete in Business Central's Assisted Setup checklist.</p>
      </div>
    </div>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 03 · After setup</span>
      <h2>What you can do now</h2>
    </div>
    <ul class="akc-benefits">
      <li class="akc-benefit">
        <span class="akc-benefit__icon">↓</span>
        <div>
          <h4>Import bank transactions</h4>
          <p>Open a <strong>Bank Account Reconciliation</strong> in BC and use the <strong>Import from Akahu</strong> action to pull in transactions from your connected accounts. Transactions are matched against existing entries automatically.</p>
        </div>
      </li>
      <li class="akc-benefit">
        <span class="akc-benefit__icon">↗</span>
        <div>
          <h4>Pay vendors via Akahu</h4>
          <p>Run <strong>Suggest Vendor Payments</strong> in a payment journal and use the <strong>Post &amp; Pay via Akahu</strong> action to submit payments directly from Business Central without logging into your bank portal.</p>
        </div>
      </li>
      <li class="akc-benefit">
        <span class="akc-benefit__icon">◎</span>
        <div>
          <h4>Monitor payment status</h4>
          <p>Search for <strong>Akahu Payments</strong> in Tell Me to open the payments list. Payment statuses update automatically as Akahu processes each payment — no manual refresh needed.</p>
        </div>
      </li>
    </ul>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 04 · Troubleshooting</span>
      <h2>Common issues</h2>
    </div>
    <table class="akc-table">
      <thead>
        <tr>
          <th>Issue</th>
          <th>What to check</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Step 3 — token not received after authorising in browser</td>
          <td>Confirm the <strong>Function App Base URL</strong> is set correctly in the Akahu Setup page (search in Tell Me). This URL must be reachable from the internet for the callback to succeed.</td>
        </tr>
        <tr>
          <td>Test connection fails</td>
          <td>Open the <strong>Akahu Setup</strong> page and verify that both the App Token and User Token fields are populated. The User Token is written automatically during the OAuth step — if it is blank, repeat step 3.</td>
        </tr>
        <tr>
          <td>No accounts appear in the Akahu Account List</td>
          <td>Use the <strong>Sync Accounts</strong> action on the Akahu Account List page to pull the latest account list from Akahu. Accounts must be connected in your Akahu account at my.akahu.nz before they will appear.</td>
        </tr>
        <tr>
          <td>Payment status is not updating</td>
          <td>Use the <strong>Refresh Status</strong> action on the Akahu Payments page to manually request the current status from Akahu. If this also fails, check that the Function App is running and that the webhook URL is registered with Akahu.</td>
        </tr>
        <tr>
          <td>HttpClient requests blocked</td>
          <td>In BC's <strong>Extension Management</strong> page, find the Akahu Open Banking extension, open Configure → Extension Settings, and enable <strong>Allow HttpClient Requests</strong>.</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="akc-akahu-band">
    <div class="shell akc-akahu-inner">
      <div class="akc-akahu-logo">
        <div class="akc-akahu-logo__mark">
          <img src="assets/akahu-logo.png" alt="Akahu" width="64" height="64">
        </div>
        <span class="akc-akahu-logo__name">Akahu</span>
      </div>
      <div class="akc-akahu-copy">
        <h3>Powered by Akahu</h3>
        <p>This application uses <a href="https://akahu.nz" target="_blank" rel="noopener">Akahu</a> as its open banking platform. Akahu is New Zealand's secure open banking intermediary — it manages your bank connections, handles authorisation, and retrieves financial data on your behalf. Stag Head Ltd does not store your bank credentials at any point.</p>
        <p>You can review and revoke access to your bank accounts at any time through <a href="https://my.akahu.nz" target="_blank" rel="noopener">my.akahu.nz</a>. Revoking access in Akahu will stop all future transaction imports and payment submissions.</p>
      </div>
    </div>
  </section>

  <footer class="v2-foot shell">
    <div><span class="mono">Stag Head Ltd · Akahu Banking for Business Central</span></div>
    <div class="mono">Need help? <a href="mailto:craig@staghead.nz">craig@staghead.nz</a></div>
  </footer>

</div>
  `;
};
