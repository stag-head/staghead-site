/* Akahu Banking for Business Central: Privacy Statement */
window.SH_AkahuPrivacy = function () {
  const updated = '24 April 2026';
  return `
<div class="akahu-consumer">

  <section class="shell akc-hero">
    <div class="akc-hero__text">
      <p class="eyebrow"><span class="bar"></span> Legal</p>
      <h1>Privacy Statement</h1>
      <p class="akc-lead">This statement explains what information Stag Head Limited collects when you use the Akahu Open Banking Integration, how it is used, where it is stored, and what your rights are under the New Zealand Privacy Act&nbsp;2020.</p>
    </div>
    <div class="akc-hero__meta">
      <div class="akc-badge">
        <span class="akc-badge__label">Controller</span>
        <span class="akc-badge__value">Stag Head Limited</span>
      </div>
      <div class="akc-badge">
        <span class="akc-badge__label">Last updated</span>
        <span class="akc-badge__value">${updated}</span>
      </div>
      <div class="akc-badge">
        <span class="akc-badge__label">Applicable law</span>
        <span class="akc-badge__value">NZ Privacy Act 2020</span>
      </div>
    </div>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 01</span>
      <h2>Who We Are</h2>
    </div>
    <div class="akc-legal-body">
      <p><strong>Stag Head Limited</strong> (Companies Register No. 6750773, NZBN 9429046638891) is the publisher of the Akahu Open Banking Integration extension for Microsoft Dynamics&nbsp;365 Business Central. We are a New Zealand limited company and are the agency responsible for personal information collected in connection with this extension.</p>
      <p>References to <strong>"we"</strong>, <strong>"us"</strong>, or <strong>"Stag Head"</strong> in this statement mean Stag Head Limited. References to <strong>"you"</strong> or <strong>"your"</strong> mean the organisation or individual using the extension.</p>
    </div>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 02</span>
      <h2>What the Extension Does</h2>
    </div>
    <div class="akc-legal-body">
      <p>The extension connects your Microsoft Business Central environment to Akahu, New Zealand's open banking platform. It enables two things:</p>
      <ul class="akc-legal-list">
        <li><strong>Transaction import</strong> — bank transactions from your Akahu-connected accounts are fetched and imported into Business Central bank reconciliations.</li>
        <li><strong>Vendor payments</strong> — payment instructions are submitted from Business Central to Akahu, which processes them through your connected bank account.</li>
      </ul>
      <p>Stag Head operates a small set of Azure cloud services to act as a bridge between Business Central and Akahu. These services handle the OAuth2 authorisation flow and route payment status updates back to your Business Central company. They do not store your financial data.</p>
    </div>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 03</span>
      <h2>What Information We Collect and Why</h2>
    </div>
    <div class="akc-legal-body">
      <p>Stag Head collects only the minimum technical routing information needed to operate the bridge services. We do <strong>not</strong> collect or store your bank account numbers, transaction data, account balances, or any personal financial information — that data remains exclusively within your own Business Central environment.</p>

      <table class="akc-table" style="margin-top:1.2rem">
        <thead>
          <tr>
            <th>Data</th>
            <th>Why we hold it</th>
            <th>Where it is stored</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Your Akahu user token<br><span style="font-size:0.85em;opacity:0.7">(format: user_token_…)</span></td>
            <td>Returned to us temporarily during the OAuth2 authorisation flow. We write it into your Business Central setup record immediately and retain a mapping so we can identify which BC tenant it belongs to.</td>
            <td>Azure Table Storage (Australia East)</td>
          </tr>
          <tr>
            <td>Your Business Central tenant ID, environment name, and company ID</td>
            <td>Used to route the Akahu token and payment status updates to the correct Business Central company. Not linked to any individual user — these are organisational identifiers.</td>
            <td>Azure Table Storage (Australia East)</td>
          </tr>
          <tr>
            <td>Akahu payment IDs<br><span style="font-size:0.85em;opacity:0.7">(format: pay_…)</span></td>
            <td>Stored alongside your BC company identifiers so that Akahu webhook notifications can be routed to the correct payment record in Business Central.</td>
            <td>Azure Table Storage (Australia East)</td>
          </tr>
        </tbody>
      </table>

      <p style="margin-top:1.4rem">We do not use this information for any purpose other than operating the extension. We do not use it for marketing, profiling, or analytics.</p>
    </div>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 04</span>
      <h2>Information Held in Your Business Central Environment</h2>
    </div>
    <div class="akc-legal-body">
      <p>The extension stores additional data directly inside your Business Central environment. This data is held under your organisation's own Microsoft tenancy and is subject to Microsoft's terms and privacy policies, not Stag Head's. We do not have access to this data except when acting on your instructions through the Business Central API during normal operation of the extension.</p>
      <p>This includes:</p>
      <ul class="akc-legal-list">
        <li>Your Akahu app token and user token (stored in the Akahu Setup table);</li>
        <li>A cache of your Akahu-connected bank accounts (names, account numbers, balances);</li>
        <li>Imported bank transaction records;</li>
        <li>Akahu payment records and their status history.</li>
      </ul>
      <p>You can delete any of this data at any time from within Business Central. Uninstalling the extension from Business Central will remove all extension tables and their data from your environment.</p>
    </div>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 05</span>
      <h2>Who We Share Information With</h2>
    </div>
    <div class="akc-legal-body">
      <p>We share information only as necessary to operate the extension:</p>
      <ul class="akc-legal-list">
        <li><strong>Akahu Limited (New Zealand)</strong> — We pass your authorisation request to Akahu's OAuth2 endpoints to establish your connection. Akahu holds your bank connections and processes payment instructions. Akahu's use of your data is governed by <a href="https://www.akahu.nz/privacy-notice" target="_blank" rel="noopener">Akahu's Privacy Notice</a>.</li>
        <li><strong>Microsoft Corporation</strong> — The extension operates within Business Central (Microsoft's platform) and uses Azure (Microsoft's cloud infrastructure) for our bridge services. Microsoft's use of data in this context is governed by the <a href="https://www.microsoft.com/en-nz/trust-center" target="_blank" rel="noopener">Microsoft Trust Centre</a> and your organisation's Microsoft agreement.</li>
      </ul>
      <p>We do not sell, rent, or share your information with any other third parties.</p>
    </div>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 06</span>
      <h2>Where Your Information is Stored</h2>
    </div>
    <div class="akc-legal-body">
      <p>The routing data described in § 03 is stored in Microsoft Azure Table Storage hosted in the <strong>Australia East</strong> region (located in New South Wales, Australia).</p>
      <p>Australia has been assessed by the New Zealand Privacy Commissioner as providing comparable privacy safeguards to New Zealand under the Privacy Act 2020. The transfer of data to Australia East is therefore permitted without additional safeguards under Information Privacy Principle 12.</p>
    </div>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 07</span>
      <h2>How Long We Keep Your Information</h2>
    </div>
    <div class="akc-legal-body">
      <p>We retain routing data only for as long as your Subscription is active. When your Subscription ends — whether by cancellation, non-renewal, or termination — we will delete all routing data associated with your Business Central tenant as promptly as practicable.</p>
      <p>You may also request deletion of your data at any time by contacting us at <a href="mailto:craig@staghead.nz">craig@staghead.nz</a>. We will action deletion requests within a reasonable timeframe, typically no more than 30 days.</p>
      <p>Payment mapping records (Akahu payment ID → BC entry) are retained for the duration of your Subscription to support ongoing webhook routing and will be deleted on termination alongside all other routing data.</p>
    </div>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 08</span>
      <h2>Security</h2>
    </div>
    <div class="akc-legal-body">
      <p>We take reasonable steps to protect the routing data we hold against loss, unauthorised access, use, modification, or disclosure. These steps include:</p>
      <ul class="akc-legal-list">
        <li>Storing data in Azure Table Storage with access restricted by Azure Key Vault-managed connection strings;</li>
        <li>Using HTTPS for all communications between the extension, our bridge services, Akahu, and Business Central;</li>
        <li>Validating Akahu webhook payloads using HMAC-SHA256 signature verification to prevent spoofed requests;</li>
        <li>Using function-level authentication keys for internal API calls between our Azure Functions and Business Central.</li>
      </ul>
      <p>No system is completely secure. If you become aware of a security issue related to the extension, please notify us immediately at <a href="mailto:craig@staghead.nz">craig@staghead.nz</a>.</p>
    </div>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 09</span>
      <h2>Your Rights Under the Privacy Act 2020</h2>
    </div>
    <div class="akc-legal-body">
      <p>Under the New Zealand Privacy Act 2020, you have the right to:</p>
      <ul class="akc-legal-list">
        <li><strong>Access</strong> — request a copy of any personal information we hold about you;</li>
        <li><strong>Correction</strong> — request correction of any personal information that is inaccurate or out of date;</li>
        <li><strong>Deletion</strong> — request deletion of your data (subject to any legal obligations to retain it);</li>
        <li><strong>Complaint</strong> — make a complaint to the Office of the Privacy Commissioner at <a href="https://www.privacy.org.nz" target="_blank" rel="noopener">privacy.org.nz</a> if you believe we have interfered with your privacy.</li>
      </ul>
      <p>To exercise any of these rights, contact us at <a href="mailto:craig@staghead.nz">craig@staghead.nz</a>. We will respond within the timeframes required by the Privacy Act.</p>
      <p>Note: most of the information processed by the extension relates to organisations (Business Central tenant identifiers), not to identified individuals. Where personal information is involved — such as if your name appears in a payment description — we will treat access and correction requests accordingly.</p>
    </div>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 10</span>
      <h2>Akahu's Role and Your Consent</h2>
    </div>
    <div class="akc-legal-body">
      <p>Akahu acts as an independent controller of your bank connection data. When you authorise the extension to connect to Akahu, you are entering into a separate relationship with Akahu governed by their terms and privacy notice.</p>
      <p>Stag Head does not have access to your bank account credentials at any point. Akahu manages your bank connections directly and provides transaction and payment data to the extension using a scoped access token that you authorise through Akahu's own authorisation flow.</p>
      <p>You can review and revoke the extension's access to your bank accounts at any time through <a href="https://my.akahu.nz" target="_blank" rel="noopener">my.akahu.nz</a>. Revoking access in Akahu will prevent future transaction imports and payment submissions but will not affect data already imported into Business Central.</p>
    </div>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 11</span>
      <h2>Changes to This Statement</h2>
    </div>
    <div class="akc-legal-body">
      <p>We may update this Privacy Statement from time to time to reflect changes in the extension, our practices, or applicable law. When we make material changes, we will update the "Last updated" date at the top of this page.</p>
      <p>We encourage you to review this statement periodically. Continued use of the extension after changes are published constitutes your acceptance of the updated statement.</p>
    </div>
  </section>

  <section class="shell akc-section">
    <div class="akc-section__head">
      <span class="eyebrow">§ 12</span>
      <h2>Contact Us</h2>
    </div>
    <div class="akc-legal-body">
      <p>For any privacy-related questions, access requests, or complaints, please contact:</p>
      <p>
        <strong>Stag Head Limited</strong><br>
        Companies Register No. 6750773 &nbsp;·&nbsp; NZBN 9429046638891<br>
        <a href="mailto:craig@staghead.nz">craig@staghead.nz</a>
      </p>
      <p>If you are not satisfied with our response, you may contact the Office of the Privacy Commissioner at <a href="https://www.privacy.org.nz" target="_blank" rel="noopener">privacy.org.nz</a>.</p>
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
        <p>This application uses <a href="https://akahu.nz" target="_blank" rel="noopener">Akahu</a> as its open banking platform. Akahu manages your bank connections, handles authorisation, and retrieves financial data on your behalf. Stag Head does not store your bank credentials at any point. Review Akahu's own <a href="https://www.akahu.nz/privacy-notice" target="_blank" rel="noopener">Privacy Notice</a> for details of how Akahu handles your information.</p>
      </div>
    </div>
  </section>

  <footer class="v2-foot shell">
    <div><span class="mono">Stag Head Limited &nbsp;·&nbsp; Akahu Open Banking Integration &nbsp;·&nbsp; Privacy Statement &nbsp;·&nbsp; ${updated}</span></div>
    <div class="mono"><a href="#akahu-eula">End User Licence Agreement</a> &nbsp;·&nbsp; <a href="mailto:craig@staghead.nz">craig@staghead.nz</a></div>
  </footer>

</div>
  `;
};
