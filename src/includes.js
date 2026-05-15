(function () {
  // Nav active state: map pathnames to data-nav values
  const navMap = {
    '/': 'home',
    '/index.html': 'home',
    '/about.html': 'about'
  };

  fetch('/partials/nav.html')
    .then(r => r.text())
    .then(html => {
      const placeholder = document.getElementById('nav-placeholder');
      if (!placeholder) return;
      placeholder.outerHTML = html;

      const active = navMap[location.pathname] || '';
      document.querySelectorAll('[data-nav]').forEach(a => {
        a.classList.toggle('is-active', a.dataset.nav === active);
      });
    });

  // Smooth scroll for any href="#contact" links
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href="#contact"]');
    if (!a) return;
    e.preventDefault();
    const target = document.querySelector('[data-contact]');
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
})();
