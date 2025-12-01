document.addEventListener('DOMContentLoaded', () => {
  // Intercept links that resolve to the site's index (including fragments or queries)
  document.querySelectorAll('a[href]').forEach(a => {
    const raw = a.getAttribute('href');
    if (!raw) return;

    // ignore pure fragment links (they target the current page's fragment only)
    if (raw.trim().startsWith('#')) return;

    try {
      const resolved = new URL(raw, location.href);
      const pathname = resolved.pathname || '/';

      // Consider root '/' or any path that ends with '/index.html' as the site index
      const isIndex = pathname === '/' || pathname.endsWith('/index.html');

      if (isIndex) {
        a.addEventListener('click', function(e) {
          const logged = sessionStorage.getItem('loginValido') === 'true';
          if (logged) {
            e.preventDefault();
            // Preserve query and fragment when redirecting so index.html#foo -> versionb.html#foo
            const search = resolved.search || '';
            const hash = resolved.hash || '';
            const target = 'versionb.html' + search + hash;
            window.location.href = target;
          }
          // otherwise allow the default navigation (including fragment) to index.html
        });
      }
    } catch (err) {
      // ignore invalid URLs
    }
  });
});
