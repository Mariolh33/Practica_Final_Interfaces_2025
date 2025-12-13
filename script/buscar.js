/* ==========================================
   BÚSQUEDA Y FILTROS DE RUTAS
   JavaScript Vanilla
========================================== */

// ===========================
// FUNCIÓN DE TRADUCCIÓN
// ===========================
function getTranslation(key) {
  const currentLang = localStorage.getItem('lang') || 'es';
  const translations = window.EMBEDDED_I18N?.[currentLang] || window.EMBEDDED_I18N?.es || {};
  return translations[key] || key;
}

// ===========================
// DATOS DE EJEMPLO (mock data)
// ===========================
const routesDataES = [
  {
    id: "route_caminoinca",
    title: "Camino Inca a Machu Picchu",
    location: "Cusco, Perú",
    rating: 4.9,
    reviews: 2847,
    difficulty: "dificil",
    duration: "4-dias",
    budget: 450,
    distance: 43,
    transport: "a-pie",
    continent: "america",
    image: "images/machu-picchu.jpg",
    description: "Una experiencia única recorriendo los pasos de los antiguos incas. Paisajes espectaculares, ruinas arqueológicas y una llegada inolvidable al amanecer.",
    features: ["guia-local", "camping"]
  },
  {
    id: "route_balcanes",
    title: "Ruta de los Balcanes",
    location: "Europa del Este",
    rating: 4.7,
    reviews: 1923,
    difficulty: "moderado",
    duration: "2-semanas",
    budget: 800,
    distance: 1200,
    transport: "bus",
    continent: "europa",
    image: "images/balcanes.jpg",
    description: "Descubre la belleza de los Balcanes visitando Bosnia, Croacia, Montenegro y Albania. Playas, montañas y cultura milenaria en una sola ruta.",
    features: ["transporte", "hostel"]
  },
  {
    id: "route_serengeti",
    title: "Safari Serengeti y Ngorongoro",
    location: "Tanzania",
    rating: 4.8,
    reviews: 1567,
    difficulty: "facil",
    duration: "1-semana",
    budget: 1200,
    distance: 450,
    transport: "4x4",
    continent: "africa",
    image: "images/serengeti.jpg",
    description: "Observa la gran migración y los Big Five en los parques nacionales más famosos de África. Incluye alojamiento en lodges.",
    features: ["guia-local", "hotel"]
  },
  {
    id: "route_annapurna",
    title: "Circuito Annapurna",
    location: "Nepal",
    rating: 4.9,
    reviews: 3201,
    difficulty: "dificil",
    duration: "2-semanas",
    budget: 600,
    distance: 230,
    transport: "a-pie",
    continent: "asia",
    image: "images/annapurna.jpg",
    description: "Uno de los trekkings más espectaculares del mundo. Atraviesa el paso Thorong La a 5,416m y disfruta de vistas increíbles del Himalaya.",
    features: ["guia-local", "camping", "hostel"]
  },
  {
    id: "route_islandia",
    title: "Vuelta a Islandia",
    location: "Islandia",
    rating: 4.6,
    reviews: 2134,
    difficulty: "facil",
    duration: "10-dias",
    budget: 1500,
    distance: 1400,
    transport: "coche",
    continent: "europa",
    image: "images/islandia.jpg",
    description: "Recorre la Ring Road descubriendo cascadas, glaciares, auroras boreales y aguas termales. Naturaleza en estado puro.",
    features: ["transporte", "hotel"]
  },
  {
    id: "route_patagonia",
    title: "Patagonia Argentina",
    location: "Argentina",
    rating: 4.8,
    reviews: 1876,
    difficulty: "moderado",
    duration: "10-dias",
    budget: 950,
    distance: 600,
    transport: "bus",
    continent: "america",
    image: "images/patagonia.jpg",
    description: "Explora El Chaltén, el Perito Moreno y Torres del Paine. Montañas, glaciares y lagos turquesa te esperan en el fin del mundo.",
    features: ["guia-local", "hostel", "camping"]
  },
  {
    id: "route_angkor",
    title: "Templos de Angkor Wat",
    location: "Camboya",
    rating: 4.7,
    reviews: 2456,
    difficulty: "facil",
    duration: "3-dias",
    budget: 250,
    distance: 80,
    transport: "bicicleta",
    continent: "asia",
    image: "images/angkor.jpeg",
    description: "Descubre los templos milenarios de Angkor en bicicleta. Amanecer en Angkor Wat y exploración de templos ocultos en la selva.",
    features: ["guia-local", "hostel"]
  },
  {
    id: "route_sahara",
    title: "Desierto del Sahara",
    location: "Marruecos",
    rating: 4.5,
    reviews: 1234,
    difficulty: "moderado",
    duration: "4-dias",
    budget: 400,
    distance: 300,
    transport: "4x4",
    continent: "africa",
    image: "images/sahara.jpg",
    description: "Aventura en las dunas de Erg Chebbi. Noche bajo las estrellas en campamento bereber y paseo en camello al atardecer.",
    features: ["guia-local", "camping"]
  },
  {
    id: "route_noruega",
    title: "Fjordos de Noruega",
    location: "Noruega",
    rating: 4.7,
    reviews: 1678,
    difficulty: "facil",
    duration: "1-semana",
    budget: 1800,
    distance: 800,
    transport: "tren",
    continent: "europa",
    image: "images/noruega.jpg",
    description: "Viaje en tren por los fjordos noruegos. Bergen, Flåm y Geirangerfjord. Naturaleza y pueblos pintorescos.",
    features: ["transporte", "hotel"]
  },
  {
    id: "route_costarica",
    title: "Costa Rica Aventura",
    location: "Costa Rica",
    rating: 4.6,
    reviews: 1923,
    difficulty: "facil",
    duration: "10-dias",
    budget: 1100,
    distance: 450,
    transport: "bus",
    continent: "america",
    image: "images/costa-rica.jpg",
    description: "Selva tropical, playas paradisíacas y vida salvaje. Monteverde, Arenal y Manuel Antonio en un solo viaje.",
    features: ["guia-local", "hostel", "hotel"]
  },
  {
    id: "route_muralla_china",
    title: "Gran Muralla China",
    location: "China",
    rating: 4.5,
    reviews: 2789,
    difficulty: "moderado",
    duration: "3-dias",
    budget: 350,
    distance: 70,
    transport: "a-pie",
    continent: "asia",
    image: "images/muralla-china.jpg",
    description: "Camina por tramos restaurados y salvajes de la Gran Muralla. Historia milenaria y vistas impresionantes.",
    features: ["guia-local", "hotel"]
  },
  {
    id: "route_ruta66",
    title: "Ruta 66 Clásica",
    location: "Estados Unidos",
    rating: 4.4,
    reviews: 1456,
    difficulty: "facil",
    duration: "2-semanas",
    budget: 2000,
    distance: 3940,
    transport: "coche",
    continent: "america",
    image: "images/ruta66.jpg",
    description: "De Chicago a Los Ángeles por la madre de todas las carreteras. Pueblos abandonados, diners y paisajes icónicos.",
    features: ["transporte", "hotel"]
  }
];

// DATOS EN INGLÉS
const routesDataEN = [
  {
    id: "route_caminoinca",
    title: "Inca Trail to Machu Picchu",
    location: "Cusco, Peru",
    rating: 4.9,
    reviews: 2847,
    difficulty: "dificil",
    duration: "4-dias",
    budget: 450,
    distance: 43,
    transport: "a-pie",
    continent: "america",
    image: "images/machu-picchu.jpg",
    description: "A unique experience walking in the footsteps of the ancient Incas. Spectacular landscapes, archaeological ruins and an unforgettable sunrise.",
    features: ["guia-local", "camping"]
  },
  {
    id: "route_balcanes",
    title: "Balkans Route",
    location: "Eastern Europe",
    rating: 4.7,
    reviews: 1923,
    difficulty: "moderado",
    duration: "2-semanas",
    budget: 800,
    distance: 1200,
    transport: "bus",
    continent: "europa",
    image: "images/balcanes.jpg",
    description: "Discover the beauty of the Balkans visiting Bosnia, Croatia, Montenegro and Albania. Beaches, mountains and ancient culture in one route.",
    features: ["transporte", "hostel"]
  },
  {
    id: "route_serengeti",
    title: "Serengeti and Ngorongoro Safari",
    location: "Tanzania",
    rating: 4.8,
    reviews: 1567,
    difficulty: "facil",
    duration: "1-semana",
    budget: 1200,
    distance: 450,
    transport: "4x4",
    continent: "africa",
    image: "images/serengeti.jpg",
    description: "Watch the great migration and the Big Five in Africa's most famous national parks. Includes lodging at lodges.",
    features: ["guia-local", "hotel"]
  },
  {
    id: "route_annapurna",
    title: "Annapurna Circuit",
    location: "Nepal",
    rating: 4.9,
    reviews: 3201,
    difficulty: "dificil",
    duration: "2-semanas",
    budget: 600,
    distance: 230,
    transport: "a-pie",
    continent: "asia",
    image: "images/annapurna.jpg",
    description: "One of the world's most spectacular treks. Cross the Thorong La pass at 5,416m and enjoy incredible views of the Himalayas.",
    features: ["guia-local", "camping", "hostel"]
  },
  {
    id: "route_islandia",
    title: "Iceland Ring Road",
    location: "Iceland",
    rating: 4.6,
    reviews: 2134,
    difficulty: "facil",
    duration: "10-dias",
    budget: 1500,
    distance: 1400,
    transport: "coche",
    continent: "europa",
    image: "images/islandia.jpg",
    description: "Drive the Ring Road discovering waterfalls, glaciers, northern lights and thermal springs. Nature at its purest.",
    features: ["transporte", "hotel"]
  },
  {
    id: "route_patagonia",
    title: "Argentine Patagonia",
    location: "Argentina",
    rating: 4.8,
    reviews: 1876,
    difficulty: "moderado",
    duration: "10-dias",
    budget: 950,
    distance: 600,
    transport: "bus",
    continent: "america",
    image: "images/patagonia.jpg",
    description: "Explore El Chaltén, Perito Moreno and Torres del Paine. Mountains, glaciers and turquoise lakes await you at the end of the world.",
    features: ["guia-local", "hostel", "camping"]
  },
  {
    id: "route_angkor",
    title: "Angkor Wat Temples",
    location: "Cambodia",
    rating: 4.7,
    reviews: 2456,
    difficulty: "facil",
    duration: "3-dias",
    budget: 250,
    distance: 80,
    transport: "bicicleta",
    continent: "asia",
    image: "images/angkor.jpeg",
    description: "Discover the ancient temples of Angkor by bicycle. Sunrise at Angkor Wat and exploration of hidden temples in the jungle.",
    features: ["guia-local", "hostel"]
  },
  {
    id: "route_sahara",
    title: "Sahara Desert",
    location: "Morocco",
    rating: 4.5,
    reviews: 1234,
    difficulty: "moderado",
    duration: "4-dias",
    budget: 400,
    distance: 300,
    transport: "4x4",
    continent: "africa",
    image: "images/sahara.jpg",
    description: "Adventure in the Erg Chebbi dunes. Night under the stars in a Berber camp and camel ride at sunset.",
    features: ["guia-local", "camping"]
  },
  {
    id: "route_noruega",
    title: "Norwegian Fjords",
    location: "Norway",
    rating: 4.8,
    reviews: 2567,
    difficulty: "moderado",
    duration: "1-semana",
    budget: 1100,
    distance: 500,
    transport: "coche",
    continent: "europa",
    image: "images/noruega.jpg",
    description: "Navigate through dramatic fjords, see the northern lights and discover charming Norwegian villages.",
    features: ["transporte", "hotel"]
  },
  {
    id: "route_costarica",
    title: "Costa Rica Adventure",
    location: "Costa Rica",
    rating: 4.6,
    reviews: 1956,
    difficulty: "moderado",
    duration: "2-semanas",
    budget: 850,
    distance: 320,
    transport: "4x4",
    continent: "america",
    image: "images/costa-rica.jpg",
    description: "Explore rainforests, volcanoes, wildlife and pristine beaches. A perfect destination for adventure seekers.",
    features: ["guia-local", "camping", "hostel"]
  },
  {
    id: "route_muralla_china",
    title: "Great Wall of China",
    location: "China",
    rating: 4.5,
    reviews: 2789,
    difficulty: "moderado",
    duration: "3-dias",
    budget: 350,
    distance: 70,
    transport: "a-pie",
    continent: "asia",
    image: "images/muralla-china.jpg",
    description: "Walk along restored and wild sections of the Great Wall. Ancient history and breathtaking views.",
    features: ["guia-local", "hotel"]
  },
  {
    id: "route_ruta66",
    title: "Route 66",
    location: "USA",
    rating: 4.4,
    reviews: 1456,
    difficulty: "facil",
    duration: "2-semanas",
    budget: 2000,
    distance: 3940,
    transport: "coche",
    continent: "america",
    image: "images/ruta66.jpg",
    description: "From Chicago to Los Angeles on the Mother Road. Abandoned towns, diners and iconic landscapes.",
    features: ["transporte", "hotel"]
  }
];

// Función para obtener datos según idioma
function getRoutesByLanguage() {
  const lang = localStorage.getItem('lang') || 'es';
  return lang === 'en' ? routesDataEN : routesDataES;
}

// Función para actualizar los datos de rutas según idioma (modifica la variable local)
let routesData;
function updateRoutesData() {
  routesData = getRoutesByLanguage();
  window.routesData = routesData;
  filteredRoutes = [...routesData];
  return routesData;
}

// Inicializar routesData
routesData = getRoutesByLanguage();
window.getRoutesByLanguage = getRoutesByLanguage;
window.updateRoutesData = updateRoutesData;

// ===========================
// ESTADO DE FILTROS
// ===========================
let currentFilters = {
  search: '',
  difficulty: [],
  duration: [],
  budget: 3000,
  distance: [],
  transport: [],
  continent: [],
  features: []
};

let currentSort = 'relevancia';
let filteredRoutes = [...routesData];

// Exponemos filteredRoutes y routesData a window para que i18n.js pueda acceder
window.filteredRoutes = filteredRoutes;
window.routesData = routesData;
window.currentFilters = currentFilters;

// ===========================
// INICIALIZACIÓN
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  initializeFilters();
  initializeMobileFilters();
  initializeSearch();
  initializeSort();
  initializeBudgetSlider();
  renderRoutes(routesData);
  updateResultsCount(routesData.length);
});

// ===========================
// FILTROS
// ===========================
function initializeFilters() {
  // Checkboxes de filtros
  const checkboxes = document.querySelectorAll('.filter-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleFilterChange);
  });

  // Botón limpiar filtros
  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearAllFilters);
  }
}

function handleFilterChange(e) {
  const checkbox = e.target;
  const filterType = checkbox.dataset.filter;
  const value = checkbox.value;

  if (checkbox.checked) {
    if (!currentFilters[filterType].includes(value)) {
      currentFilters[filterType].push(value);
    }
  } else {
    currentFilters[filterType] = currentFilters[filterType].filter(v => v !== value);
  }

  applyFilters();
}

function clearAllFilters() {
  // Reset filtros
  currentFilters = {
    search: '',
    difficulty: [],
    duration: [],
    budget: 3000,
    distance: [],
    transport: [],
    continent: [],
    features: []
  };

  // Reset checkboxes
  document.querySelectorAll('.filter-checkbox').forEach(cb => {
    cb.checked = false;
  });

  // Reset slider
  const budgetSlider = document.getElementById('budgetSlider');
  if (budgetSlider) {
    budgetSlider.value = 3000;
    document.getElementById('budgetValue').textContent = '€3000+';
  }

  // Reset búsqueda
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = '';
  }

  // Aplicar
  applyFilters();
}

// ===========================
// BÚSQUEDA
// ===========================
function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  if (searchInput) {
    // Búsqueda en tiempo real (debounce)
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentFilters.search = e.target.value.toLowerCase();
        applyFilters();
      }, 300);
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      currentFilters.search = searchInput.value.toLowerCase();
      applyFilters();
    });
  }

  // Búsquedas rápidas
  const quickSearchBadges = document.querySelectorAll('.quick-searches .badge');
  quickSearchBadges.forEach(badge => {
    badge.addEventListener('click', () => {
      const searchTerm = badge.textContent.trim().toLowerCase();
      searchInput.value = searchTerm;
      currentFilters.search = searchTerm;
      applyFilters();
    });
  });
}

// ===========================
// SLIDER DE PRESUPUESTO
// ===========================
function initializeBudgetSlider() {
  const slider = document.getElementById('budgetSlider');
  const valueDisplay = document.getElementById('budgetValue');

  if (slider && valueDisplay) {
    slider.addEventListener('input', (e) => {
      const value = parseInt(e.target.value);
      currentFilters.budget = value;
      
      if (value >= 3000) {
        valueDisplay.textContent = '€3000+';
      } else {
        valueDisplay.textContent = `€${value}`;
      }
      
      applyFilters();
    });
  }
}

// ===========================
// ORDENAMIENTO
// ===========================
function initializeSort() {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      sortRoutes();
    });
  }
}

function sortRoutes() {
  switch (currentSort) {
    case 'precio-asc':
      filteredRoutes.sort((a, b) => a.budget - b.budget);
      break;
    case 'precio-desc':
      filteredRoutes.sort((a, b) => b.budget - a.budget);
      break;
    case 'valoracion':
      filteredRoutes.sort((a, b) => b.rating - a.rating);
      break;
    case 'popularidad':
      filteredRoutes.sort((a, b) => b.reviews - a.reviews);
      break;
    default: // relevancia
      filteredRoutes.sort((a, b) => a.id - b.id);
  }
  
  renderRoutes(filteredRoutes);
}

// ===========================
// APLICAR FILTROS
// ===========================
function applyFilters() {
  filteredRoutes = routesData.filter(route => {
    // Búsqueda por texto
    if (currentFilters.search) {
      const matchesSearch = 
        route.title.toLowerCase().includes(currentFilters.search) ||
        route.location.toLowerCase().includes(currentFilters.search) ||
        route.description.toLowerCase().includes(currentFilters.search);
      if (!matchesSearch) return false;
    }

    // Dificultad
    if (currentFilters.difficulty.length > 0) {
      if (!currentFilters.difficulty.includes(route.difficulty)) return false;
    }

    // Duración
    if (currentFilters.duration.length > 0) {
      if (!currentFilters.duration.includes(route.duration)) return false;
    }

    // Presupuesto
    if (route.budget > currentFilters.budget) return false;

    // Distancia
    if (currentFilters.distance.length > 0) {
      const distanceMatch = currentFilters.distance.some(range => {
        switch(range) {
          case '0-50': return route.distance <= 50;
          case '50-200': return route.distance > 50 && route.distance <= 200;
          case '200-500': return route.distance > 200 && route.distance <= 500;
          case '500+': return route.distance > 500;
          default: return true;
        }
      });
      if (!distanceMatch) return false;
    }

    // Transporte
    if (currentFilters.transport.length > 0) {
      if (!currentFilters.transport.includes(route.transport)) return false;
    }

    // Continente
    if (currentFilters.continent.length > 0) {
      if (!currentFilters.continent.includes(route.continent)) return false;
    }

    // Características
    if (currentFilters.features.length > 0) {
      const hasAllFeatures = currentFilters.features.every(feature => 
        route.features.includes(feature)
      );
      if (!hasAllFeatures) return false;
    }

    return true;
  });

  sortRoutes();
  updateResultsCount(filteredRoutes.length);
  window.filteredRoutes = filteredRoutes;
}

// Exponer applyFilters a window
window.applyFilters = applyFilters;

// ===========================
// RENDERIZADO DE RUTAS
// ===========================
function renderRoutes(routes) {
  const grid = document.getElementById('routesGrid');
  if (!grid) return;

  if (routes.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
        <i class="fas fa-search" style="font-size: 4rem; color: var(--gray-medium); margin-bottom: 20px;"></i>
        <h3 style="color: var(--navy-dark); margin-bottom: 12px;">${getTranslation('routes_not_found_title')}</h3>
        <p style="color: var(--gray-dark); margin-bottom: 24px;">${getTranslation('routes_not_found_subtitle')}</p>
        <button class="btn btn-primary" onclick="clearAllFilters()">
          <i class="fas fa-redo"></i> ${getTranslation('filter_clear')}
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = routes.map(route => `
    <article class="route-card">
      <div class="route-image">
        <img src="${route.image}" alt="${route.title}">
        <button class="route-favorite" onclick="toggleFavorite('${route.id}')" id="fav-${route.id}">
          <i class="far fa-heart"></i>
        </button>
        <div class="route-badges">
          <span class="badge badge-${getDifficultyColor(route.difficulty)}">${getDifficultyLabel(route.difficulty)}</span>
          <span class="badge badge-outline">${getDurationLabel(route.duration)}</span>
        </div>
      </div>
      <div class="route-content">
        <div class="route-header">
          <h3 class="route-title">${route.title}</h3>
          <div class="route-rating">
            <i class="fas fa-star"></i>
            <span>${route.rating}</span>
          </div>
        </div>
        <div class="route-location">
          <i class="fas fa-map-marker-alt"></i>
          <span>${route.location}</span>
        </div>
        <p class="route-description">${route.description}</p>
        <div class="route-meta">
          <div class="route-meta-item">
            <i class="fas fa-route"></i>
            <span>${route.distance}km</span>
          </div>
          <div class="route-meta-item">
            <i class="fas fa-users"></i>
            <span>${route.reviews.toLocaleString()} ${getTranslation('route_card_travelers')}</span>
          </div>
          <div class="route-meta-item">
            <i class="fas fa-${getTransportIcon(route.transport)}"></i>
            <span>${getTransportLabel(route.transport)}</span>
          </div>
        </div>
        <div class="route-footer">
          <div class="route-price">
            <span class="price-from">${getTranslation('route_card_from')}</span>
            <span class="price-amount">€${route.budget}</span>
            <span class="price-unit">${getTranslation('route_card_per_person')}</span>
          </div>
          <a href="detalle-ruta.html?id=${route.id}" class="btn btn-primary">
            <i class="fas fa-info-circle"></i> ${getTranslation('route_card_view_details')}
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

// ===========================
// HELPERS
// ===========================
function getDifficultyColor(difficulty) {
  const colors = {
    'facil': 'success',
    'moderado': 'warning',
    'dificil': 'error'
  };
  return colors[difficulty] || 'info';
}

function getDifficultyLabel(difficulty) {
  const labels = {
    'facil': 'filter_difficulty_easy',
    'moderado': 'filter_difficulty_moderate',
    'dificil': 'filter_difficulty_hard'
  };
  return getTranslation(labels[difficulty] || difficulty).replace(/🟢 |🟡 |🔴 /g, '');
}

function getDurationLabel(duration) {
  const labels = {
    '1-3-dias': 'filter_duration_1_3_days',
    '4-dias': 'filter_duration_4_days',
    '1-semana': 'filter_duration_1_week',
    '10-dias': 'filter_duration_10_days',
    '2-semanas': 'filter_duration_2_weeks',
    '3-semanas': 'filter_duration_3_weeks'
  };
  return getTranslation(labels[duration] || duration);
}

function getTransportIcon(transport) {
  const icons = {
    'a-pie': 'walking',
    'bicicleta': 'bicycle',
    'coche': 'car',
    'bus': 'bus',
    'tren': 'train',
    '4x4': 'truck'
  };
  return icons[transport] || 'map-marked-alt';
}

function getTransportLabel(transport) {
  const labels = {
    'a-pie': 'transport_walking',
    'bicicleta': 'transport_bicycle',
    'coche': 'transport_car',
    'bus': 'transport_bus',
    'tren': 'transport_train',
    '4x4': 'transport_4x4'
  };
  return getTranslation(labels[transport] || transport);
}

function updateResultsCount(count) {
  const countElement = document.getElementById('resultsCount');
  if (countElement) {
    countElement.textContent = count;
  }
}

// ===========================
// FAVORITOS
// ===========================
function toggleFavorite(routeId) {
  const btn = document.getElementById(`fav-${routeId}`);
  if (!btn) return;

  const icon = btn.querySelector('i');
  const isFavorite = icon.classList.contains('fas');

  if (isFavorite) {
    icon.classList.remove('fas');
    icon.classList.add('far');
    btn.classList.remove('active');
    removeFavorite(routeId);
  } else {
    icon.classList.remove('far');
    icon.classList.add('fas');
    btn.classList.add('active');
    addFavorite(routeId);
  }
}

function addFavorite(routeId) {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (!favorites.includes(routeId)) {
    favorites.push(routeId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

function removeFavorite(routeId) {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  favorites = favorites.filter(id => id !== routeId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Cargar favoritos al inicio
function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  favorites.forEach(routeId => {
    const btn = document.getElementById(`fav-${routeId}`);
    if (btn) {
      const icon = btn.querySelector('i');
      icon.classList.remove('far');
      icon.classList.add('fas');
      btn.classList.add('active');
    }
  });
}

// Cargar favoritos después de renderizar
setTimeout(loadFavorites, 100);

// ===========================
// FILTROS MÓVILES
// ===========================
function initializeMobileFilters() {
  const mobileFilterBtn = document.querySelector('.mobile-filter-btn');
  const sidebar = document.querySelector('.filters-sidebar');
  const overlay = document.createElement('div');
  overlay.className = 'filters-overlay';
  document.body.appendChild(overlay);

  if (mobileFilterBtn) {
    mobileFilterBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    });
  }

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Cerrar al aplicar filtros en móvil
  const applyBtn = document.getElementById('clearFilters');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
      }
    });
  }
}

// ===========================
// PAGINACIÓN (preparado para futuro)
// ===========================
function initializePagination() {
  // TODO: Implementar paginación cuando haya más rutas
  const paginationLinks = document.querySelectorAll('.pagination a');
  paginationLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// Inicializar paginación
setTimeout(initializePagination, 100);
