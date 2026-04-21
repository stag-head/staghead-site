/* Akahu Banking for Business Central — Consumer Information Page */
window.SH_AkahuConsumer = function () {
  return `
<div class="akahu-consumer">

  <section class="shell akc-hero">
    <div class="akc-hero__text">
      <p class="eyebrow"><span class="bar"></span> Consumer Information</p>
      <h1>Akahu Banking<br>for Business Central</h1>
      <p class="akc-lead">Connect your New Zealand bank accounts directly to Microsoft Dynamics&nbsp;365 Business Central — no more manual statement downloads.</p>
    </div>
    <div class="akc-hero__meta">
      <div class="akc-badge">
        <span class="akc-badge__label">Published by</span>
        <span class="akc-badge__value">Stag Head Ltd</span>
      </div>
      <div class="akc-badge">
        <span class="akc-badge__label">Platform</span>
        <span class="akc-badge__value">Microsoft Dynamics 365 Business Central</span>
      </div>
      <div class="akc-badge">
        <span class="akc-badge__label">Access type</span>
        <span class="akc-badge__value">Read-only · no payment initiation</span>
      </div>
    </div>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 01 · How you benefit</span>
      <h2>What this extension does for your business</h2>
    </div>
    <ul class="akc-benefits">
      <li class="akc-benefit">
        <span class="akc-benefit__icon">↓</span>
        <div>
          <h4>Automatic transaction import</h4>
          <p>Bank transactions are pulled directly into Business Central's bank reconciliation workflow, removing the need to manually download and upload bank statements.</p>
        </div>
      </li>
      <li class="akc-benefit">
        <span class="akc-benefit__icon">◎</span>
        <div>
          <h4>Real-time account balances</h4>
          <p>Current and available balances are visible inside Business Central without needing to log into your online banking portal.</p>
        </div>
      </li>
      <li class="akc-benefit">
        <span class="akc-benefit__icon">⇄</span>
        <div>
          <h4>Faster reconciliation</h4>
          <p>Transaction data — including NZ-specific particulars, code, and reference fields — is matched against invoices and payments already recorded in Business Central.</p>
        </div>
      </li>
      <li class="akc-benefit">
        <span class="akc-benefit__icon">⚙</span>
        <div>
          <h4>Flexible sync</h4>
          <p>Transactions can be synced automatically on a schedule, or manually on demand — controlled by a setting inside the application.</p>
        </div>
      </li>
      <li class="akc-benefit akc-benefit--soon">
        <span class="akc-benefit__icon">↗</span>
        <div>
          <h4>Vendor invoice payments <span class="akc-soon-pill">Coming soon</span></h4>
          <p>Pay vendor invoices directly from Business Central — approve and submit payments to your bank without leaving your accounting system.</p>
        </div>
      </li>
    </ul>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 02 · Scope of access</span>
      <h2>What data is accessed — and what is not</h2>
      <p class="akc-section__note">The extension requests <strong>read-only</strong> access. No payment initiation or write access to your bank accounts is requested or used at any time.</p>
    </div>
    <table class="akc-table">
      <thead>
        <tr>
          <th>Data</th>
          <th>Detail</th>
          <th>Access</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Account list</td>
          <td>Account names, numbers, balances, and account type</td>
          <td><span class="akc-pill akc-pill--read">Read</span></td>
        </tr>
        <tr>
          <td>Transaction history</td>
          <td>Date, amount, description, merchant information, and NZ payment reference fields (particulars, code, reference)</td>
          <td><span class="akc-pill akc-pill--read">Read</span></td>
        </tr>
        <tr class="akc-table__no">
          <td>Payment initiation</td>
          <td>Creating or approving payments from your accounts</td>
          <td><span class="akc-pill akc-pill--none">Not requested</span></td>
        </tr>
        <tr class="akc-table__no">
          <td>Login credentials</td>
          <td>Your bank username or password</td>
          <td><span class="akc-pill akc-pill--none">Not accessed</span></td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 03 · Duration &amp; data retention</span>
      <h2>How long access lasts and where your data goes</h2>
    </div>
    <div class="akc-grid">
      <div class="akc-card">
        <span class="akc-card__num">01</span>
        <h4>Ongoing access</h4>
        <p>Access is ongoing — the extension continuously syncs new transactions until you choose to revoke access or uninstall the extension.</p>
      </div>
      <div class="akc-card">
        <span class="akc-card__num">02</span>
        <h4>Data stays in your environment</h4>
        <p>Transaction data is stored within your own Business Central environment and is subject to your own data retention practices — not held by Stag Head Ltd.</p>
      </div>
      <div class="akc-card">
        <span class="akc-card__num">03</span>
        <h4>Cancel any time</h4>
        <p>The extension can be removed at any time from Business Central. Removal immediately ends all future data access via Akahu.</p>
      </div>
      <div class="akc-card">
        <span class="akc-card__num">04</span>
        <h4>No prior history imported</h4>
        <p>Only transactions that occur after you connect are synced. Existing transaction history in your bank account is not imported.</p>
      </div>
    </div>
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
        <p>This application uses <a href="https://akahu.nz" target="_blank" rel="noopener">Akahu</a> as its open banking platform. Akahu is the secure intermediary between your bank and this application — it manages bank connections, handles authorisation, and retrieves your financial data on your behalf.</p>
        <p>Stag Head Ltd's extension communicates with Akahu's API using tokens you have explicitly authorised. At no point does the application access your bank login credentials directly.</p>
        <p>To connect your bank accounts, you will be guided through Akahu's authorisation process. You can review and revoke access at any time through <a href="https://my.akahu.nz" target="_blank" rel="noopener">my.akahu.nz</a>.</p>
      </div>
    </div>
  </section>

  <footer class="v2-foot shell">
    <div><span class="mono">Stag Head Ltd · Akahu Banking for Business Central</span></div>
    <div class="mono">© 2026 · All rights reserved</div>
  </footer>

</div>
  `;
};
