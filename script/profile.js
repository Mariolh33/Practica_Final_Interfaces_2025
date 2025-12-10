// === GESTIÓN DE PERFIL ===

function getLoggedUser() {
  return sessionStorage.getItem('usuarioLogueado') || 'anon';
}

function loadCurrentUser() {
  const username = getLoggedUser();
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  return usuarios.find(u => u.username === username);
}

function saveUser(user) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const index = usuarios.findIndex(u => u.username === user.username);
  if (index !== -1) {
    usuarios[index] = user;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    return true;
  }
  return false;
}

function showProfileMessage(text, isError = false) {
  const msg = document.getElementById('profileMessage');
  if (!msg) return;
  msg.textContent = text;
  msg.className = 'profile-message' + (isError ? ' error' : ' success');
  msg.style.display = 'block';
  setTimeout(() => {
    msg.style.display = 'none';
  }, 3000);
}

function openProfilePopup() {
  const popup = document.getElementById('popupMiPerfil');
  if (!popup) return;

  // Asegurarse de que el popup esté en el body
  if (popup.parentElement !== document.body) {
    document.body.appendChild(popup);
  }

  // Cargar datos del usuario actual
  const user = loadCurrentUser();
  if (user) {
    document.getElementById('profileNombre').value = user.nombre || '';
    document.getElementById('profileApellido').value = user.apellido || '';
    document.getElementById('profileEmail').value = user.email || '';
    document.getElementById('profileUsername').value = user.username || '';
    document.getElementById('profilePhotoPreview').src = user.foto || 'img/default.png';
  }

  popup.classList.add('active');
  document.body.classList.add('no-scroll');
}

function closeProfilePopup() {
  const popup = document.getElementById('popupMiPerfil');
  if (!popup) return;
  popup.classList.remove('active');
  document.body.classList.remove('no-scroll');

  // Volver al modo vista del perfil
  resetProfileForm();
}

function resetProfileForm() {
  const form = document.getElementById('profileForm');
  const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
  
  // Volver todos a readonly
  inputs.forEach(input => {
    input.readOnly = true;
  });

  document.getElementById('profilePassword').value = '';

  // Ocultar botón de cambiar foto
  const photoLabel = document.querySelector('.profile-photo-input label');
  if (photoLabel) {
    photoLabel.style.display = 'none';
  }

  // Cambiar botones
  document.getElementById('btnEditProfile').style.display = 'inline-block';
  document.getElementById('btnSaveProfile').style.display = 'none';
  document.getElementById('btnCancelEdit').style.display = 'none';

  // Limpiar mensaje
  document.getElementById('profileMessage').style.display = 'none';
}

function enableProfileEdit() {
  // Habilitar edición de nombre, apellido, email (NO username)
  document.getElementById('profileNombre').readOnly = false;
  document.getElementById('profileApellido').readOnly = false;
  document.getElementById('profileEmail').readOnly = false;
  document.getElementById('profileUsername').readOnly = true;  // Username siempre readonly
  document.getElementById('profilePassword').readOnly = false;  // Habilitar contraseña para edición

  // Mostrar botón de cambiar foto
  const photoLabel = document.querySelector('.profile-photo-input label');
  if (photoLabel) {
    photoLabel.style.display = 'inline-block';
  }

  // Cambiar botones
  document.getElementById('btnEditProfile').style.display = 'none';
  document.getElementById('btnSaveProfile').style.display = 'inline-block';
  document.getElementById('btnCancelEdit').style.display = 'inline-block';
}

document.addEventListener('DOMContentLoaded', () => {
  // Botón para abrir popup desde el menú
  const btnMiPerfil = document.getElementById('btnMiPerfil');
  if (btnMiPerfil) {
    btnMiPerfil.addEventListener('click', (e) => {
      e.preventDefault();
      openProfilePopup();
      // Cerrar menú desplegable
      const userMenu = document.getElementById('userMenu');
      if (userMenu) userMenu.classList.remove('active');
    });
  }

  // Botón para cerrar popup
  const closeBtn = document.getElementById('closeProfile');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeProfilePopup);
  }

  // Click en overlay para cerrar
  const popup = document.getElementById('popupMiPerfil');
  if (popup) {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closeProfilePopup();
      }
    });
  }

  // Botón Editar
  const btnEdit = document.getElementById('btnEditProfile');
  if (btnEdit) {
    btnEdit.addEventListener('click', (e) => {
      e.preventDefault();
      enableProfileEdit();
    });
  }

  // Botón Cancelar
  const btnCancel = document.getElementById('btnCancelEdit');
  if (btnCancel) {
    btnCancel.addEventListener('click', (e) => {
      e.preventDefault();
      resetProfileForm();
      // Recargar datos del usuario
      const user = loadCurrentUser();
      if (user) {
        document.getElementById('profileNombre').value = user.nombre || '';
        document.getElementById('profileApellido').value = user.apellido || '';
        document.getElementById('profileEmail').value = user.email || '';
        document.getElementById('profilePhotoPreview').src = user.foto || 'img/default.png';
      }
    });
  }

  // Cambio de foto
  const photoInput = document.getElementById('profilePhoto');
  if (photoInput) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          document.getElementById('profilePhotoPreview').src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Label para foto (clickeable)
  const photoLabel = document.querySelector('.profile-photo-input label');
  if (photoLabel) {
    photoLabel.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('profilePhoto').click();
    });
  }

  // Form submit
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const user = loadCurrentUser();
      if (!user) {
        showProfileMessage('Error al cargar el usuario', true);
        return;
      }

      const nombre = document.getElementById('profileNombre').value.trim();
      const apellido = document.getElementById('profileApellido').value.trim();
      const email = document.getElementById('profileEmail').value.trim();
      const newPassword = document.getElementById('profilePassword').value.trim();
      const newPhoto = document.getElementById('profilePhoto').files[0];

      // Validar nombre
      if (nombre.length < 3) {
        showProfileMessage('El nombre debe tener al menos 3 caracteres', true);
        return;
      }
      if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{3,}$/.test(nombre)) {
        showProfileMessage('El nombre solo puede contener letras', true);
        return;
      }

      // Validar apellido
      const apellidos = apellido.split(' ');
      if (apellidos.length < 2 || apellidos.some(a => a.length < 3)) {
        showProfileMessage('El apellido debe contener al menos dos palabras de 3 caracteres cada una', true);
        return;
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showProfileMessage('El email no tiene un formato válido', true);
        return;
      }

      // Actualizar datos básicos
      user.nombre = nombre;
      user.apellido = apellido;
      user.email = email;

      // Si hay nueva contraseña, validar y actualizar
      if (newPassword) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){2,})(?=.*[^A-Za-z0-9]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
          showProfileMessage('La contraseña debe tener al menos 8 caracteres, 2 números, 1 símbolo, 1 mayúscula y 1 minúscula', true);
          return;
        }
        user.password = newPassword;
      }

      // Si hay nueva foto, convertir a base64
      if (newPhoto) {
        const reader = new FileReader();
        reader.onload = (event) => {
          user.foto = event.target.result;
          if (saveUser(user)) {
            // Actualizar foto en navbar
            const fotoPerfil = document.getElementById('fotoPerfil');
            if (fotoPerfil) {
              fotoPerfil.src = user.foto;
            }
            showProfileMessage('Perfil actualizado correctamente');
            setTimeout(() => {
              resetProfileForm();
            }, 1000);
          } else {
            showProfileMessage('Error al guardar los cambios', true);
          }
        };
        reader.readAsDataURL(newPhoto);
      } else {
        // Sin cambio de foto, guardar directamente
        if (saveUser(user)) {
          // Actualizar nombre en navbar
          const nombreEl = document.getElementById('nombreUsuario');
          if (nombreEl) {
            nombreEl.textContent = user.nombre + ' ' + user.apellido;
          }
          showProfileMessage('Perfil actualizado correctamente');
          setTimeout(() => {
            resetProfileForm();
          }, 1000);
        } else {
          showProfileMessage('Error al guardar los cambios', true);
        }
      }
    });
  }
});
