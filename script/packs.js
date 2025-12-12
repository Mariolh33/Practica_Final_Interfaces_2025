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

let packs = EMBEDDED_PACKS; // Array global de packs
let currentLang = "es"; // Idioma por defecto
const track = document.getElementById("carousel-track");

// Cargar packs desde datos embebidos
function loadPacks() {
    try {
        if (!packs || !packs.length) {
            packs = EMBEDDED_PACKS;
        }
        updateCarousel();
    } catch (error) {
        console.error("Error cargando packs:", error);
        if (track) track.innerHTML = "<p>No se pudieron cargar los packs.</p>";
    }
}

// Cambiar idioma
function changeLanguage(lang) {
    currentLang = lang;
    updateCarousel(); // Actualizar textos del carrusel
}

// Detectar cambio de idioma desde selects
document.addEventListener("DOMContentLoaded", () => {
    loadPacks();

    document.getElementById("idiomaHeader")?.addEventListener("change", e => changeLanguage(e.target.value));
    document.getElementById("idiomaFooter")?.addEventListener("change", e => changeLanguage(e.target.value));
});
