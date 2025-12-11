window.carousel = (function() {
    let packs = [];
    let currentIndex = 0;

    async function loadPacks() {
        try {
            const fpack = await fetch("../data/pack.json");            
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
        const currentLang = localStorage.getItem("lang") || "es";
        const fi18n = await fetch(`../data/i18n/${currentLang}/pack.json`);
        i18nPacks = await fi18n.json();
        if (!packs.length || !i18nPacks) return;

        const pack = packs[currentIndex];
        const packText = i18nPacks[pack.id] || {};

        // Imagen
        const imgEl = document.getElementById("carousel-img");
        if (imgEl) {
            imgEl.src = pack.img;
            imgEl.alt = packText.alt || "";
        }

        // Título y descripción
        const titleEl = document.getElementById("carousel-title");
        const descEl = document.getElementById("carousel-desc");
        if (titleEl) titleEl.textContent = packText.title || pack.id;
        if (descEl) descEl.textContent = packText.descShort || "";

        // Precio
        const priceEl = document.getElementById("carousel-price");
        if (priceEl) priceEl.textContent = pack.price;

        // Botón comprar
        const buyEl = document.querySelector(".pack-footer button span[data-i18n='index_pack_buy']");
        if (buyEl) buyEl.textContent = i18nData.index_pack_buy || "Comprar";
    }

    function changeLeft() {
        currentIndex = (currentIndex - 1 + packs.length) % packs.length;
        update();
    }

    function changeRight() {
        currentIndex = (currentIndex + 1) % packs.length;
        update();
    }

    function navigateToBuy() {
        localStorage.setItem("selectedPack", JSON.stringify(packs[currentIndex]));
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
