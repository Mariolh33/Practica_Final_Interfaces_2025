document.addEventListener('DOMContentLoaded', function(){
    const grid = document.getElementById('destinationsGrid');
    if (!grid) return;

    fetch('data/ciudades-del-mundo.json')
        .then(r => r.json())
        .then(data => {
            data.continents.forEach(continent => {
                continent.countries.forEach(country => {
                    country.cities.forEach(city => {
                        const article = document.createElement('article');
                        article.className = 'destination-card';

                        const imgUrl = city.image && city.image.url ? city.image.url : 'images/default.jpg';
                        const imgAlt = city.image && city.image.alt ? city.image.alt : city.name;

                        article.innerHTML = `
                            <div class="destination-image">
                                <img src="${imgUrl}" alt="${imgAlt}">
                                <button class="favorite-btn" aria-label="Guardar">
                                    <i class="far fa-heart"></i>
                                </button>
                            </div>
                            <div class="destination-info">
                                <h3>${city.name}, ${country.name}</h3>
                                <p class="destination-description">${city.description || ''}</p>
                            </div>
                        `;

                        const imgEl = article.querySelector('.destination-image img');
                        if (imgEl) imgEl.title = city.description || '';

                        grid.appendChild(article);
                    });
                });
            });

            if (window.i18n && typeof window.i18n.translate === 'function') {
                try { window.i18n.translate(); } catch(e) { console.warn('i18n.translate error', e); }
            }
        })
        .catch(err => console.error('Error cargando ciudades:', err));
});
