/* About — editorial to match V2 */
window.SH_About = function () {
  return `
<div class="about">

  <section class="shell about-hero">
    <div>
      <p class="eyebrow"><span class="bar"></span> About</p>
      <h1>An <em>independent</em> BC developer.</h1>
    </div>
    <div class="about-lead">
      <p>I&rsquo;m a contract software developer specialising in <strong>Microsoft Dynamics 365
        Business Central</strong>. I started with Navision Financials 2.0 back in 1999 — just
        in time for the Y2K scare — and I&rsquo;ve been in and around the platform ever
        since.</p>
      <p>I work with two kinds of client. <strong>End-users</strong>: companies running Business
        Central in-house who want help with their implementation without hiring a full-time
        developer for it. And <strong>partners</strong>: Microsoft vendors and BC consultancies
        who need short-term resource when projects stack up.</p>
      <p>I keep things small and straightforward. Short-ish engagements, clear scope, written
        notes as we go, and work that someone else can pick up after I&rsquo;ve gone.</p>
    </div>
  </section>

  <section class="shell">
    <div class="about-stats">
      <div class="about-stat">
        <div class="big">25<sup>+</sup></div>
        <div class="label">Years around Microsoft Dynamics</div>
      </div>
      <div class="about-stat">
        <div class="big">1</div>
        <div class="label">Person · no account managers</div>
      </div>
    </div>
  </section>

  <section class="shell about-skills">
    <div>
      <span class="eyebrow">§ 01 · What I work on</span>
      <h2>A narrow stack, <em>on purpose.</em></h2>
      <p class="note">Business Central is plenty to keep one developer busy. I don&rsquo;t
        pretend to be a full-stack generalist.</p>
    </div>
    <ul>
      <li>
        <span class="k">Core</span>
        <span class="v"><b>AL · modern Business Central</b>Extensions, events, permission sets,
          translations — the day-to-day development work.</span>
      </li>
      <li>
        <span class="k">Reports</span>
        <span class="v"><b>Report objects · Word layouts</b>The invoice, the statement, the
          picking slip that has to look <i>just so.</i></span>
      </li>
      <li>
        <span class="k">Tooling</span>
        <span class="v"><b>Azure DevOps · GitHub</b>Source control, pull requests, the basics
          done properly.</span>
      </li>
      <li>
        <span class="k">Integration</span>
        <span class="v"><b>Web services · REST · OData</b>The usual ways BC talks to the
          things around it.</span>
      </li>
      <li>
        <span class="k">Adjacent</span>
        <span class="v"><b>SQL Server · PowerShell</b>Enough to be useful day-to-day.</span>
      </li>
    </ul>
  </section>

  <section class="shell about-principles">
    <span class="eyebrow">§ 02 · How I work</span>
    <h2>A handful of <em>principles.</em></h2>
    <div class="about-principles-grid">
      <div class="about-principle">
        <span class="num">01</span>
        <h4>Straight answers</h4>
        <p>If a thing is a bad idea, I&rsquo;ll say so — politely, privately, with a better option where I have one.</p>
      </div>
      <div class="about-principle">
        <span class="num">02</span>
        <h4>Write it down</h4>
        <p>Decisions captured, handovers written, commit messages explained. You should be able to replace me tomorrow.</p>
      </div>
      <div class="about-principle">
        <span class="num">03</span>
        <h4>One person · one invoice</h4>
        <p>No junior hidden in the margins. You get me, for the hours we agreed, at the rate we agreed.</p>
      </div>
      <div class="about-principle">
        <span class="num">04</span>
        <h4>Finish the thing</h4>
        <p>Closing tickets, tidying the sandbox, writing the README. The unglamorous 10%.</p>
      </div>
    </div>
  </section>

  <section class="shell about-contact" data-contact>
    <div>
      <span class="eyebrow">§ 03 · Get in touch</span>
      <h2>The shortest route is <em>email.</em></h2>
      <p class="note">A sentence or two about what you&rsquo;re working on and roughly when
        you&rsquo;d like to start is plenty. I reply within a business day.</p>
    </div>
    <div class="contact-rows">
      <a class="contact-row" href="mailto:craig@staghead.nz">
        <span class="k">Email</span>
        <span class="v">craig@staghead.nz</span>
        <span class="arrow">→</span>
      </a>
      <div class="contact-row">
        <span class="k">Based in</span>
        <span class="v" style="font-size: 16px; font-family: var(--font-body); font-weight: 400;">New Zealand · working worldwide</span>
        <span></span>
      </div>
    </div>
  </section>

  <footer class="v2-foot shell">
    <div><span class="mono">Stag Head · Contract Software Development</span></div>
    <div class="mono">© 2026 · All rights reserved</div>
  </footer>

</div>
  `;
};
