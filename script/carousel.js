window.carousel = (function() {
    const EMBEDDED_PACKS = window.EMBEDDED_PACKS || [
        { id: "pack_japon", img: "images/pack/japon.jpg", price: 980 },
        { id: "pack_italia", img: "images/pack/italia.jpg", price: 890 },
        { id: "pack_indonesia", img: "images/pack/indonesia.jpg", price: 850 },
        { id: "pack_peru", img: "images/pack/peru.jpg", price: 980 },
        { id: "pack_tailandia", img: "images/pack/tailandia.jpg", price: 790 },
        { id: "pack_marruecos", img: "images/pack/marruecos.jpg", price: 650 },
        { id: "pack_india", img: "images/pack/india.jpg", price: 920 },
        { id: "pack_mexico", img: "images/pack/mexico.jpg", price: 820 },
        { id: "pack_corea", img: "images/pack/corea.jpg", price: 880 },
        { id: "pack_francia", img: "images/pack/francia.jpg", price: 940 },
        { id: "pack_vietnam", img: "images/pack/vietnam.jpg", price: 830 },
        { id: "pack_kenia", img: "images/pack/kenia.jpg", price: 1200 },
        { id: "pack_china", img: "images/pack/china.jpg", price: 1000 }
    ];
    window.EMBEDDED_PACKS = EMBEDDED_PACKS;

    let packs = EMBEDDED_PACKS;
    let currentIndex = 0;

    function loadPacks() {
        try {
            if (!packs || !packs.length) {
                packs = EMBEDDED_PACKS;
            }
            update();
        } catch (error) {
            console.error("Error cargando packs:", error);
            const track = document.getElementById("carousel-track");
            if (track) track.innerHTML = "<p>No se pudieron cargar los packs.</p>";
        }
    }

    async function update() {
        if (!packs || !packs.length) return;

        const pack = packs[currentIndex];

        // Imagen
        const imgEl = document.getElementById("carousel-img");
        if (imgEl) {
            imgEl.src = pack.img;
            imgEl.alt = pack.id || '';
        }

        // Título/desc — pack.json no incluye título; mostrar id legible por defecto
        const titleEl = document.getElementById("carousel-title");
        const descEl = document.getElementById("carousel-desc");
        if (titleEl) titleEl.textContent = (pack.title || pack.id.replace(/^pack_/, '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
        if (descEl) descEl.textContent = pack.descShort || '';

        // Precio
        const priceEl = document.getElementById("carousel-price");
        if (priceEl) priceEl.textContent = (typeof pack.price === 'number' ? pack.price + '€' : (pack.price || ''));

        // No hacer fetch a i18n que no exista aquí; dejar i18n.js manejar textos globales.
    }

    function changeLeft() {
        if (!packs.length) return;
        currentIndex = (currentIndex - 1 + packs.length) % packs.length;
        update();
    }

    function changeRight() {
        if (!packs.length) return;
        currentIndex = (currentIndex + 1) % packs.length;
        update();
    }

    function navigateToBuy() {
        if (!packs.length) return;
        // Guardar solo el pack seleccionado (id,img,price) para la página de compra
        localStorage.setItem("selectedPack", JSON.stringify(packs[currentIndex]));
        // También guardar el id separado por si la página comprar necesita recargar datos
        localStorage.setItem("selectedPackId", packs[currentIndex].id);
        window.location.href = 'comprar.html';
    }

    document.addEventListener("DOMContentLoaded", () => {
        if (document.getElementById("carousel-track")) {
            loadPacks();
            setInterval(changeRight, 5000);
        }
    });

    return { update, changeLeft, changeRight, navigateToBuy };
})();

// Añadir aliases globales para compatibilidad con los onclick en los HTML
window.navigateToBuy = () => window.carousel?.navigateToBuy?.();
window.changeCarouselLeft = () => window.carousel?.changeLeft?.();
window.changeCarouselRight = () => window.carousel?.changeRight?.();
