let currentLang = localStorage.getItem("lang") || "es";
let i18nData = {}; // Traducciones cargadas

async function applyTranslations(lang = currentLang) {
    try {
        const res = await fetch(`i18n/${lang}.json`);
        if (!res.ok) throw new Error(`No se pudo cargar i18n/${lang}.json`);
        i18nData = await res.json();

        // Actualizar textos con data-i18n
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (i18nData[key]) el.textContent = i18nData[key];
        });

        // Avisar al carrusel que el idioma cambió
        if (window.carousel && typeof window.carousel.update === "function") {
            window.carousel.update();
        }

    } catch (error) {
        console.error("Error cargando traducciones:", error);
    }
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    applyTranslations(lang);
}

// Detectar cambios en los selects
const headerSelect = document.getElementById("idiomaHeader");
const footerSelect = document.getElementById("idiomaFooter");

headerSelect?.addEventListener("change", e => changeLanguage(e.target.value));
footerSelect?.addEventListener("change", e => changeLanguage(e.target.value));

document.addEventListener("DOMContentLoaded", () => {
    // Establecer el select del header según el idioma guardado
    if (headerSelect) headerSelect.value = currentLang;
    if (footerSelect) footerSelect.value = currentLang;

    applyTranslations();
});
