const { articles, tags, categories, i18n } = window.blogData;

/* =========================
   ESTADO GLOBAL
========================= */
let activeCategories = new Set();
let activeTags = new Set();

const articlesPerPage = 6;
let currentPage = 1;

/* =========================
   INICIALIZAR FILTROS
========================= */
function initActiveFilters() {
    Object.keys(categories).forEach(cat => activeCategories.add(cat));
    Object.keys(tags).forEach(tag => activeTags.add(tag));
}

/* =========================
   FILTRADO
========================= */
function filterArticles() {
    return Object.keys(articles).filter(key => {
        const article = articles[key];

        const categoryMatch =
            activeCategories.size === 0 || activeCategories.has(article.category);

        const tagMatch =
            activeTags.size === 0 || article.tags.some(t => activeTags.has(t));

        return categoryMatch && tagMatch;
    });
}

/* =========================
   UTILIDADES
========================= */
function formatDateToDDMMYYYY(dateInput) {
    const fecha = new Date(dateInput);
    const d = String(fecha.getDate()).padStart(2, '0');
    const m = String(fecha.getMonth() + 1).padStart(2, '0');
    const y = fecha.getFullYear();
    return `${d}-${m}-${y}`;
}

function escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

/* =========================
   MODAL
========================= */
const modal = document.getElementById('temaModal');
const modalBody = modal.querySelector('.modal-body');
const closeModalBtn = modal.querySelector('.close-modal-btn');

modal.style.display = 'none';

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
});

function openTemaModal(articleKey) {
    const article = articles[articleKey];
    if (!article) return;

    const lang = localStorage.getItem('lang') || 'es';

    modalBody.innerHTML = `
        <div class="tema-detalle-header">
            <h1 class="tema-detalle-title">
                ${escaparHTML(article.i18n[lang].title)}
            </h1>

            <div class="tema-detalle-meta">
                <div class="tema-detalle-autor">
                    <div class="tema-detalle-avatar">${article.author.avatar}</div>
                    <div class="tema-detalle-autor-info">
                        <div class="tema-detalle-autor-nombre">
                            ${escaparHTML(article.author.name)}
                        </div>
                        <div class="tema-detalle-autor-fecha">
                            ${formatDateToDDMMYYYY(article.datetime)}
                        </div>
                    </div>
                </div>

                <span class="tema-badge ${categories[article.category].style}">
                    ${escaparHTML(categories[article.category].i18n[lang])}
                </span>
            </div>
        </div>

        <div class="tema-detalle-content">
            ${escaparHTML(article.i18n[lang].long_description)}
        </div>

        <div class="article-tags">
            ${article.tags.map(tag => `
                <span class="tag">${escaparHTML(tags[tag].i18n[lang])}</span>
            `).join('')}
        </div>
    `;

    modal.style.display = 'flex';
}

/* =========================
   RENDER ARTÍCULOS
========================= */
function renderArticles() {
    const lang = localStorage.getItem('lang') || 'es';
    const grid = document.getElementById("articlesGrid");
    grid.innerHTML = "";

    const filteredKeys = filterArticles();
    const start = (currentPage - 1) * articlesPerPage;
    const pageKeys = filteredKeys.slice(start, start + articlesPerPage);

    pageKeys.forEach(key => {
        const article = articles[key];

        const card = document.createElement("article");
        card.className = "blog-card";
        card.innerHTML = `
            <div class="blog-card-image">
                <img src="${article.img}" alt="${escaparHTML(article.i18n[lang].title)}">
                <span class="badge ${categories[article.category].style}">
                    ${escaparHTML(categories[article.category].i18n[lang])}
                </span>
            </div>

            <div class="blog-card-content">
                <div class="article-tags">
                    ${article.tags.map(tag => `
                        <span class="tag">${escaparHTML(tags[tag].i18n[lang])}</span>
                    `).join('')}
                </div>

                <div class="article-meta">
                    <span class="article-date">
                        <i class="fas fa-calendar"></i>
                        ${formatDateToDDMMYYYY(article.datetime)}
                    </span>
                </div>

                <h3>${escaparHTML(article.i18n[lang].title)}</h3>
                <p>${escaparHTML(article.i18n[lang].short_description)}</p>

                <div class="blog-card-footer">
                    <div class="author-mini">
                        <span class="author-avatar-sm">${article.author.avatar}</span>
                        <span>${escaparHTML(article.author.name)}</span>
                    </div>
                    <a href="#" class="btn-text read-more-btn"
                       data-article-key="${key}">
                       ${i18n[lang].read_more}
                    </a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    grid.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            openTemaModal(btn.dataset.articleKey);
        });
    });

    renderCategories(lang);
    renderTags(lang);
    renderPagination(filteredKeys.length);
}

/* =========================
   RENDER CATEGORIES (CHECKBOX)
========================= */
function renderCategories(lang) {
    const container = document.getElementById("categoriesList");
    container.innerHTML = "";

    Object.keys(categories).forEach(cat => {
        const label = document.createElement("label");
        label.className = "category-checkbox";
        label.innerHTML = `
            <input type="checkbox" data-category="${cat}"
                ${activeCategories.has(cat) ? "checked" : ""}>
            <span>${escaparHTML(categories[cat].i18n[lang])}</span>
        `;
        container.appendChild(label);
    });
}

/* =========================
   RENDER TAGS (CHECKBOX)
========================= */
function renderTags(lang) {
    const container = document.getElementById("tagsCloud");
    container.innerHTML = "";

    Object.keys(tags).forEach(tag => {
        const label = document.createElement("label");
        label.className = "tag-checkbox";
        label.innerHTML = `
            <input type="checkbox" data-tag="${tag}"
                ${activeTags.has(tag) ? "checked" : ""}>
            <span>${escaparHTML(tags[tag].i18n[lang])}</span>
        `;
        container.appendChild(label);
    });
}

/* =========================
   PAGINACIÓN
========================= */
function renderPagination(total) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(total / articlesPerPage);
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const a = document.createElement("a");
        a.href = "#";
        a.className = `pagination-number ${i === currentPage ? "active" : ""}`;
        a.textContent = i;

        a.onclick = e => {
            e.preventDefault();
            currentPage = i;
            renderArticles();
        };

        pagination.appendChild(a);
    }
}

/* =========================
   EVENTOS CHECKBOX
========================= */
function initFilters() {
    document.addEventListener("change", e => {

        if (e.target.matches('[data-category]')) {
            const cat = e.target.dataset.category;
            e.target.checked ? activeCategories.add(cat) : activeCategories.delete(cat);

            if (activeCategories.size === 0) {
                Object.keys(categories).forEach(c => activeCategories.add(c));
            }

            currentPage = 1;
            renderArticles();
        }

        if (e.target.matches('[data-tag]')) {
            const tag = e.target.dataset.tag;
            e.target.checked ? activeTags.add(tag) : activeTags.delete(tag);

            if (activeTags.size === 0) {
                Object.keys(tags).forEach(t => activeTags.add(t));
            }

            currentPage = 1;
            renderArticles();
        }
    });
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
    initActiveFilters();
    initFilters();
    renderArticles();
});
