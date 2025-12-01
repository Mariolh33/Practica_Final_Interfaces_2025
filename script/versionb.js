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

    if (!usuario) return;

    // FOTO PERFIL
    const fotoPerfil = document.getElementById("fotoPerfil");
    if (fotoPerfil) {
        fotoPerfil.src = usuario.foto;
    }

    // NOMBRE
    const nombreEl = document.getElementById("nombreUsuario");
    if (nombreEl) {
        nombreEl.textContent = usuario.nombre + " " + usuario.apellido;
    }
}



// === MENÚ DESPLEGABLE ===
document.addEventListener("DOMContentLoaded", () => {
    cargarUsuario(); // Primero cargamos al usuario

    const fotoPerfil = document.getElementById("fotoPerfil");
    const nombreUsuario = document.getElementById("nombreUsuario"); // opcional
    const menu = document.getElementById("userMenu");

    if (!fotoPerfil || !menu) return;

    // Abrir/cerrar menú al pulsar la foto
    fotoPerfil.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("active");
    });

    // Si el nombre existe y también debe abrir el menú
    if (nombreUsuario) {
        nombreUsuario.addEventListener("click", (e) => {
            e.stopPropagation();
            menu.classList.toggle("active");
        });
    }

    // Click fuera → cerrar
    document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && e.target !== fotoPerfil && e.target !== nombreUsuario) {
            menu.classList.remove("active");
        }
    });
});