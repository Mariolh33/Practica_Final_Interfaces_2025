// === GESTIÓN DEL FORO DE COMUNIDAD ===
const t = (key, fallback = '') => {
  const lang = localStorage.getItem('lang') || 'es';
  const dict = (window.EMBEDDED_I18N && window.EMBEDDED_I18N[lang]) || (window.EMBEDDED_I18N && window.EMBEDDED_I18N.es) || {};
  return dict[key] || fallback || key;
};

class ComunidadForo {
  constructor() {
    this.temas = this.cargarTemas();
    this.usuarioLogueado = sessionStorage.getItem('usuarioLogueado');
    this.categoriaActual = 'all';
    this.ordenActual = 'recent';
    this.init();
  }

  translate(key, fallback = '') {
    return t(key, fallback);
  }

  formatCount(key, n) {
    return this.translate(key, '{n}').replace('{n}', n);
  }

  getCategoryLabel(cat) {
    const map = {
      viajes: 'community_cat_travel',
      consejos: 'community_cat_tips',
      destinos: 'community_cat_destinations',
      fotos: 'community_cat_photos',
      preguntas: 'community_cat_questions',
      all: 'community_cat_all'
    };
    return this.translate(map[cat] || map.all, cat);
  }

  getLocale() {
    const lang = localStorage.getItem('lang') || 'es';
    return lang === 'en' ? 'en-US' : 'es-ES';
  }

  init() {
    this.cargarDataUsuarios();
    // La actualización del estado de login ya se maneja en versionb.js
    // this.actualizarEstadoLogin();
    this.renderizarUI();
    this.agregarEventListeners();
  }

  // Esta función ya no se usa, versionb.js maneja el estado del login
  /*
  actualizarEstadoLogin() {
    const usuarioMenu = document.getElementById('userMenu');
    const usuarioMenuNoLogin = document.getElementById('userMenuNoLogin');
    const nombreUsuario = document.getElementById('nombreUsuario');
    const botonCuenta = document.getElementById('botonCuenta');
    const fotoPerfil = document.getElementById('fotoPerfil');
    
    if (this.usuarioLogueado && this.usuarioLogueado !== 'anon') {
      // Usuario logueado
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const usuario = usuarios.find(u => u.username === this.usuarioLogueado);
      
      if (usuario) {
        nombreUsuario.textContent = usuario.nombre || usuario.username;
        // Actualizar foto de perfil
        if (fotoPerfil && usuario.foto) {
          fotoPerfil.src = usuario.foto;
        }
      }
      
      // Mostrar foto de perfil y ocultar botón
      if (fotoPerfil) fotoPerfil.style.display = 'inline-block';
      if (botonCuenta) botonCuenta.style.display = 'none';
      
      if (usuarioMenu) usuarioMenu.style.visibility = 'visible';
      if (usuarioMenuNoLogin) usuarioMenuNoLogin.style.visibility = 'hidden';
    } else {
      // Usuario no logueado
      nombreUsuario.textContent = '';
      
      // Mostrar botón y ocultar foto de perfil
      if (botonCuenta) botonCuenta.style.display = 'flex';
      if (fotoPerfil) fotoPerfil.style.display = 'none';
      
      if (usuarioMenu) usuarioMenu.style.visibility = 'hidden';
      if (usuarioMenuNoLogin) usuarioMenuNoLogin.style.visibility = 'visible';
    }
  }
  */

  // ===== GESTIÓN DE DATOS =====
  cargarTemas() {
    const temasGuardados = localStorage.getItem('foroTemas');
    if (temasGuardados) {
      return JSON.parse(temasGuardados);
    }
    return this.obtenerTemasIniciales();
  }

  obtenerTemasIniciales() {
    return [
      {
        id: 1,
        titulo: 'Mi primer viaje a Perú - Consejos y experiencias',
        categoria: 'viajes',
        contenido: 'Hace poco volví de Perú y fue una experiencia increíble. Visité Machu Picchu, el Valle Sagrado y Lima. Los paisajes son espectaculares y la gente muy amable. ¿Alguien tiene consejos para una próxima visita?',
        autor: 'maria_gonzalez',
        fecha: new Date('2024-12-10'),
        vistas: 125,
        respuestas: [
          {
            id: 1,
            contenido: '¡Qué genial! Perú es increíble. Mi consejo: lleva protector solar de alto índice, el sol es muy fuerte. También recomiendo visitar el lago Titicaca.',
            autor: 'pedro_ramirez',
            fecha: new Date('2024-12-10T14:30:00')
          },
          {
            id: 2,
            contenido: 'Las empanadas peruanas son lo mejor. No te pierdas los mercados locales en Lima, la comida es deliciosa.',
            autor: 'ana_torres',
            fecha: new Date('2024-12-10T15:45:00')
          }
        ]
      },
      {
        id: 2,
        titulo: '¿Cuál es el mejor destino para viajar en diciembre?',
        categoria: 'preguntas',
        contenido: 'Estoy planeando mis vacaciones de diciembre y no sé a dónde ir. Quiero un lugar con buen clima, que no sea muy caro y con buena gastronomía. ¿Qué recomiendan?',
        autor: 'jorge_castillo',
        fecha: new Date('2024-12-09'),
        vistas: 89,
        respuestas: [
          {
            id: 1,
            contenido: 'Colombia es perfecto en diciembre. El clima es excelente, es relativamente económico y la comida es increíble. Bogotá, Medellín y Cartagena son must-see.',
            autor: 'lucia_fernandez',
            fecha: new Date('2024-12-09T16:20:00')
          }
        ]
      },
      {
        id: 3,
        titulo: 'Fotos del viaje a Argentina - Paso a compartirlas',
        categoria: 'fotos',
        contenido: 'Acabo de volver de Argentina y tengo un montón de fotos increíbles. Visité Buenos Aires, Mendoza y las cataratas del Iguazú. Los atardeceres fueron espectaculares.\n\nBuenos Aires: arquitectura colonial increíble\nMendoza: paisajes de viñedos\nIguazú: natura salvaje y majestuosa',
        autor: 'carlos_mendez',
        fecha: new Date('2024-12-08'),
        vistas: 156,
        respuestas: []
      },
      {
        id: 4,
        titulo: 'Consejos para viajar con presupuesto limitado',
        categoria: 'consejos',
        contenido: 'He viajado a 15 países con presupuesto limitado. Aquí mis mejores consejos:\n1. Viaja en temporada baja\n2. Usa autobuses locales en lugar de aviones\n3. Come en mercados y pequeños restaurantes locales\n4. Busca free walking tours\n5. Alójate en hostales y haz intercambios\n6. Viaja lentamente, pasa más tiempo en menos lugares',
        autor: 'sofia_vargas',
        fecha: new Date('2024-12-07'),
        vistas: 234,
        respuestas: [
          {
            id: 1,
            contenido: 'Excelentes consejos. Añadiría: usa aplicaciones como Couchsurfing y Workaway para ahorrar en alojamiento.',
            autor: 'diego_suarez',
            fecha: new Date('2024-12-07T10:15:00')
          }
        ]
      }
    ];
  }

  guardarTemas() {
    localStorage.setItem('foroTemas', JSON.stringify(this.temas));
  }

  cargarDataUsuarios() {
    try {
      const script = document.createElement('script');
      script.src = './data/user.json';
      script.type = 'application/json';
    } catch (e) {
      console.log('Datos de usuarios cargados de manera alternativa');
    }
  }

  // ===== RENDERIZADO DE UI =====
  renderizarUI() {
    const estaLogueado = !!this.usuarioLogueado;
    
    const nuevoTemaContainer = document.getElementById('nuevoTemaContainer');
    const noLogueadoContainer = document.getElementById('noLogueadoContainer');
    
    if (estaLogueado) {
      if (nuevoTemaContainer) nuevoTemaContainer.style.display = 'block';
      if (noLogueadoContainer) noLogueadoContainer.style.display = 'none';
    } else {
      if (nuevoTemaContainer) nuevoTemaContainer.style.display = 'none';
      if (noLogueadoContainer) noLogueadoContainer.style.display = 'block';
    }

    this.renderizarTemas();
    this.actualizarContadores();
  }

  renderizarTemas() {
    const temasList = document.getElementById('temasList');
    if (!temasList) return;

    let temasFiltrados = this.filtrarTemas();
    temasFiltrados = this.ordenarTemas(temasFiltrados);

    if (temasFiltrados.length === 0) {
      const emptyText = this.translate('community_no_topics', 'No hay temas en esta categoría.');
      temasList.innerHTML = `
        <div class="sin-temas">
          <i class="fas fa-inbox"></i>
          <p>${this.escaparHTML(emptyText)}</p>
        </div>
      `;
      return;
    }

    temasList.innerHTML = temasFiltrados.map(tema => this.crearTarjetaTema(tema)).join('');
    
    // Agregar event listeners a las tarjetas
    document.querySelectorAll('.tema-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('button')) return; // No abrir si hace click en botón
        const temaId = parseInt(card.dataset.temaId);
        this.abrirTema(temaId);
      });
    });
  }

  crearTarjetaTema(tema) {
    const fecha = new Date(tema.fecha);
    const fechaFormato = this.formatearFecha(fecha);
    const autor = this.obtenerNombreAutor(tema.autor);
    const avatar = this.obtenerAvatarAutor(tema.autor);
    const categoriaTexto = this.getCategoryLabel(tema.categoria);
    const vistasTexto = this.formatCount('community_views_label', tema.vistas);
    const respuestasTexto = this.formatCount('community_replies_label', tema.respuestas.length);

    return `
      <div class="tema-card ${tema.categoria}" data-tema-id="${tema.id}">
        <div class="tema-header">
          <h3 class="tema-title">${this.escaparHTML(tema.titulo)}</h3>
          <span class="tema-badge ${tema.categoria}">
            <i class="fas fa-tag"></i>
            ${this.escaparHTML(categoriaTexto)}
          </span>
        </div>
        <p class="tema-description">${this.escaparHTML(tema.contenido)}</p>
        <div class="tema-meta">
          <div class="tema-meta-item">
            <i class="fas fa-eye"></i>
            <span>${this.escaparHTML(vistasTexto)}</span>
          </div>
          <div class="tema-meta-item">
            <i class="fas fa-comments"></i>
            <span>${this.escaparHTML(respuestasTexto)}</span>
          </div>
          <div class="tema-autor">
            <div class="tema-avatar">${avatar}</div>
            <div class="tema-autor-info">
              <div class="tema-autor-nombre">${this.escaparHTML(autor)}</div>
              <div class="tema-autor-fecha">${fechaFormato}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  formatearFecha(fecha) {
    const ahora = new Date();
    const diferencia = ahora - fecha;
    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (minutos < 1) return this.translate('time_seconds_ago', 'Hace unos segundos');

    if (minutos < 60) {
      const key = minutos === 1 ? 'time_minutes_ago' : 'time_minutes_ago_plural';
      return this.translate(key, 'Hace {n} minutos').replace('{n}', minutos);
    }

    if (horas < 24) {
      const key = horas === 1 ? 'time_hours_ago' : 'time_hours_ago_plural';
      return this.translate(key, 'Hace {n} horas').replace('{n}', horas);
    }

    if (dias < 7) {
      const key = dias === 1 ? 'time_days_ago' : 'time_days_ago_plural';
      return this.translate(key, 'Hace {n} días').replace('{n}', dias);
    }

    return fecha.toLocaleDateString(this.getLocale(), { year: 'numeric', month: 'long', day: 'numeric' });
  }

  filtrarTemas() {
    if (this.categoriaActual === 'all') {
      return this.temas;
    }
    return this.temas.filter(tema => tema.categoria === this.categoriaActual);
  }

  ordenarTemas(temas) {
    const copia = [...temas];
    
    if (this.ordenActual === 'recent') {
      return copia.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    } else if (this.ordenActual === 'popular') {
      return copia.sort((a, b) => b.vistas - a.vistas);
    } else if (this.ordenActual === 'replies') {
      return copia.sort((a, b) => b.respuestas.length - a.respuestas.length);
    }
    
    return copia;
  }

  actualizarContadores() {
    const temasCount = document.getElementById('temasCount');
    const temasFiltrados = this.filtrarTemas();
    if (temasCount) {
      temasCount.textContent = temasFiltrados.length;
    }
  }

  obtenerNombreAutor(username) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.username === username);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : username;
  }

  obtenerAvatarAutor(username) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.username === username);
    if (usuario) {
      return (usuario.nombre[0] + usuario.apellido[0]).toUpperCase();
    }
    return username.substring(0, 2).toUpperCase();
  }

  escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
  }

  // ===== MODAL DE TEMA =====
  abrirTema(temaId) {
    const tema = this.temas.find(t => t.id === temaId);
    if (!tema) return;

    // Incrementar vistas
    tema.vistas = (tema.vistas || 0) + 1;
    this.guardarTemas();

    const modal = document.getElementById('temaModal');
    const modalBody = modal.querySelector('.modal-body');

    const autor = this.obtenerNombreAutor(tema.autor);
    const avatar = this.obtenerAvatarAutor(tema.autor);
    const fechaFormato = this.formatearFecha(new Date(tema.fecha));
    const categoriaTexto = this.getCategoryLabel(tema.categoria);
    const vistasTexto = this.formatCount('community_views_label', tema.vistas);
    const respuestasTexto = this.formatCount('community_replies_label', tema.respuestas.length);
    const respuestasTitulo = this.translate('community_responses_title', 'Respuestas');
    const addRespuestaTitulo = this.translate('community_add_response_title', 'Agregar una respuesta');
    const replyPlaceholder = this.translate('community_reply_placeholder', 'Comparte tu respuesta...');
    const replySubmit = this.translate('community_reply_submit', 'Publicar respuesta');
    const replyReset = this.translate('community_reply_reset', 'Limpiar');
    const loginReplyTitle = this.translate('community_login_to_reply_title', 'Inicia sesión para responder');
    const loginReplyText = this.translate('community_login_to_reply_text', 'Necesitas estar logueado para publicar respuestas.');

    let htmlRespuestas = '';
    if (tema.respuestas.length > 0) {
      htmlRespuestas = `
        <div class="respuestas-section">
          <h2 class="respuestas-title">
            <i class="fas fa-comments"></i>
            ${this.escaparHTML(respuestasTitulo)}
            <span class="respuestas-count">${tema.respuestas.length}</span>
          </h2>
          <div class="respuestas-list">
            ${tema.respuestas.map(resp => this.crearRespuestaHTML(resp, tema.id)).join('')}
          </div>
        </div>
      `;
    }

    const htmlFormRespuesta = this.usuarioLogueado ? `
      <div class="form-respuesta-container">
        <h3>${this.escaparHTML(addRespuestaTitulo)}</h3>
        <form class="form-respuesta" data-tema-id="${tema.id}">
          <textarea rows="5" placeholder="${this.escaparHTML(replyPlaceholder)}" required></textarea>
          <div class="form-respuesta-buttons">
            <button type="submit" class="btn btn-primary">${this.escaparHTML(replySubmit)}</button>
            <button type="reset" class="btn btn-secondary">${this.escaparHTML(replyReset)}</button>
          </div>
        </form>
      </div>
    ` : `
      <div class="no-logueado-container">
        <i class="fas fa-lock"></i>
        <h3>${this.escaparHTML(loginReplyTitle)}</h3>
        <p>${this.escaparHTML(loginReplyText)}</p>
      </div>
    `;

    modalBody.innerHTML = `
      <div class="tema-detalle-header">
        <h1 class="tema-detalle-title">${this.escaparHTML(tema.titulo)}</h1>
        <div class="tema-detalle-meta">
          <div class="tema-detalle-autor">
            <div class="tema-detalle-avatar">${avatar}</div>
            <div class="tema-detalle-autor-info">
              <div class="tema-detalle-autor-nombre">${this.escaparHTML(autor)}</div>
              <div class="tema-detalle-autor-fecha">${fechaFormato}</div>
            </div>
          </div>
          <div class="tema-meta-item">
            <i class="fas fa-eye"></i>
            <span>${this.escaparHTML(vistasTexto)}</span>
          </div>
          <span class="tema-badge ${tema.categoria}">
            <i class="fas fa-tag"></i>
            ${this.escaparHTML(categoriaTexto)}
          </span>
        </div>
      </div>

      <div class="tema-detalle-content">${this.escaparHTML(tema.contenido)}</div>

      ${htmlRespuestas}

      ${htmlFormRespuesta}
    `;

    modal.classList.add('show');

    // Event listeners del modal
    const closeBtn = modal.querySelector('.close-modal-btn');
    closeBtn.addEventListener('click', () => this.cerrarModal());

    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.cerrarModal();
    });

    // Form de respuesta
    if (this.usuarioLogueado) {
      const formRespuesta = modalBody.querySelector('.form-respuesta');
      if (formRespuesta) {
        formRespuesta.addEventListener('submit', (e) => this.enviarRespuesta(e, tema.id));
      }
    }
  }

  crearRespuestaHTML(respuesta, temaId) {
    const autor = this.obtenerNombreAutor(respuesta.autor);
    const avatar = this.obtenerAvatarAutor(respuesta.autor);
    const fechaFormato = this.formatearFecha(new Date(respuesta.fecha));

    return `
      <div class="respuesta-card">
        <div class="respuesta-header">
          <div class="respuesta-autor">
            <div class="respuesta-avatar">${avatar}</div>
            <div class="respuesta-autor-info">
              <div class="respuesta-autor-nombre">${this.escaparHTML(autor)}</div>
              <div class="respuesta-fecha">${fechaFormato}</div>
            </div>
          </div>
        </div>
        <div class="respuesta-content">${this.escaparHTML(respuesta.contenido)}</div>
      </div>
    `;
  }

  cerrarModal() {
    const modal = document.getElementById('temaModal');
    modal.classList.remove('show');
  }

  // ===== MANEJO DE FORMULARIOS =====
  agregarEventListeners() {
    // Form de nuevo tema
    const formNuevoTema = document.getElementById('formNuevoTema');
    if (formNuevoTema) {
      formNuevoTema.addEventListener('submit', (e) => this.crearNuevoTema(e));
    }

    // Filtros de categoría
    document.querySelectorAll('.categories-list a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remover clase active de todos
        document.querySelectorAll('.categories-list a').forEach(l => l.classList.remove('active'));
        
        // Agregar clase active al actual
        link.classList.add('active');
        
        // Actualizar categoría
        this.categoriaActual = link.dataset.category;
        
        // Re-renderizar
        this.renderizarTemas();
      });
    });

    // Ordenamiento
    document.querySelectorAll('input[name="sortBy"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.ordenActual = e.target.value;
        this.renderizarTemas();
      });
    });
  }

  crearNuevoTema(e) {
    e.preventDefault();

    if (!this.usuarioLogueado) {
      this.mostrarMensaje(this.translate('community_error_login_create', 'Debes iniciar sesión para crear un tema'), 'error');
      return;
    }

    const titulo = document.getElementById('tituloTema').value.trim();
    const categoria = document.getElementById('categoriaTema').value;
    const contenido = document.getElementById('contenidoTema').value.trim();

    if (!titulo || !categoria || !contenido) {
      this.mostrarMensaje(this.translate('community_error_required_fields', 'Por favor completa todos los campos'), 'error');
      return;
    }

    const nuevoTema = {
      id: Math.max(...this.temas.map(t => t.id), 0) + 1,
      titulo,
      categoria,
      contenido,
      autor: this.usuarioLogueado,
      fecha: new Date(),
      vistas: 1,
      respuestas: []
    };

    this.temas.unshift(nuevoTema);
    this.guardarTemas();
    this.renderizarTemas();

    // Limpiar formulario
    document.getElementById('formNuevoTema').reset();
    
    this.mostrarMensaje(this.translate('community_success_topic_created', '¡Tema creado exitosamente!'), 'success');
  }

  enviarRespuesta(e, temaId) {
    e.preventDefault();

    if (!this.usuarioLogueado) {
      this.mostrarMensaje(this.translate('community_error_login_reply', 'Debes iniciar sesión para responder'), 'error');
      return;
    }

    const tema = this.temas.find(t => t.id === temaId);
    if (!tema) return;

    const textarea = e.target.querySelector('textarea');
    const contenido = textarea.value.trim();

    if (!contenido) {
      this.mostrarMensaje(this.translate('community_error_empty_reply', 'La respuesta no puede estar vacía'), 'error');
      return;
    }

    const nuevaRespuesta = {
      id: Math.max(...tema.respuestas.map(r => r.id), 0) + 1,
      contenido,
      autor: this.usuarioLogueado,
      fecha: new Date()
    };

    tema.respuestas.push(nuevaRespuesta);
    this.guardarTemas();

    // Re-abrir el tema para actualizar
    this.abrirTema(temaId);

    this.mostrarMensaje(this.translate('community_success_reply_posted', '¡Respuesta publicada!'), 'success');
  }

  mostrarMensaje(texto, tipo = 'info') {
    // Buscar o crear contenedor de mensaje
    let mensaje = document.querySelector('.status-message');
    if (!mensaje) {
      mensaje = document.createElement('div');
      document.querySelector('.comunidad-content').prepend(mensaje);
    }

    mensaje.className = `status-message ${tipo}`;
    
    const iconos = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-circle',
      info: 'fa-info-circle'
    };

    mensaje.innerHTML = `
      <i class="fas ${iconos[tipo]}"></i>
      <span>${this.escaparHTML(texto)}</span>
    `;

    setTimeout(() => {
      mensaje.style.opacity = '0';
      setTimeout(() => {
        mensaje.style.opacity = '1';
        mensaje.innerHTML = '';
      }, 300);
    }, 3000);
  }
}

// Funciones auxiliares para popups
function abrirPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (!popup) return;
  
  popup.classList.add('active');
  document.body.classList.add('no-scroll');
}

function cerrarPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (!popup) return;
  
  popup.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

function manejarCerrarSesion() {
  const popup = document.getElementById('popupCerrarSesion');
  if (!popup) return;
  
  abrirPopup('popupCerrarSesion');
  
  const confirmar = document.getElementById('confirmarCerrar');
  const cancelar = document.getElementById('cancelarCerrar');
  
  confirmar.onclick = () => {
    sessionStorage.setItem('loginValido', 'false');
    sessionStorage.removeItem('usuarioLogueado');
    cerrarPopup('popupCerrarSesion');
    window.location.href = 'index.html';
  };
  
  cancelar.onclick = () => {
    cerrarPopup('popupCerrarSesion');
  };
  
  // Cerrar cuando se hace click fuera
  const onClickOutside = (e) => {
    if (e.target === popup) {
      cerrarPopup('popupCerrarSesion');
      popup.removeEventListener('click', onClickOutside);
    }
  };
  
  popup.addEventListener('click', onClickOutside);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new ComunidadForo();
  
  // Agregar event listeners para popups
  // Cerrar sesión
  const btnCerrarSesion = document.querySelector('[data-i18n="profile_logout"]');
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', manejarCerrarSesion);
  }
  
  // Mis Rutas
  const btnMisRutas = document.querySelector('[data-i18n="profile_routes"]');
  if (btnMisRutas) {
    btnMisRutas.addEventListener('click', (e) => {
      e.stopPropagation();
      abrirPopup('popupMisRutas');
      const userMenu = document.getElementById('userMenu');
      if (userMenu) userMenu.classList.remove('active');
    });
  }
  
  // Cerrar botones de popups (excepto popupFriends y popupEliminarAmigo que son manejados por friends.js)
  document.querySelectorAll('.close-popup-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const popup = btn.closest('.popup');
      if (popup) cerrarPopup(popup.id);
    });
  });
  
  // Cerrar popup cuando se hace click fuera (excepto friends-popup)
  document.querySelectorAll('.popup:not(.friends-popup)').forEach(popup => {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        cerrarPopup(popup.id);
      }
    });
  });
});
