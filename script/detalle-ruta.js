/* ==========================================
   DETALLE DE RUTA
   JavaScript con Leaflet Maps y Chart.js
========================================== */

// ===========================
// DATOS DE LA RUTA (mock data)
// ===========================
const routeData = {
  1: {
    title: "Camino Inca a Machu Picchu",
    location: "Cusco, Perú",
    coordinates: [-13.1631, -72.5450],
    rating: 4.9,
    reviews: 2847,
    distance: 43,
    travelers: 12450,
    favorites: 3821,
    price: 450,
    description: "Una experiencia única recorriendo los pasos de los antiguos incas...",
    images: ["images/machu-picchu.jpg", "images/patagonia.jpg", "images/annapurna.jpg", "images/islandia.jpg"]
  }
};

// ===========================
// INICIALIZACIÓN
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const routeId = urlParams.get('id') || 1;
  
  loadRouteData(routeId);
  initializeTabs();
  initializeGallery();
  initializeFavoriteButton();
  initializeShareButtons();
  loadWeatherData();
  loadReviews();
});

// ===========================
// CARGAR DATOS DE LA RUTA
// ===========================
function loadRouteData(routeId) {
  const route = routeData[routeId] || routeData[1];
  
  // Actualizar breadcrumb
  document.getElementById('breadcrumbTitle').textContent = route.title;
  
  // Actualizar header
  document.getElementById('routeTitle').textContent = route.title;
  document.getElementById('routeLocation').textContent = route.location;
  document.getElementById('routeRating').textContent = route.rating;
  document.getElementById('routeReviews').textContent = route.reviews.toLocaleString();
  document.getElementById('routeDistance').textContent = route.distance;
  document.getElementById('routeTravelers').textContent = route.travelers.toLocaleString();
  document.getElementById('routeFavorites').textContent = route.favorites.toLocaleString();
  document.getElementById('routePrice').textContent = route.price;
  document.getElementById('routeDescription').textContent = route.description;
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
      
      // Remover active de todos
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Activar el seleccionado
      btn.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
      
      // Si es el tab de mapa, inicializar/actualizar mapa
      if (targetTab === 'map') {
        setTimeout(() => initializeMap(), 100);
      }
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
      // Actualizar imagen principal
      mainImage.src = thumb.src;
      
      // Actualizar activo
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
  
  // Fullscreen
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (mainImage.requestFullscreen) {
        mainImage.requestFullscreen();
      } else if (mainImage.webkitRequestFullscreen) {
        mainImage.webkitRequestFullscreen();
      } else if (mainImage.msRequestFullscreen) {
        mainImage.msRequestFullscreen();
      }
    });
  }
}

// ===========================
// MAPA INTERACTIVO
// ===========================
let map = null;

function initializeMap() {
  if (map) {
    map.invalidateSize();
    return;
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const routeId = urlParams.get('id') || 1;
  const route = routeData[routeId] || routeData[1];
  
  // Inicializar mapa
  map = L.map('routeMap').setView(route.coordinates, 10);
  
  // Añadir tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);
  
  // Marcador de inicio
  const startIcon = L.divIcon({
    html: '<div style="background: #2563eb; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><i class="fas fa-flag"></i></div>',
    className: '',
    iconSize: [32, 32]
  });
  
  L.marker(route.coordinates, { icon: startIcon })
    .addTo(map)
    .bindPopup(`<strong>${route.title}</strong><br>${route.location}`);
  
  // Simular ruta (polilínea)
  const routePath = [
    [route.coordinates[0], route.coordinates[1]],
    [route.coordinates[0] + 0.1, route.coordinates[1] + 0.1],
    [route.coordinates[0] + 0.2, route.coordinates[1] + 0.05],
    [route.coordinates[0] + 0.25, route.coordinates[1] - 0.05]
  ];
  
  L.polyline(routePath, {
    color: '#2563eb',
    weight: 4,
    opacity: 0.8
  }).addTo(map);
  
  // Marcador de fin
  const endIcon = L.divIcon({
    html: '<div style="background: #dc2626; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><i class="fas fa-flag-checkered"></i></div>',
    className: '',
    iconSize: [32, 32]
  });
  
  L.marker(routePath[routePath.length - 1], { icon: endIcon })
    .addTo(map)
    .bindPopup('<strong>Meta</strong><br>Machu Picchu');
  
  // Ajustar vista a la ruta
  map.fitBounds(routePath);
  
  // Inicializar gráfico de elevación
  initializeElevationChart();
}

// ===========================
// GRÁFICO DE ELEVACIÓN
// ===========================
function initializeElevationChart() {
  const ctx = document.getElementById('elevationChart');
  if (!ctx) return;
  
  // Datos de elevación simulados
  const elevationData = {
    labels: ['Km 0', 'Km 10', 'Km 20', 'Km 30', 'Km 43'],
    datasets: [{
      label: 'Elevación (msnm)',
      data: [2800, 3200, 4200, 3600, 2430],
      fill: true,
      backgroundColor: 'rgba(37, 99, 235, 0.2)',
      borderColor: 'rgba(37, 99, 235, 1)',
      borderWidth: 3,
      tension: 0.4,
      pointRadius: 5,
      pointBackgroundColor: 'rgba(37, 99, 235, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointHoverRadius: 7
    }]
  };
  
  new Chart(ctx, {
    type: 'line',
    data: elevationData,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.parsed.y + ' msnm';
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function(value) {
              return value + ' m';
            }
          }
        }
      }
    }
  });
}

// ===========================
// CLIMA (OpenWeatherMap API simulado)
// ===========================
function loadWeatherData() {
  // En producción, usar API real de OpenWeatherMap
  // Datos simulados para demo
  const weatherData = {
    temp: 18,
    description: "Parcialmente nublado",
    humidity: 65,
    windSpeed: 12,
    icon: "02d"
  };
  
  // Actualizar UI
  document.getElementById('temperature').textContent = weatherData.temp;
  document.getElementById('weatherDescription').textContent = weatherData.description;
  document.getElementById('humidity').textContent = weatherData.humidity;
  document.getElementById('windSpeed').textContent = weatherData.windSpeed;
  
  // Icono del clima
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
  document.getElementById('weatherIcon').src = iconUrl;
}

// ===========================
// SISTEMA DE FAVORITOS
// ===========================
function initializeFavoriteButton() {
  const favBtn = document.getElementById('addToFavBtn');
  if (!favBtn) return;
  
  const urlParams = new URLSearchParams(window.location.search);
  const routeId = urlParams.get('id') || 1;
  
  // Verificar si ya está en favoritos
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const isFavorite = favorites.includes(parseInt(routeId));
  
  if (isFavorite) {
    favBtn.innerHTML = '<i class="fas fa-heart"></i> En favoritos';
    favBtn.classList.add('active');
  }
  
  favBtn.addEventListener('click', () => {
    if (isFavorite) {
      // Remover de favoritos
      const index = favorites.indexOf(parseInt(routeId));
      favorites.splice(index, 1);
      favBtn.innerHTML = '<i class="far fa-heart"></i> Guardar en favoritos';
      favBtn.classList.remove('active');
    } else {
      // Añadir a favoritos
      favorites.push(parseInt(routeId));
      favBtn.innerHTML = '<i class="fas fa-heart"></i> En favoritos';
      favBtn.classList.add('active');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
  });
}

// ===========================
// BOTONES DE COMPARTIR
// ===========================
function initializeShareButtons() {
  const shareButtons = document.querySelectorAll('.share-buttons .btn-icon');
  
  shareButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const url = window.location.href;
      const title = document.getElementById('routeTitle').textContent;
      
      switch(index) {
        case 0: // WhatsApp
          window.open(`https://wa.me/?text=${encodeURIComponent(title + ' - ' + url)}`, '_blank');
          break;
        case 1: // Facebook
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
          break;
        case 2: // Twitter
          window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
          break;
        case 3: // Copiar link
          navigator.clipboard.writeText(url).then(() => {
            alert('¡Enlace copiado al portapapeles!');
          });
          break;
      }
    });
  });
}

// ===========================
// SISTEMA DE RESEÑAS
// ===========================
const reviewsData = [
  {
    id: 1,
    author: "María González",
    avatar: "MG",
    rating: 5,
    date: "Hace 2 semanas",
    text: "¡Experiencia increíble! El Camino Inca superó todas mis expectativas. Los paisajes son espectaculares y llegar a Machu Picchu al amanecer fue mágico. El guía era muy conocedor y el equipo de porteadores fue excelente. La comida en el camping era sorprendentemente buena. Totalmente recomendado para cualquiera con buena condición física.",
    helpful: 45,
    images: ["images/machu-picchu.jpg", "images/annapurna.jpg"]
  },
  {
    id: 2,
    author: "Carlos Rodríguez",
    avatar: "CR",
    rating: 5,
    date: "Hace 1 mes",
    text: "Una aventura inolvidable. El segundo día es bastante exigente debido a la altitud, pero vale totalmente la pena. Los sitios arqueológicos en el camino son fascinantes y menos concurridos que Machu Picchu. Recomiendo llevar bastones de trekking y tomarse tiempo para aclimatarse en Cusco antes.",
    helpful: 32,
    images: []
  },
  {
    id: 3,
    author: "Ana Martínez",
    avatar: "AM",
    rating: 4,
    date: "Hace 2 meses",
    text: "Excelente trek, aunque físicamente demandante. La organización fue perfecta y el equipo muy profesional. El único inconveniente fue el clima - llovió dos días, así que prepárense bien. Las tiendas y sacos de dormir eran de buena calidad. La experiencia cultural y natural es única.",
    helpful: 28,
    images: ["images/patagonia.jpg"]
  },
  {
    id: 4,
    author: "Jorge López",
    avatar: "JL",
    rating: 5,
    date: "Hace 3 meses",
    text: "Mejor experiencia de viaje de mi vida. El camino es desafiante pero gratificante. Ver Machu Picchu desde Inti Punku fue un momento que nunca olvidaré. Los porteadores son verdaderos héroes - llevan todo el equipo pesado. Vale cada euro invertido.",
    helpful: 51,
    images: []
  },
  {
    id: 5,
    author: "Laura Fernández",
    avatar: "LF",
    rating: 5,
    date: "Hace 4 meses",
    text: "Simplemente perfecto. La combinación de naturaleza, historia y aventura es imbatible. Los campamentos están bien ubicados y la comida es abundante. El guía compartió muchas historias fascinantes sobre la cultura inca. Consejo: reserven con la mayor anticipación posible.",
    helpful: 39,
    images: ["images/islandia.jpg", "images/costa-rica.jpg"]
  }
];

function loadReviews() {
  const reviewsList = document.getElementById('reviewsList');
  if (!reviewsList) return;
  
  reviewsList.innerHTML = reviewsData.map(review => `
    <div class="review-card">
      <div class="review-header">
        <div class="reviewer-info">
          <div class="reviewer-avatar">${review.avatar}</div>
          <div>
            <div class="reviewer-name">${review.author}</div>
            <div class="review-date">${review.date}</div>
          </div>
        </div>
        <div class="review-rating">
          ${generateStars(review.rating)}
        </div>
      </div>
      <div class="review-text">${review.text}</div>
      ${review.images.length > 0 ? `
        <div class="review-images">
          ${review.images.map(img => `<img src="${img}" alt="Foto de reseña">`).join('')}
        </div>
      ` : ''}
      <div class="review-helpful">
        <span>${review.helpful} personas encontraron esto útil</span>
        <button onclick="markHelpful(${review.id})">
          <i class="far fa-thumbs-up"></i> Útil
        </button>
      </div>
    </div>
  `).join('');
}

function generateStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<i class="fas fa-star"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }
  return stars;
}

function markHelpful(reviewId) {
  // En producción, esto enviaría una petición al servidor
  alert('¡Gracias por tu feedback!');
}

// ===========================
// BOTÓN DE RESERVA
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  const bookBtn = document.getElementById('bookNowBtn');
  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      // Redirigir a página de reserva o mostrar modal
      alert('Función de reserva - En producción redirigiría a la página de pago');
    });
  }
});

// ===========================
// FILTROS DE RESEÑAS
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.reviews-filters .btn');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Aquí se implementaría el filtrado real de reseñas
      // Por ahora solo cambia el estado visual
    });
  });
});
