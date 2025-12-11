// ============================================
// VARIABLES GLOBALES
// ============================================
let routeData = {};
let userData = {};
let i18nRoute = {};
let currentRouteId = 'route_caminoinca';

// ============================================
// CARGAR DATOS
// ============================================
async function loadData() {
  try {
    console.log('=== INICIANDO CARGA DE DATOS ===');
    
    const [routeRes, userRes, i18nRes] = await Promise.all([
      fetch('./data/route.json').then(r => r.json()),
      fetch('./data/user.json').then(r => r.json()),
      fetch('./data/i18n/es/route.json').then(r => r.json())
    ]);

    routeData = routeRes;
    userData = userRes;
    i18nRoute = i18nRes;

    console.log('routeData cargado:', routeData);
    console.log('userData cargado, usuarios:', Object.keys(userData).length);
    console.log('i18nRoute cargado:', i18nRoute);

    console.log('=== DATOS CARGADOS EXITOSAMENTE ===');
    initializeApp();
  } catch (error) {
    console.error('=== ERROR CARGANDO DATOS ===', error);
    alert('Error cargando datos: ' + error.message);
  }
}

document.addEventListener('DOMContentLoaded', loadData);

// ============================================
// INICIALIZAR APP
// ============================================
function initializeApp() {
  console.log('=== INICIALIZANDO APP ===');
  console.log('URL completa:', window.location.href);
  console.log('Query string:', window.location.search);
  
  const urlParams = new URLSearchParams(window.location.search);
  let routeId = urlParams.get('id');
  
  console.log('ID desde URL (raw):', routeId);
  console.log('routeData keys disponibles:', Object.keys(routeData));
  
  // Si no hay ID o no existe, usar el primero disponible
  if (!routeId || !(routeId in routeData)) {
    console.warn('ID de ruta no encontrado o inválido:', routeId);
    routeId = 'route_caminoinca';
    console.log('Usando ruta por defecto:', routeId);
  }

  currentRouteId = routeId;

  console.log('currentRouteId final:', currentRouteId);
  console.log('Título de la ruta:', routeData[currentRouteId]?.title);

  loadRouteData(currentRouteId);
  loadGallery(currentRouteId);
  loadIncludes(currentRouteId);
  loadItinerary(currentRouteId);
  initializeTabs();
  initializeGallery();
  initializeFavoriteButton(currentRouteId);
  initializeShareButtons();
  loadWeatherData();
  loadReviews(currentRouteId);
  initializeBooking();
  initializeReviewFilters();
}

// ============================================
// CARGAR DATOS DE RUTA
// ============================================
function loadRouteData(routeId) {
  console.log('>>> loadRouteData:', routeId);
  
  const route = routeData[routeId];
  const i18n = i18nRoute[routeId] || {};

  if (!route) {
    console.error(`Ruta no encontrada: ${routeId}`);
    return;
  }

  console.log('Ruta encontrada:', route);
  console.log('i18n datos:', i18n);

  // Actualizar elementos HTML
  const updateEl = (id, value) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = value;
      console.log(`✓ ${id}: ${value}`);
    } else {
      console.warn(`✗ Elemento no existe: ${id}`);
    }
  };

  updateEl('breadcrumbTitle', i18n.title || route.title || 'Ruta');
  updateEl('routeTitle', i18n.title || route.title || '');
  updateEl('routeLocation', i18n.location || route.location || '');
  updateEl('routeRating', route.rating || '0');
  updateEl('reviewsCount', (route.reviewsCount || 0).toLocaleString());
  updateEl('routeDistance', route.distance || '0');
  updateEl('routePrice', (route.priceFrom || 0).toLocaleString());
  updateEl('routeTravelers', (route.travelers || 0).toLocaleString());
  updateEl('routeFavorites', (route.favorites || 0).toLocaleString());
  updateEl('routeShortDescription', i18n.descShort || '');
  updateEl('routeDescription', i18n.descLong || '');
}

// ============================================
// CARGAR GALERÍA
// ============================================
function loadGallery(routeId) {
  console.log('>>> loadGallery:', routeId);
  
  const route = routeData[routeId];
  if (!route || !route.images) {
    console.warn('No hay imágenes para cargar');
    return;
  }

  console.log('Imágenes encontradas:', route.images);
  console.log('Primera imagen:', route.images[0]);

  const mainImage = document.getElementById('mainImage');
  const galleryContainer = document.getElementById('galleryThumbnails');

  console.log('mainImage elemento:', mainImage);
  console.log('galleryContainer elemento:', galleryContainer);

  if (mainImage && route.images.length > 0) {
    const imagePath = `./${route.images[0]}`;
    console.log('Asignando mainImage.src a:', imagePath);
    mainImage.src = imagePath;
  }

  if (galleryContainer) {
    galleryContainer.innerHTML = route.images.map((img, idx) => `
      <img src="./${img}" alt="Foto ${idx + 1}" class="thumb ${idx === 0 ? 'active' : ''}">
    `).join('');
    console.log('Galería cargada con', route.images.length, 'imágenes');
  }
}

// ============================================
// CARGAR INCLUYE
// ============================================
function loadIncludes(routeId) {
  console.log('>>> loadIncludes:', routeId);
  
  const route = routeData[routeId];
  if (!route || !route.includes) return;

  const includesGrid = document.getElementById('includesGrid');
  if (!includesGrid) return;

  const icons = {
    'guide': { icon: 'fa-person-hiking', text: 'Guía profesional' },
    'transport': { icon: 'fa-car', text: 'Transporte' },
    'meals': { icon: 'fa-utensils', text: 'Comidas' },
    'camping-gear': { icon: 'fa-tent', text: 'Equipo camping' },
    'permits': { icon: 'fa-ticket', text: 'Permisos' },
    'insurance': { icon: 'fa-shield', text: 'Seguro' }
  };

  includesGrid.innerHTML = route.includes.map(item => {
    const config = icons[item] || { icon: 'fa-check', text: item };
    return `
      <div class="include-item">
        <i class="fas ${config.icon}"></i>
        <span>${config.text}</span>
      </div>
    `;
  }).join('');
}

// ============================================
// CARGAR ITINERARIO
// ============================================
function loadItinerary(routeId) {
  console.log('>>> loadItinerary:', routeId);
  
  const route = routeData[routeId];
  const i18n = i18nRoute[routeId] || {};

  if (!route || !route.itinerary) {
    console.warn('No hay itinerario');
    return;
  }

  const container = document.getElementById('itineraryTimeline');
  if (!container) {
    console.warn('Contenedor itineraryTimeline no existe');
    return;
  }

  container.innerHTML = route.itinerary.map(day => {
    const dayData = i18n.itinerary?.[day.day] || {};
    return `
      <div class="itinerary-day">
        <div class="day-header">
          <h3>${dayData.title || `Día ${day.day}`}</h3>
          <div class="day-stats">
            <span><i class="fas fa-route"></i> ${day.distance} km</span>
            <span><i class="fas fa-clock"></i> ${day.duration}</span>
            <span><i class="fas fa-mountain"></i> ${day.altitude}m</span>
          </div>
        </div>
        <p class="day-description">${dayData.text || 'Descripción disponible'}</p>
      </div>
    `;
  }).join('');

  console.log('✓ Itinerario cargado');
}

// ============================================
// TABS
// ============================================
function initializeTabs() {
  console.log('>>> initializeTabs');
  
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  console.log('Botones encontrados:', tabBtns.length);
  console.log('Contenidos encontrados:', tabContents.length);
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;
      console.log('Click en tab:', targetTab);
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
      } else {
        console.warn('Contenido no encontrado:', targetTab);
      }

      if (targetTab === 'map') {
        setTimeout(initializeMap, 100);
      }
    });
  });
}

// ============================================
// GALERÍA
// ============================================
function initializeGallery() {
  console.log('>>> initializeGallery');
  
  const mainImage = document.getElementById('mainImage');
  const galleryContainer = document.getElementById('galleryThumbnails');
  
  if (!galleryContainer) {
    console.warn('Galería container no existe');
    return;
  }

  const thumbnails = galleryContainer.querySelectorAll('.thumb');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  console.log('Thumbnails encontrados:', thumbnails.length);

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      if (mainImage) mainImage.src = thumb.src;
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  if (fullscreenBtn && mainImage) {
    fullscreenBtn.addEventListener('click', () => {
      if (mainImage.requestFullscreen) mainImage.requestFullscreen();
      else if (mainImage.webkitRequestFullscreen) mainImage.webkitRequestFullscreen();
    });
  }
}

// ============================================
// MAPA
// ============================================
let map = null;

function initializeMap() {
  console.log('>>> initializeMap');
  
  if (map) {
    map.invalidateSize();
    return;
  }

  const route = routeData[currentRouteId];
  if (!route || !route.coordinates) {
    console.warn('No hay coordenadas para el mapa');
    return;
  }

  const mapContainer = document.getElementById('routeMap');
  if (!mapContainer) {
    console.warn('Contenedor routeMap no existe');
    return;
  }

  try {
    map = L.map('routeMap').setView(route.coordinates, 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 18
    }).addTo(map);

    L.marker(route.coordinates).addTo(map).bindPopup(route.title);

    console.log('✓ Mapa inicializado');
    initializeElevationChart();
  } catch (e) {
    console.error('Error inicializando mapa:', e);
  }
}

// ============================================
// GRÁFICO ELEVACIÓN
// ============================================
function initializeElevationChart() {
  console.log('>>> initializeElevationChart');
  
  const ctx = document.getElementById('elevationChart');
  if (!ctx) {
    console.warn('Canvas elevationChart no existe');
    return;
  }

  const route = routeData[currentRouteId];
  const elevationData = route?.elevationProfile || [
    { km: 0, m: 2600 },
    { km: 10, m: 3000 },
    { km: 20, m: 4200 },
    { km: 30, m: 3600 },
    { km: 40, m: 2800 },
    { km: 43, m: 2430 }
  ];

  const labels = elevationData.map(d => `Km ${d.km}`);
  const data = elevationData.map(d => d.m);

  try {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Elevación (m)',
          data: data,
          fill: true,
          backgroundColor: 'rgba(37,99,235,0.2)',
          borderColor: 'rgba(37,99,235,1)',
          borderWidth: 3,
          tension: 0.4
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
    console.log('✓ Gráfico elevación inicializado');
  } catch (e) {
    console.error('Error en gráfico:', e);
  }
}

// ============================================
// CLIMA
// ============================================
function loadWeatherData() {
  console.log('>>> loadWeatherData');
  
  const weather = { temp: 18, description: "Parcialmente nublado", humidity: 65, windSpeed: 12, icon: "02d" };

  document.getElementById('temperature').textContent = weather.temp;
  document.getElementById('weatherDescription').textContent = weather.description;
  document.getElementById('humidity').textContent = weather.humidity;
  document.getElementById('windSpeed').textContent = weather.windSpeed;
  document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
}

// ============================================
// FAVORITOS
// ============================================
function initializeFavoriteButton(routeId) {
  console.log('>>> initializeFavoriteButton:', routeId);
  
  const favBtn = document.getElementById('addToFavBtn');
  if (!favBtn) return;

  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  let isFav = favorites.includes(routeId);
  updateFavButton(favBtn, isFav);

  favBtn.addEventListener('click', () => {
    isFav = !isFav;
    if (isFav) favorites.push(routeId);
    else favorites = favorites.filter(id => id !== routeId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavButton(favBtn, isFav);
  });
}

function updateFavButton(btn, active) {
  btn.innerHTML = active ? '<i class="fas fa-heart"></i> En favoritos' : '<i class="far fa-heart"></i> Guardar';
  btn.classList.toggle('active', active);
}

// ============================================
// COMPARTIR
// ============================================
function initializeShareButtons() {
  console.log('>>> initializeShareButtons');
  
  const shareContainer = document.getElementById('shareButtons');
  if (!shareContainer) return;

  shareContainer.innerHTML = `
    <button class="btn-icon" onclick="shareWhatsApp()" title="WhatsApp">
      <i class="fab fa-whatsapp"></i>
    </button>
    <button class="btn-icon" onclick="shareFacebook()" title="Facebook">
      <i class="fab fa-facebook"></i>
    </button>
    <button class="btn-icon" onclick="shareTwitter()" title="Twitter">
      <i class="fab fa-twitter"></i>
    </button>
    <button class="btn-icon" onclick="copyLink()" title="Copiar">
      <i class="fas fa-link"></i>
    </button>
  `;
}

function shareWhatsApp() {
  const url = window.location.href;
  const title = document.getElementById('routeTitle')?.textContent || 'Mi ruta';
  window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
}

function shareFacebook() {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
}

function shareTwitter() {
  const title = document.getElementById('routeTitle')?.textContent || 'Mi ruta';
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => alert('¡Enlace copiado!'));
}

// ============================================
// RESEÑAS
// ============================================
function generateStars(rating) {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) stars += '<i class="fas fa-star"></i>';
    else if (i < rating) stars += '<i class="fas fa-star-half-alt"></i>';
    else stars += '<i class="far fa-star"></i>';
  }
  return stars;
}

function markHelpful(id) {
  alert('Gracias por tu feedback');
}

function loadReviews(routeId) {
  console.log('>>> loadReviews:', routeId);
  
  const reviewsList = document.getElementById('reviewsList');
  if (!reviewsList) {
    console.warn('reviewsList no existe');
    return;
  }

  const route = routeData[routeId];
  if (!route || !route.reviewsData) {
    reviewsList.innerHTML = '<p>Sin reseñas</p>';
    return;
  }

  const reviews = route.reviewsData.map(r => {
    const user = userData[r.user] || { name: 'Anónimo', avatar: '?' };
    const text = i18nRoute[routeId]?.reviews?.[r.id] || 'Sin descripción';
    return { ...r, author: user.name, avatar: user.avatar, text };
  });

  reviewsList.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div class="reviewer-info">
          <div class="reviewer-avatar">${r.avatar}</div>
          <div class="reviewer-name">${r.author}</div>
          <div class="review-date">${r.date}</div>
        </div>
        <div class="review-rating">${generateStars(r.rating)}</div>
      </div>
      <div class="review-text">${r.text}</div>
      <div class="review-helpful">
        ${r.helpful || 0} útil - <button onclick="markHelpful('${r.id}')">👍</button>
      </div>
    </div>
  `).join('');

  console.log('✓ Reseñas cargadas:', reviews.length);
}

// ============================================
// RESERVA Y FILTROS
// ============================================
function initializeBooking() {
  console.log('>>> initializeBooking');
  
  const bookBtn = document.getElementById('bookNowBtn');
  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      alert('Reserva próximamente');
    });
  }
}

function initializeReviewFilters() {
  console.log('>>> initializeReviewFilters');
}

console.log('Script detalle-ruta.js cargado');
