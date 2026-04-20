/* V2 · Monolith — theme-aware home */
window.SH_Monolith = function () {
  const hexes = [];
  const size = 60, w = size * Math.sqrt(3), h = size * 2;
  for (let row = -1; row < 14; row++) {
    for (let col = -1; col < 22; col++) {
      const x = col * w + (row % 2 ? w / 2 : 0);
      const y = row * h * 0.75;
      const pts = [];
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        pts.push(`${(x + size * Math.cos(a)).toFixed(1)},${(y + size * Math.sin(a)).toFixed(1)}`);
      }
      const accent = (row === 3 && col === 5) || (row === 7 && col === 12) ? ' accent-hex' : '';
      hexes.push(`<polygon class="${accent}" points="${pts.join(' ')}"/>`);
    }
  }

  return `
<div class="v2">

  <section class="v2-hero">
    <div class="v2-hex-bg" aria-hidden="true">
      <svg class="hex-lattice" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice">${hexes.join('')}</svg>
    </div>
    <div class="shell">
      <p class="v2-eyebrow"><span class="bar"></span> Stag Head · Business Central contract development</p>
      <h1 class="v2-h1">
        An extra pair of <span class="amber">Business Central</span> <span class="stroke">hands.</span>
      </h1>
      <p class="v2-sub">
        I&rsquo;m an independent contract developer specialising in Microsoft Dynamics 365
        Business Central. I work with companies running BC in-house who want help with their
        implementation, and with partners who need short-term resource when things get busy.
      </p>
      <div class="v2-actions">
        <a href="#contact" class="cta-btn">Start a conversation →</a>
        <a href="#about" data-route="about" class="cta-btn cta-btn--ghost">Read the about</a>
      </div>
    </div>
  </section>

  <div class="v2-marquee" aria-hidden="true">
    <div class="v2-marquee__track">
      <span>In-house BC support</span><span>Partner overflow</span><span>AL Extensions</span>
      <span>Reports &amp; layouts</span><span>Small integrations</span><span>Named resource</span>
      <span>White-label</span>
      <span>In-house BC support</span><span>Partner overflow</span><span>AL Extensions</span>
      <span>Reports &amp; layouts</span><span>Small integrations</span><span>Named resource</span>
      <span>White-label</span>
    </div>
  </div>

  <section class="shell v2-grid">
    <div>
      <span class="eyebrow">§ 01 · Who I work with</span>
      <h2>Two ways to work <em>together.</em></h2>
    </div>
    <div class="v2-cards">
      <div class="v2-card">
        <div class="n">01 — For end-users</div>
        <h3>In-house BC support</h3>
        <p>You&rsquo;ve implemented Business Central and you&rsquo;d rather not build a full
          development team around it. I can sit alongside your internal folks — a few days a
          week, or a few weeks on a project.</p>
        <ul>
          <li>Tweaks, fixes &amp; small enhancements</li>
          <li>AL extensions on your tenant</li>
          <li>Reports and document layouts</li>
          <li>Day-to-day BAU support</li>
        </ul>
      </div>
      <div class="v2-card">
        <div class="n">02 — For partners</div>
        <h3>Short-term resource</h3>
        <p>You&rsquo;re a Microsoft partner or BC vendor and a project needs another pair of
          hands for a few weeks. I slot in under your brand, on a defined piece of work.</p>
        <ul>
          <li>Named resource on your project</li>
          <li>White-label — invisible to your client</li>
          <li>Fixed scope or time &amp; materials</li>
          <li>NDAs signed on request</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="shell v2-engage">
    <div>
      <span class="eyebrow">§ 02 · How it works</span>
      <h2>A typical <em>engagement.</em></h2>
      <p class="lead">Nothing fancy. A short conversation, a one-page plan, then hands on
        keyboard. You should always know where things are.</p>
    </div>
    <ol class="v2-steps">
      <li>
        <div class="step-n">STEP 01</div>
        <div class="step-h">A short call</div>
        <div class="step-p">Thirty minutes. You describe what&rsquo;s on your mind; I tell you honestly whether I can help.</div>
      </li>
      <li>
        <div class="step-n">STEP 02</div>
        <div class="step-h">A one-page plan</div>
        <div class="step-p">Scope, approach, rough dates, price. Short enough to read on your phone — on purpose.</div>
      </li>
      <li>
        <div class="step-n">STEP 03</div>
        <div class="step-h">Access &amp; setup</div>
        <div class="step-p">Sandbox, source control, anything else I need. Usually done the same day you send invites.</div>
      </li>
      <li>
        <div class="step-n">STEP 04</div>
        <div class="step-h">Build</div>
        <div class="step-p">Focused work on the agreed items. End-of-day notes when I&rsquo;m coding; weekly demos.</div>
      </li>
      <li>
        <div class="step-n">STEP 05</div>
        <div class="step-h">Handover</div>
        <div class="step-p">A written summary, tidy commits, and anything your team needs to pick things up cleanly.</div>
      </li>
    </ol>
  </section>

  <section class="shell v2-quote">
    <blockquote>
      I keep things <span class="amber">small,</span> written down, and easy to hand over.
    </blockquote>
    <cite><span class="bar"></span><b>How I like to work</b> &nbsp;·&nbsp; nothing dramatic</cite>
  </section>

  <section class="shell v2-cta" data-contact>
    <h3>Short engagements. <em>Long memories.</em></h3>
    <a href="mailto:craig@staghead.nz" class="cta-btn">craig@staghead.nz →</a>
    <div class="mono-detail">Usually replies within one business day · Based in New Zealand · Working worldwide</div>
  </section>

  <footer class="v2-foot">
    <div><span class="mono">Stag Head · Contract Software Development</span></div>
    <div class="mono">© 2026 · All rights reserved</div>
  </footer>

</div>
  `;
};
