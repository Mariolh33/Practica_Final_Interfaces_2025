async function loadData() {
  const [routeRes, userRes, i18nRes] = await Promise.all([
    fetch('../data/route.json').then(r => r.json()),
    fetch('../data/user.json').then(r => r.json()),
    fetch('../data/i18n/es/route.json').then(r => r.json())
  ]);

  const routeData = routeRes;
  const userData = userRes;
  const i18nRoute = i18nRes;

  // Inicializar app después de cargar datos
  initializeApp(routeData, userData, i18nRoute);
}

document.addEventListener('DOMContentLoaded', loadData);

function initializeApp(routeData, userData, i18nRoute) {
  const urlParams = new URLSearchParams(window.location.search);
  // const routeId = urlParams.get('id') || 'route_caminoinca';
  const routeId = 'route_caminoinca';

  loadRouteData(routeId, routeData, i18nRoute);
  initializeTabs();
  initializeGallery();
  initializeFavoriteButton(routeId);
  initializeShareButtons();
  loadWeatherData();
  loadReviews(routeId, routeData, userData, i18nRoute);
  initializeBooking();
  initializeReviewFilters();
}


// ===========================
// CARGAR DATOS DE LA RUTA
// ===========================
function loadRouteData(routeId, routeData, i18nRoute) {
  
  const route = routeData[routeId];
  const i18n = i18nRoute[routeId] || {};

  console.log(route);
  console.log(i18n);
  console.log(route.reviewsCount);

 
  document.getElementById('breadcrumbTitle').textContent = i18n.title;
  document.getElementById('routeTitle').textContent = i18n.title;
  document.getElementById('routeLocation').textContent = i18n.location;
  document.getElementById('routeRating').textContent = route.rating;
  document.getElementById('reviewsCount').textContent = route.reviewsCount.toLocaleString();
  document.getElementById('routeDistance').textContent = route.distance;
  document.getElementById('routePrice').textContent = route.priceFrom.toLocaleString();
  document.getElementById('routeTravelers').textContent = route.travelers.toLocaleString();
  document.getElementById('routeFavorites').textContent = route.favorites.toLocaleString();
  document.getElementById('routeShortDescription').textContent = i18n.descShort;
  document.getElementById('routeDescription').textContent = i18n.descLong;
}

// ===========================
// SISTEMA DE TABS
// ===========================
function initializeTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(targetTab).classList.add('active');

      if (targetTab === 'map') setTimeout(initializeMap, 100);
    });
  });
}

// ===========================
// GALERÍA DE IMÁGENES
// ===========================
function initializeGallery() {
  const mainImage = document.getElementById('mainImage');
  const thumbnails = document.querySelectorAll('.thumb:not(.more-images)');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      mainImage.src = thumb.src;
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (mainImage.requestFullscreen) mainImage.requestFullscreen();
      else if (mainImage.webkitRequestFullscreen) mainImage.webkitRequestFullscreen();
      else if (mainImage.msRequestFullscreen) mainImage.msRequestFullscreen();
    });
  }
}

// ===========================
// MAPA INTERACTIVO (Leaflet)
// ===========================
let map = null;
function initializeMap() {
  if (map) { map.invalidateSize(); return; }

  const routeId = new URLSearchParams(window.location.search).get('id') || '1';
  const route = routeData[routeId] || routeData['1'];

  map = L.map('routeMap').setView(route.coordinates, 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  const startIcon = L.divIcon({
    html: '<div class="marker-start"><i class="fas fa-flag"></i></div>',
    className: '',
    iconSize: [32, 32]
  });

  L.marker(route.coordinates, { icon: startIcon })
    .addTo(map)
    .bindPopup(`<strong>${route.title}</strong><br>${route.location}`);

  // Polilínea simulada
  const routePath = route.coordinates.concat([ // ejemplo simple
    [route.coordinates[0]+0.1, route.coordinates[1]+0.1],
    [route.coordinates[0]+0.2, route.coordinates[1]+0.05]
  ]);

  L.polyline(routePath, { color: '#2563eb', weight: 4, opacity: 0.8 }).addTo(map);

  const endIcon = L.divIcon({
    html: '<div class="marker-end"><i class="fas fa-flag-checkered"></i></div>',
    className: '',
    iconSize: [32, 32]
  });

  L.marker(routePath[routePath.length-1], { icon: endIcon })
    .addTo(map)
    .bindPopup('<strong>Meta</strong><br>Machu Picchu');

  map.fitBounds(routePath);
  initializeElevationChart();
}

// ===========================
// GRÁFICO DE ELEVACIÓN (Chart.js)
// ===========================
function initializeElevationChart() {
  const ctx = document.getElementById('elevationChart');
  if (!ctx) return;

  const elevationData = {
    labels: ['Km 0','Km 10','Km 20','Km 30','Km 43'],
    datasets: [{
      label: 'Elevación (msnm)',
      data: [2800,3200,4200,3600,2430],
      fill: true,
      backgroundColor: 'rgba(37,99,235,0.2)',
      borderColor: 'rgba(37,99,235,1)',
      borderWidth: 3,
      tension: 0.4,
      pointRadius: 5,
      pointBackgroundColor: 'rgba(37,99,235,1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointHoverRadius: 7
    }]
  };

  new Chart(ctx, {
    type: 'line',
    data: elevationData,
    options: { responsive:true, plugins:{legend:{display:false}}}
  });
}

// ===========================
// CLIMA (simulado)
// ===========================
function loadWeatherData() {
  const weatherData = { temp:18, description:"Parcialmente nublado", humidity:65, windSpeed:12, icon:"02d" };
  document.getElementById('temperature').textContent = weatherData.temp;
  document.getElementById('weatherDescription').textContent = weatherData.description;
  document.getElementById('humidity').textContent = weatherData.humidity;
  document.getElementById('windSpeed').textContent = weatherData.windSpeed;
  document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
}

// ===========================
// FAVORITOS
// ===========================
function initializeFavoriteButton(routeId) {
  const favBtn = document.getElementById('addToFavBtn');
  if (!favBtn) return;

  const favorites = JSON.parse(localStorage.getItem('favorites')||'[]');
  let isFavorite = favorites.includes(parseInt(routeId));
  updateFavButton(favBtn, isFavorite);

  favBtn.addEventListener('click', () => {
    isFavorite = !isFavorite;
    if (isFavorite) favorites.push(parseInt(routeId));
    else favorites.splice(favorites.indexOf(parseInt(routeId)),1);
    localStorage.setItem('favorites',JSON.stringify(favorites));
    updateFavButton(favBtn,isFavorite);
  });
}
function updateFavButton(btn,active){
  btn.innerHTML = active?'<i class="fas fa-heart"></i> En favoritos':'<i class="far fa-heart"></i> Guardar en favoritos';
  btn.classList.toggle('active',active);
}

// ===========================
// COMPARTIR
// ===========================
function initializeShareButtons() {
  const shareButtons = document.querySelectorAll('.share-buttons .btn-icon');
  shareButtons.forEach((btn,index)=>{
    btn.addEventListener('click',()=>{
      const url = window.location.href;
      const title = document.getElementById('routeTitle').textContent;
      switch(index){
        case 0: window.open(`https://wa.me/?text=${encodeURIComponent(title+' - '+url)}`,'_blank'); break;
        case 1: window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,'_blank'); break;
        case 2: window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,'_blank'); break;
        case 3: navigator.clipboard.writeText(url).then(()=>alert('¡Enlace copiado al portapapeles!')); break;
      }
    });
  });
}

// ===========================
// RESEÑAS
// ===========================
function loadReviews(routeId) {
  const reviewsList = document.getElementById('reviewsList');
  if (!reviewsList) return;

  // Mapear reviews con usuarios e i18n
  const reviews = (routeData[routeId]?.reviewsData || []).map(r=>{
    const user = userData[r.user] || { name: r.author, avatar: r.avatar };
    const text = i18nRoute[routeId]?.reviews?.[r.id] || r.text;
    return {...r, author:user.name, avatar:user.avatar, text};
  });

  reviewsList.innerHTML = reviews.map(r=>`
    <div class="review-card">
      <div class="review-header">
        <div class="reviewer-info">
          <div class="reviewer-avatar">${r.avatar}</div>
          <div><div class="reviewer-name">${r.author}</div><div class="review-date">${r.date}</div></div>
        </div>
        <div class="review-rating">${generateStars(r.rating)}</div>
      </div>
      <div class="review-text">${r.text}</div>
      ${r.images.length>0? `<div class="review-images">${r.images.map(img=>`<img src="${img}" alt="Foto de reseña">`).join('')}</div>`: ''}
      <div class="review-helpful"><span>${r.helpful} personas encontraron esto útil</span> <button onclick="markHelpful(${r.id})"><i class="far fa-thumbs-up"></i> Útil</button></div>
    </div>
  `).join('');
}
