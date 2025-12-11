window.carousel = (function() {
    let packs = [];
    let currentIndex = 0;

    async function loadPacks() {
        try {
            // usar ruta relativa para evitar problemas según cómo se sirva el proyecto
            const fpack = await fetch('data/pack.json');
            if (!fpack.ok) throw new Error("No se pudo cargar data/pack.json");
            packs = await fpack.json();
            update(); // Mostrar primer pack
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
