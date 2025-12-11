document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");
  const aceptar = document.getElementById("acepto");
  const boton = document.getElementById("btnRegistrar");
  const mensaje = document.getElementById("mensaje");

  // Inicializar validez de campos a false
  const validity = {
    nombre: false,
    apellido: false,
    email: false,
    confirmarEmail: false,
    fechaNacimiento: false,
    username: false,
    password: false,
    foto: false
  };

  // Muestra el error de cada campo 
  function setFieldError(inputEl, text) {
    const group = inputEl.closest('.form-group') || inputEl.parentElement;
    let node = group.querySelector('.field-error');
    if (!node) {
      node = document.createElement('div');
      node.className = 'field-error';
      node.style.color = 'red';
      node.style.fontSize = '0.9rem';
      node.style.marginTop = '6px';
      group.appendChild(node);
    }
    node.textContent = text;
    inputEl.style.borderColor = 'red';
  }

  function clearFieldError(inputEl) {
    const group = inputEl.closest('.form-group') || inputEl.parentElement;
    const node = group.querySelector('.field-error');
    if (node) node.textContent = '';
    inputEl.style.borderColor = '';
  }

  function updateSubmitState() {
    const allValid = Object.values(validity).every(Boolean);
    boton.disabled = !(allValid && aceptar.checked);
  }

  // Validadores individuales para mostrar errores en tiempo real
  function validateNombre() {
    const el = document.getElementById('nombre');
    const v = el.value.trim();
    if (v.length < 3) {
      setFieldError(el, 'El nombre debe tener al menos 3 caracteres.');
      validity.nombre = false;
    } else if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{3,}$/.test(v)) {
      setFieldError(el, 'El nombre solo puede contener letras.');
      validity.nombre = false;
    } else {
      clearFieldError(el);
      validity.nombre = true;
    }
    updateSubmitState();
  }

  function validateApellido() {
    const el = document.getElementById('apellido');
    const v = el.value.trim();
    const apellidos = v.split(/\s+/).filter(Boolean);
    if (apellidos.length < 2 || apellidos.some(a => a.length < 3)) {
      setFieldError(el, 'El apellido debe contener al menos dos palabras de 3 caracteres cada una.');
      validity.apellido = false;
    } else {
      clearFieldError(el);
      validity.apellido = true;
    }
    updateSubmitState();
  }

  function validateEmail() {
    const el = document.getElementById('email');
    const v = el.value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(v)) {
      setFieldError(el, 'El email no tiene un formato válido.');
      validity.email = false;
    } else {
      clearFieldError(el);
      validity.email = true;
    }
    validateConfirmEmail();
    updateSubmitState();
  }

  function validateConfirmEmail() {
    const el = document.getElementById('confirmar-email');
    const v = el.value.trim();
    const emailVal = document.getElementById('email').value.trim();
    if (v === '' || v !== emailVal) {
      setFieldError(el, 'Los correos deben coincidir.');
      validity.confirmarEmail = false;
    } else {
      clearFieldError(el);
      validity.confirmarEmail = true;
    }
    updateSubmitState();
  }

  function validateFechaNacimiento() {
    const el = document.getElementById('fecha-nacimiento');
    const v = el.value;
    if (!v) {
      setFieldError(el, 'Introduce una fecha de nacimiento.');
      validity.fechaNacimiento = false;
    } else {
      const fecha = new Date(v);
      const hoy = new Date();
      const edad = hoy.getFullYear() - fecha.getFullYear();
      if (fecha > hoy || edad < 10 || edad > 120) {
        setFieldError(el, 'Introduce una fecha de nacimiento válida.');
        validity.fechaNacimiento = false;
      } else {
        clearFieldError(el);
        validity.fechaNacimiento = true;
      }
    }
    updateSubmitState();
  }

  function validateUsername() {
    const el = document.getElementById('username');
    const v = el.value.trim();
    if (v.length < 5) {
      setFieldError(el, 'El nombre de usuario debe tener al menos 5 caracteres.');
      validity.username = false;
    } else {
      clearFieldError(el);
      validity.username = true;
    }
    updateSubmitState();
  }

  function validatePassword() {
    const el = document.getElementById('password');
    const v = el.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){2,})(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(v)) {
      setFieldError(el, 'La contraseña debe tener al menos 8 caracteres, 2 números, 1 símbolo, 1 mayúscula y 1 minúscula.');
      validity.password = false;
    } else {
      clearFieldError(el);
      validity.password = true;
    }
    updateSubmitState();
  }

  function validateFoto() {
    const el = document.getElementById('foto-perfil');
    const file = el.files[0];
    if (!file) {
      setFieldError(el, 'Debe seleccionar una foto de perfil.');
      validity.foto = false;
    } else {
      const extensionesPermitidas = ['image/webp', 'image/png', 'image/jpeg'];
      if (!extensionesPermitidas.includes(file.type)) {
        setFieldError(el, 'Formato de imagen no válido. Solo .webp, .png, .jpg.');
        validity.foto = false;
      } else {
        clearFieldError(el);
        validity.foto = true;
      }
    }
    updateSubmitState();
  }

  // Escuchar cambios en los campos para validación en tiempo real
  document.getElementById('nombre').addEventListener('input', validateNombre);
  document.getElementById('apellido').addEventListener('input', validateApellido);
  document.getElementById('email').addEventListener('input', validateEmail);
  document.getElementById('confirmar-email').addEventListener('input', validateConfirmEmail);
  document.getElementById('fecha-nacimiento').addEventListener('change', validateFechaNacimiento);
  document.getElementById('username').addEventListener('input', validateUsername);
  document.getElementById('password').addEventListener('input', validatePassword);
  document.getElementById('foto-perfil').addEventListener('change', validateFoto);


  //  Deshabilitar botón hasta que acepte la política
  boton.disabled = !aceptar.checked;
  aceptar.addEventListener("change", () => {
    boton.disabled = !aceptar.checked;

    // Muestra mensaje dinámico si desmarca
    if (!aceptar.checked) {
      mostrarError("Debes aceptar la política de privacidad para continuar.");
    } else {
      mensaje.textContent = "";
      mensaje.classList.remove("error", "success");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    mensaje.textContent = "";
    mensaje.style.color = "red";
    mensaje.classList.remove("error", "success");

    // Obtener valores
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const confirmarEmail = document.getElementById("confirmar-email").value.trim();
    const fechaNacimiento = document.getElementById("fecha-nacimiento").value;
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const foto = document.getElementById("foto-perfil").files[0];

    // === SI TODO ES CORRECTO ===
    const reader = new FileReader();

    reader.onload = function (e) {
      const fotoBase64 = e.target.result;
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      const usuario = {
        nombre,
        apellido,
        email,
        fechaNacimiento,
        username,
        password,
        foto: fotoBase64
      };

      usuarios.push(usuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      sessionStorage.setItem("usuarioLogueado", username);
      sessionStorage.setItem("loginValido", "true");

      mensaje.classList.remove("error");
      mensaje.classList.add("success");
      mensaje.style.color = "green";
      mensaje.textContent = "✅ Registro completado correctamente. Redirigiendo...";

      setTimeout(() => {
        window.location.href = "versionb.html";
      }, 1500);
    };

    reader.readAsDataURL(foto);
  });

  // === FUNCIÓN PARA MOSTRAR ERRORES ===
  function mostrarError(texto) {
    mensaje.textContent = texto;
    mensaje.style.color = "red";
    mensaje.style.fontWeight = "bold";
    mensaje.style.animation = "parpadeo 0.3s ease-in-out 2";
    mensaje.classList.remove("success");
    mensaje.classList.add("error");
  }

  // Pequeña animación opcional de parpadeo para errores
  const estilo = document.createElement("style");
  estilo.textContent = `
    @keyframes parpadeo {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;
  document.head.appendChild(estilo);
});
