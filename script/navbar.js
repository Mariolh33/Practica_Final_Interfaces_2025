document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     1. INSERTAR NAVBAR
  ===================================================== */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const navHTML = `
    <nav class="navbar">
      <div class="nav-brand">
        <img src="images/Logo.png" height="40" width="40" alt="Logo">
        <span data-i18n="brand">Mochileros Sin Fronteras</span>
      </div>

      <button class="nav-toggle" aria-label="Abrir menú" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>

      <ul class="nav-menu">
        <li><a href="index.html" data-page="index.html" data-i18n="nav_home">Inicio</a></li>
        <li><a href="buscar-rutas.html" data-page="buscar-rutas.html" data-i18n="nav_routes">Rutas</a></li>
        <li><a href="otros-rincones.html" data-page="otros-rincones.html" data-i18n="nav_cities">Ciudades</a></li>
        <li><a href="blog.html" data-page="blog.html" data-i18n="nav_blog">Blog</a></li>
        <li><a href="comunidad.html" data-page="comunidad.html" data-i18n="nav_community">Comunidad</a></li>
        <li><a href="contacto.html" data-page="contacto.html" data-i18n="nav_contact">Contacto</a></li>

        <li>
          <select name="idioma" id="idiomaHeader">
            <option value="es">🇪🇸 Español</option>
            <option value="en">🇬🇧 English</option>
          </select>
        </li>
      </ul>

      <div class="nav-actions">
        <button class="btn-icon" aria-label="Buscar">
          <i class="fas fa-search"></i>
        </button>
      </div>

      <div class="perfil-wrapper">
        <span id="nombreUsuario" class="nombre-usuario"></span>

        <button id="botonCuenta" class="btn btn-primary">
          <i class="fas fa-user-circle"></i>
          <span data-i18n="btn_my_account">Mi Cuenta</span>
        </button>

        <img id="fotoPerfil" class="foto-perfil" src="images/user.png" style="display:none;">

        <div class="user-menu" id="userMenu">
          <button id="btnMiPerfil" class="btn btn-primary" data-i18n="profile_profile">Mi perfil</button>
          <button class="btn btn-primary" data-i18n="profile_friends">Mis Amigos</button>
          <button class="btn btn-primary" data-i18n="profile_routes">Mis Rutas</button>
          <button class="btn btn-secondary btn-block" data-i18n="profile_logout" onclick="cerrarSesion()">Cerrar sesión</button>
        </div>

        <div class="user-menu-no-login" id="userMenuNoLogin">
          <button class="btn btn-primary btn-block" onclick="location.href='registro.html'" data-i18n="auth_login">Iniciar sesión</button>
          <button class="btn btn-secondary btn-block" onclick="location.href='registro.html'" data-i18n="auth_register">Registrarse</button>
        </div>
      </div>
    </nav>
  `;

  document.body.insertAdjacentHTML("afterbegin", navHTML);

  /* =====================================================
     2. MARCAR PÁGINA ACTIVA
  ===================================================== */
  document.querySelectorAll(".nav-menu a[data-page]").forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    }
  });

  /* =====================================================
     3. INTERCEPTAR ENLACES AL INDEX
  ===================================================== */
  document.querySelectorAll("a[href]").forEach(a => {
    const raw = a.getAttribute("href");
    if (!raw || raw.startsWith("#")) return;

    try {
      const resolved = new URL(raw, location.href);
      const pathname = resolved.pathname || "/";

      const isIndex = pathname === "/" || pathname.endsWith("/index.html");

      if (isIndex) {
        a.addEventListener("click", e => {
          const logged = sessionStorage.getItem("loginValido") === "true";
          if (logged) {
            e.preventDefault();
            window.location.href =
              "versionb.html" +
              (resolved.search || "") +
              (resolved.hash || "");
          }
        });
      }
    } catch {}
  });

  /* =====================================================
     4. REAPLICAR IDIOMA + ENLAZAR SELECTORES
  ===================================================== */
  const lang = localStorage.getItem("lang") || "es";

  if (typeof window.applyTranslations === "function") {
    window.applyTranslations(lang);
  }

  if (typeof window.bindLanguageSelectors === "function") {
    window.bindLanguageSelectors();
  }

});
