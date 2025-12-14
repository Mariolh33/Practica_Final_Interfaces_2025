document.addEventListener('DOMContentLoaded', () => {
// Interceptar clics en enlaces a la página de índice
  document.querySelectorAll('a[href]').forEach(a => {
    const raw = a.getAttribute('href');
    if (!raw) return;

    // Ignorar enlaces a fragmentos dentro de la misma página
    if (raw.trim().startsWith('#')) return;

    try {
      const resolved = new URL(raw, location.href);
      const pathname = resolved.pathname || '/';

      // Considerar tanto '/' como '/index.html' como páginas de índice
      const isIndex = pathname === '/' || pathname.endsWith('/index.html');

      if (isIndex) {
        a.addEventListener('click', function(e) {
          const logged = sessionStorage.getItem('loginValido') === 'true';
          if (logged) {
            e.preventDefault();
            // Preeservar búsqueda y fragmento al redirigir a versionb.html
            const search = resolved.search || '';
            const hash = resolved.hash || '';
            const target = 'versionb.html' + search + hash;
            window.location.href = target;
          }
          // Si no está logueado, dejar que el enlace funcione normalmente
        });
      }
    } catch (err) {
      // ignorar URLs inválidas
    }
  });
});

// Responsive navbar toggle
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');

  if (!nav || !toggle) return;

  const closeMenu = () => {
    nav.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });
});
