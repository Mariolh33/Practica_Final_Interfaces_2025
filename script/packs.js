let packs = []; // Array global de packs
let currentLang = "es"; // Idioma por defecto
const track = document.getElementById("carousel-track");

// Cargar packs desde JSON
async function loadPacks() {
    try {
        const res = await fetch("data/pack.json");
        if (!res.ok) throw new Error("No se pudo cargar data/pack.json");
        packs = await res.json();
        updateCarousel(); // Mostrar primer pack
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
