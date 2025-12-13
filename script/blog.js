const { articles, tags, categories } = window.blogData;

let activeCategory = null;
let activeTag = null;
const articlesPerPage = 6;
let currentPage = 1;

// --- FILTRADO ---
function filterArticles() {
    let filtered = Object.keys(articles);
    if (activeCategory) filtered = filtered.filter(key => articles[key].category === activeCategory);
    if (activeTag) filtered = filtered.filter(key => articles[key].tags.includes(activeTag));
    return filtered;
}

// --- FORMATO DE FECHA ---
function formatDateToDDMMYYYY(dateInput) {
    const fecha = new Date(dateInput);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}-${mes}-${anio}`;
}

function escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}
// --- MODAL ---
const modal = document.getElementById('temaModal');
const modalBody = modal.querySelector('.modal-body');
const closeModalBtn = modal.querySelector('.close-modal-btn');
modal.style.display = 'none';

closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

function openTemaModal(articleKey) {
    const article = articles[articleKey];
    if (!article) return;

    const currentLang = localStorage.getItem('lang') || 'es';

    // modalBody.innerHTML = `
    //     <h3>${article.i18n[currentLang].title}</h3>
    //     <p><strong>Autor:</strong> ${article.author.name}</p>
    //     <p><strong>Fecha:</strong> ${formatDateToDDMMYYYY(article.datetime)}</p>
    //     <div>${article.i18n[currentLang].long_description}</div>
    // `;

    modalBody.innerHTML = `
      <div class="tema-detalle-header">
        
        <h1 class="tema-detalle-title">${escaparHTML(article.i18n[currentLang].title)}</h1>
        <div class="tema-detalle-meta">            
          <div class="tema-detalle-autor">
            <div class="tema-detalle-avatar">${article.author.avatar}</div>            
            <div class="tema-detalle-autor-info">
              <div class="tema-detalle-autor-nombre">${escaparHTML(article.author.name)}</div>
              <div class="tema-detalle-autor-fecha">${formatDateToDDMMYYYY(article.datetime)}</div>
            </div>
          </div>
          <span class="tema-badge ${categories[article.category].style}">
            <i class="fas fa-tag"></i>
            ${escaparHTML(categories[article.category].i18n[currentLang])}
          </span>
        </div>
      </div>

      <div class="tema-detalle-content">${this.escaparHTML(article.i18n[currentLang].long_description)}</div>
      <div class="article-tags">
        ${article.tags.map(tag => `
            <span class="tag ${activeTag === tag ? 'active' : ''}" data-tag="${tag}">
                ${tags[tag].i18n[currentLang]}
            </span>`).join("")}
      </div>
    `;
    modal.style.display = 'flex';
}

// --- RENDER ARTICLES ---
function renderArticles() {
    const currentLang = localStorage.getItem('lang') || 'es';
    const grid = document.getElementById("articlesGrid");
    grid.innerHTML = "";

    const filteredKeys = filterArticles();
    const start = (currentPage - 1) * articlesPerPage;
    const paginatedKeys = filteredKeys.slice(start, start + articlesPerPage);

    paginatedKeys.forEach(articleKey => {
        const article = articles[articleKey];
        const card = document.createElement("article");
        card.className = "blog-card";
        card.innerHTML = `
            <div class="blog-card-image">
                <img src="${article.img}" alt="${article.i18n[currentLang].title}">
                <span class="badge ${categories[article.category].style}">${categories[article.category].i18n[currentLang]}</span>
            </div>
            <div class="blog-card-content">
                <div class="article-tags">
                    ${article.tags.map(tag => `
                        <span class="tag ${activeTag === tag ? 'active' : ''}" data-tag="${tag}">
                            ${tags[tag].i18n[currentLang]}
                        </span>`).join("")}
                </div>
                <div class="article-meta">                
                    <span class="article-date"><i class="fas fa-calendar"></i>${formatDateToDDMMYYYY(article.datetime)}</span>                    
                </div>
                <h3>${article.i18n[currentLang].title}</h3>
                <p>${article.i18n[currentLang].short_description}</p>                
                <div class="blog-card-footer">
                    <div class="author-mini">
                        <span class="author-avatar-sm">${article.author.avatar}</span>
                        <span>${article.author.name}</span>
                    </div>
                    <a href="#" class="btn-text read-more-btn" data-article-key="${articleKey}" data-i18n="read_more">Leer más →</a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Eventos "Leer más"
    grid.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const articleKey = btn.dataset.articleKey;
            openTemaModal(articleKey);
        });
    });

    renderCategories(currentLang);
    renderTags(currentLang);
    renderPagination(filteredKeys.length);
}

// --- RENDER CATEGORIES ---
function renderCategories(currentLang) {
    const catContainer = document.getElementById("categoriesList");
    catContainer.innerHTML = "";

    Object.keys(categories).forEach(catId => {
        const catEl = document.createElement("a");
        catEl.href = "#";
        catEl.className = `category-item ${activeCategory === catId ? "active" : ""}`;
        catEl.dataset.category = catId;
        catEl.innerHTML = `<span>${categories[catId].i18n[currentLang]}</span>`;
        catContainer.appendChild(catEl);
    });
}

// --- RENDER TAGS ---
function renderTags(currentLang) {
    const tagsContainer = document.getElementById("tagsCloud");
    tagsContainer.innerHTML = "";

    Object.keys(tags).forEach(tagId => {
        const tagEl = document.createElement("span");
        tagEl.className = `tag ${activeTag === tagId ? "active" : ""}`;
        tagEl.dataset.tag = tagId;
        tagEl.textContent = tags[tagId].i18n[currentLang];
        tagsContainer.appendChild(tagEl);
    });
}

// --- PAGINACIÓN ---
function renderPagination(totalArticles) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(totalArticles / articlesPerPage);

    const prev = document.createElement("a");
    prev.href = "#";
    prev.className = `pagination-prev ${currentPage === 1 ? "disabled" : ""}`;
    prev.textContent = "Anterior";
    prev.onclick = e => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderArticles();
        }
    };
    pagination.appendChild(prev);

    for (let i = 1; i <= totalPages; i++) {
        const pageEl = document.createElement("a");
        pageEl.href = "#";
        pageEl.className = `pagination-number ${currentPage === i ? 'active' : ''}`;
        pageEl.textContent = i;
        pageEl.onclick = e => {
            e.preventDefault();
            currentPage = i;
            renderArticles();
        };
        pagination.appendChild(pageEl);
    }

    const next = document.createElement("a");
    next.href = "#";
    next.className = `pagination-next ${currentPage === totalPages ? "disabled" : ""}`;
    next.textContent = "Siguiente";
    next.onclick = e => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderArticles();
        }
    };
    pagination.appendChild(next);
}

// --- FILTROS ---
function initFilters() {
    document.addEventListener("click", e => {
        if (e.target.closest(".category-item")) {
            e.preventDefault();
            const cat = e.target.closest(".category-item").dataset.category;
            activeCategory = activeCategory === cat ? null : cat;
            currentPage = 1;
            renderArticles();
        }

        if (e.target.classList.contains("tag")) {
            const tag = e.target.dataset.tag;
            activeTag = activeTag === tag ? null : tag;
            currentPage = 1;
            renderArticles();
        }
    });
}

// --- INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", () => {
    initFilters();
    renderArticles();
});
