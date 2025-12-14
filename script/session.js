// ===== SESIÓN =====

function isLogged() {
  return sessionStorage.getItem("loginValido") === "true";
}

function getLoggedUser() {
  return sessionStorage.getItem("usuarioLogueado");
}

function iniciarSesion(username, password) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const user = usuarios.find(u => u.username === username && u.password === password);

  if (!user) {
    alert("Credenciales incorrectas");
    return false;
  }

  sessionStorage.setItem("loginValido", "true");
  sessionStorage.setItem("usuarioLogueado", user.username);

  applySessionUI();
  return true;
}

function cerrarSesion() {
  sessionStorage.removeItem("loginValido");
  sessionStorage.removeItem("usuarioLogueado");
  applySessionUI();
}

function applySessionUI() {
  const logged = isLogged();
  const sidebar = document.getElementById("userSidebar");
  const botonCuenta = document.getElementById("botonCuenta");
  const fotoPerfil = document.getElementById("fotoPerfil");
  const nombreUsuario = document.getElementById("nombreUsuario");

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const user = usuarios.find(u => u.username === getLoggedUser());

  sidebar?.toggleAttribute("hidden", !logged);

  if (logged && user) {
    botonCuenta && (botonCuenta.style.display = "none");
    if (fotoPerfil) fotoPerfil.src = user.foto || "images/user.png";
    if (nombreUsuario) nombreUsuario.textContent = user.nombre + " " + user.apellido;
  } else {
    botonCuenta && (botonCuenta.style.display = "inline-block");
    if (fotoPerfil) fotoPerfil.style.display = "none";
    if (nombreUsuario) nombreUsuario.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", applySessionUI);
