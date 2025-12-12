function iniciarSesion() {
  const usernameInput = document.getElementById("usernameLogin").value;
  const passwordInput = document.getElementById("passwordLogin").value;

  if (!usernameInput || !passwordInput) {
    alert("Por favor, complete ambos campos.");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuarios != null) {
    let usernameLogin = usernameInput;
    let passwordLogin = passwordInput;

    let encontrado = false;
    let usuarioEncontrado = null;

    for (let u of usuarios) {
      if (u.username === usernameLogin && u.password === passwordLogin) {
        encontrado = true;
        usuarioEncontrado = u;
        break;
      }
    }

    if (encontrado) {
      //  Guardar sesión activa y usuario actual
      sessionStorage.setItem("loginValido", "true");
      sessionStorage.setItem("usuarioLogueado", usuarioEncontrado.username);

      // Redirigir
      window.location.href = "versionb.html";
    } else {
      alert("Credenciales erróneas");
      document.getElementById("usernameLogin").value = "";
      document.getElementById("passwordLogin").value = "";
    }
  }
}


function cerrarSesion() {
  const popup = document.getElementById("popupCerrarSesion");
  if (!popup) return;

  // Asegurarse de que el popup esté en el body 
  if (popup.parentElement !== document.body) {
    document.body.appendChild(popup);
  }

  // Mostrar popup y bloquear scroll del body
  popup.classList.add("active");
  document.body.classList.add("no-scroll");

  const confirmar = document.getElementById("confirmarCerrar");
  const cancelar = document.getElementById("cancelarCerrar");

  const closePopup = () => {
    popup.classList.remove("active");
    document.body.classList.remove("no-scroll");
  };

  confirmar.onclick = () => {
    sessionStorage.setItem("loginValido", "false");
    sessionStorage.removeItem("usuarioLogueado");
    closePopup();
    window.location.href = "index.html";
  };

  cancelar.onclick = (e) => {
    e.stopPropagation();
    closePopup();
  };

  // Cerrar cuando clickes fuera del popup
  const onOverlayClick = (e) => {
    if (e.target === popup) {
      closePopup();
      popup.removeEventListener('click', onOverlayClick);
    }
  };

  popup.addEventListener('click', onOverlayClick);
}


function validaSesion() {
	if (sessionStorage.getItem("loginValido") != "true") {
		window.location.href = "index.html";
	} 
}

function cargarUsuario() {
    const loginValido = sessionStorage.getItem("loginValido");
    const usernameLogueado = sessionStorage.getItem("usuarioLogueado");

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.username === usernameLogueado);

    // Referencias a los elementos
    const nombreEl = document.getElementById("nombreUsuario");
    const botonCuenta = document.getElementById("botonCuenta");
    const fotoPerfil = document.getElementById("fotoPerfil");
    const userMenu = document.getElementById("userMenu");
    const userMenuNoLogin = document.getElementById("userMenuNoLogin");

    if (loginValido === "true" && usuario) {
        // Usuario logueado
        // FOTO PERFIL
        if (fotoPerfil) {
            fotoPerfil.src = usuario.foto;
            fotoPerfil.style.display = 'inline-block';
        }

        // NOMBRE
        if (nombreEl) {
            nombreEl.textContent = usuario.nombre + " " + usuario.apellido;
        }

        // Ocultar botón Mi Cuenta, mostrar foto de perfil
        if (botonCuenta) botonCuenta.style.display = 'none';
        
        // Ajustar visibilidad de menús
        if (userMenu) userMenu.style.visibility = 'visible';
        if (userMenuNoLogin) userMenuNoLogin.style.visibility = 'hidden';
    } else {
        // Usuario no logueado
        if (nombreEl) {
            nombreEl.textContent = '';
        }
        
        // Mostrar botón Mi Cuenta, ocultar foto de perfil
        if (botonCuenta) botonCuenta.style.display = 'flex';
        if (fotoPerfil) fotoPerfil.style.display = 'none';
        
        // Ajustar visibilidad de menús
        if (userMenu) userMenu.style.visibility = 'hidden';
        if (userMenuNoLogin) userMenuNoLogin.style.visibility = 'visible';
    }
}



// === MENÚ DESPLEGABLE ===
document.addEventListener("DOMContentLoaded", () => {
    cargarUsuario(); // Primero cargamos al usuario

    const fotoPerfil = document.getElementById("fotoPerfil");
    const nombreUsuario = document.getElementById("nombreUsuario");
    const botonCuenta = document.getElementById("botonCuenta");
    const userMenu = document.getElementById("userMenu");
    const userMenuNoLogin = document.getElementById("userMenuNoLogin");

    // Click en el botón Mi Cuenta (cuando no hay sesión o hay sesión)
    if (botonCuenta) {
        botonCuenta.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const loginValido = sessionStorage.getItem("loginValido");
            const usernameLogueado = sessionStorage.getItem("usuarioLogueado");
            
            if (loginValido === "true" && usernameLogueado) {
                // Usuario logueado - mostrar/ocultar userMenu
                if (userMenu) {
                    userMenu.classList.toggle('active');
                    if (userMenuNoLogin) userMenuNoLogin.classList.remove('active');
                }
            } else {
                // Usuario no logueado - mostrar/ocultar userMenuNoLogin
                if (userMenuNoLogin) {
                    userMenuNoLogin.classList.toggle('active');
                    if (userMenu) userMenu.classList.remove('active');
                }
            }
        });
    }

    // Abrir/cerrar menú al pulsar la foto (solo cuando hay sesión)
    if (fotoPerfil) {
        fotoPerfil.addEventListener("click", (e) => {
            e.stopPropagation();
            if (userMenu) {
                userMenu.classList.toggle("active");
                if (userMenuNoLogin) userMenuNoLogin.classList.remove("active");
            }
        });
    }

    // Si el nombre existe y también debe abrir el menú
    if (nombreUsuario) {
        nombreUsuario.addEventListener("click", (e) => {
            e.stopPropagation();
            if (userMenu) {
                userMenu.classList.toggle("active");
                if (userMenuNoLogin) userMenuNoLogin.classList.remove("active");
            }
        });
    }

    // Click fuera → cerrar ambos menús
    document.addEventListener("click", (e) => {
        const clickedInsideMenu = (userMenu && userMenu.contains(e.target)) || 
                                  (userMenuNoLogin && userMenuNoLogin.contains(e.target));
        const clickedTrigger = e.target === fotoPerfil || 
                               e.target === nombreUsuario || 
                               e.target === botonCuenta ||
                               (botonCuenta && botonCuenta.contains(e.target));
        
        if (!clickedInsideMenu && !clickedTrigger) {
            if (userMenu) userMenu.classList.remove("active");
            if (userMenuNoLogin) userMenuNoLogin.classList.remove("active");
        }
    });
});