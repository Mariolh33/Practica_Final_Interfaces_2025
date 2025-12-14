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

const EMBEDDED_PACK_I18N = window.EMBEDDED_PACK_I18N || {
  es: {
    "pack_japon": { "title": "Japón Ancestral", "desc": "Embárcate en una experiencia inolvidable por el corazón del Japón, donde lo ancestral y lo moderno conviven en armonía. Este viaje cuidadosamente diseñado te llevará desde la vibrante metrópolis de Tokio, con sus neones y tecnología de punta, hasta los tranquilos templos y jardines zen de Kioto.\n\nDescubre los contrastes de Japón: asiste a una ceremonia del té, camina por un bosque de bambú, duerme en un ryokan y prueba auténtico sushi en el mercado de Tsukiji.", "alt": "Imagen del viaje a Japón" },
    "pack_indonesia": { "title": "Encantos de Indonesia", "desc": "Sumérgete en la diversidad cultural y natural de Indonesia, desde las playas doradas de Bali hasta los templos milenarios de Java. Disfruta de la vibrante vida local, los paisajes volcánicos y la riqueza de su gastronomía.\n\nAdmira los arrozales en terrazas, practica snorkel en aguas cristalinas y déjate cautivar por los bailes tradicionales y la calidez de su gente.", "alt": "Imagen del viaje a Indonesia" },
    "pack_tailandia": { "title": "Tailandia Tropical", "desc": "Descubre la exótica Tailandia, donde la naturaleza exuberante y la cultura milenaria se unen. Pasea por templos dorados, explora mercados flotantes y relájate en playas paradisíacas.\n\nParticipa en festivales coloridos, disfruta de la deliciosa comida callejera y explora selvas y cascadas en el norte del país.", "alt": "Imagen del viaje a Tailandia" },
    "pack_india": { "title": "Misterios de India", "desc": "Adéntrate en la India más auténtica y fascinante. Desde el bullicio de Delhi hasta la majestuosidad del Taj Mahal, pasando por palacios reales y bazares llenos de vida.\n\nVive una experiencia espiritual, degusta especias exóticas y recorre los caminos llenos de historia y color que hacen de India un destino inolvidable.", "alt": "Imagen del viaje a India" },
    "pack_corea": { "title": "Corea Moderna", "desc": "Viaja a Corea del Sur y maravíllate con su combinación única de modernidad y tradición. Explora rascacielos futuristas, palacios ancestrales y barrios vibrantes llenos de arte y gastronomía.\n\nDisfruta del K-pop, el hanbok, la comida callejera y los paisajes naturales que rodean sus ciudades.", "alt": "Imagen del viaje a Corea" },
    "pack_vietnam": { "title": "Vietnam Auténtico", "desc": "Vive la riqueza cultural y natural de Vietnam, desde la bulliciosa Hanoi hasta las maravillas naturales de la bahía de Ha Long. Recorre mercados tradicionales, templos y paisajes impresionantes.\n\nDisfruta de la gastronomía local, paseos en bicicleta por el campo y la hospitalidad de sus gentes.", "alt": "Imagen del viaje a Vietnam" },
    "pack_china": { "title": "Imperios de China", "desc": "Adéntrate en la historia milenaria de China, desde la capital Beijing hasta la ciudad antigua de Xi'an. Visita la Gran Muralla, la Ciudad Prohibida y los Guerreros de Terracota.\n\nDescubre las tradiciones, la cultura imperial y la modernidad que conviven en este vasto país.", "alt": "Imagen del viaje a China" },
    "pack_italia": { "title": "Tesoros de Italia", "desc": "Recorre las ciudades más emblemáticas de Italia: Roma y su historia milenaria, Florencia con su arte renacentista y Venecia con sus canales únicos en el mundo.\n\nDegusta auténtica pasta italiana, visita museos de fama mundial y déjate impresionar por la arquitectura clásica y el encanto europeo.", "alt": "Imagen del viaje a Italia" },
    "pack_francia": { "title": "Romance en Francia", "desc": "Vive la magia francesa comenzando en París, la ciudad del amor, y continúa entre castillos renacentistas y campos de lavanda en flor.\n\nDisfruta de la gastronomía francesa, pasea junto al Sena y visita algunos de los museos más importantes del mundo.", "alt": "Imagen del viaje a Francia" },
    "pack_kenia": { "title": "Safari en Kenia", "desc": "Sumérgete en la naturaleza salvaje de África. Observa leones, elefantes y jirafas en libertad mientras recorres las llanuras del Masái Mara.\n\nExperiencia acompañada por guías locales, alojamientos en lodges y un acercamiento real a las culturas africanas.", "alt": "Imagen del safari en Kenia" },
    "pack_marruecos": { "title": "Colores de Marruecos", "desc": "Un viaje lleno de aromas, colores y arquitectura árabe. Explora los zocos de Marrakech, monta en camello por el desierto del Sahara y recorre las calles históricas de Fez.\n\nUna mezcla perfecta de tradición, gastronomía exótica y paisajes impresionantes.", "alt": "Imagen del viaje a Marruecos" },
    "pack_peru": { "title": "Aventuras en Perú", "desc": "Viaja al corazón del imperio inca, visita la mística Machu Picchu y recorre paisajes andinos únicos.\n\nDisfruta de la culinaria peruana, conoce comunidades locales y vive una experiencia cultural llena de historia.", "alt": "Imagen del viaje a Perú" },
    "pack_mexico": { "title": "México Esencial", "desc": "Un viaje completo por México: historia ancestral, playas paradisíacas y una gastronomía reconocida mundialmente.\n\nExplora ruinas mayas, bucea en cenotes cristalinos y vive la energía vibrante de la cultura mexicana.", "alt": "Imagen del viaje a México" }
  },
  en: {
    "pack_japon": { "title": "Ancient Japan", "desc": "Embark on an unforgettable experience through the heart of Japan, where ancient tradition and modern life coexist in perfect harmony. This carefully designed journey will take you from the vibrant metropolis of Tokyo, with its neon lights and cutting-edge technology, to the serene temples and zen gardens of Kyoto.\n\nDiscover Japan’s contrasts: attend a tea ceremony, walk through a bamboo forest, stay in a ryokan, and taste authentic sushi at the Tsukiji market.", "alt": "Image of the Japan trip" },
    "pack_indonesia": { "title": "Charms of Indonesia", "desc": "Immerse yourself in the cultural and natural diversity of Indonesia, from the golden beaches of Bali to the ancient temples of Java. Enjoy vibrant local life, volcanic landscapes, and the richness of its cuisine.\n\nAdmire the rice terraces, snorkel in crystal-clear waters, and be captivated by traditional dances and the warmth of its people.", "alt": "Image of the Indonesia trip" },
    "pack_tailandia": { "title": "Tropical Thailand", "desc": "Discover exotic Thailand, where lush nature and ancient culture come together. Visit golden temples, explore floating markets, and relax on paradise beaches.\n\nTake part in colorful festivals, enjoy delicious street food, and explore jungles and waterfalls in the country’s northern region.", "alt": "Image of the Thailand trip" },
    "pack_india": { "title": "Mysteries of India", "desc": "Dive into the most authentic and fascinating India. From the bustling streets of Delhi to the majesty of the Taj Mahal, passing through royal palaces and lively bazaars.\n\nLive a spiritual experience, taste exotic spices, and walk through paths full of history and color that make India an unforgettable destination.", "alt": "Image of the India trip" },
    "pack_corea": { "title": "Modern Korea", "desc": "Travel to South Korea and be amazed by its unique combination of modernity and tradition. Explore futuristic skyscrapers, ancient palaces, and vibrant neighborhoods full of art and gastronomy.\n\nEnjoy K-pop culture, the hanbok, street food, and the natural landscapes surrounding its cities.", "alt": "Image of the Korea trip" },
    "pack_vietnam": { "title": "Authentic Vietnam", "desc": "Experience the cultural and natural richness of Vietnam, from bustling Hanoi to the natural wonders of Ha Long Bay. Walk through traditional markets, temples, and breathtaking landscapes.\n\nEnjoy local cuisine, bike rides through the countryside, and the hospitality of its people.", "alt": "Image of the Vietnam trip" },
    "pack_china": { "title": "Empires of China", "desc": "Immerse yourself in China’s millennia-old history, from the capital Beijing to the ancient city of Xi'an. Visit the Great Wall, the Forbidden City, and the Terracotta Warriors.\n\nDiscover the traditions, imperial culture, and modernity that coexist in this vast country.", "alt": "Image of the China trip" },
    "pack_italia": { "title": "Treasures of Italy", "desc": "Explore Italy’s most iconic cities: Rome with its ancient history, Florence and its Renaissance art, and Venice with its world-famous canals.\n\nEnjoy authentic Italian pasta, visit world-renowned museums, and be amazed by classical architecture and European charm.", "alt": "Image of the Italy trip" },
    "pack_francia": { "title": "Romance in France", "desc": "Experience the magic of France starting in Paris, the city of love, and continuing through Renaissance castles and lavender fields in Provence.\n\nEnjoy French cuisine, stroll along the Seine, and visit some of the world’s most important museums.", "alt": "Image of the France trip" },
    "pack_kenia": { "title": "Safari in Kenya", "desc": "Immerse yourself in Africa’s wild nature. Watch lions, elephants, and giraffes roaming free across the Masai Mara plains.\n\nGuided by local experts, enjoy lodge accommodations and a true introduction to African cultures.", "alt": "Image of the Kenya safari" },
    "pack_marruecos": { "title": "Colors of Morocco", "desc": "A journey filled with aromas, vibrant colors, and Arab architecture. Explore Marrakech’s souks, ride a camel through the Sahara Desert, and walk through the historic streets of Fez.\n\nA perfect blend of tradition, exotic cuisine, and breathtaking landscapes.", "alt": "Image of the Morocco trip" },
    "pack_peru": { "title": "Adventures in Peru", "desc": "Travel to the heart of the Inca Empire, visit mystical Machu Picchu, and discover unique Andean landscapes.\n\nEnjoy Peruvian cuisine, meet local communities, and live a cultural experience full of history.", "alt": "Image of the Peru trip" },
    "pack_mexico": { "title": "Essential Mexico", "desc": "A complete journey through Mexico: ancestral history, paradise beaches, and world-renowned cuisine.\n\nExplore Mayan ruins, swim in crystal-clear cenotes, and enjoy the vibrancy of Mexican culture.", "alt": "Image of the Mexico trip" }
  }
};
window.EMBEDDED_PACK_I18N = EMBEDDED_PACK_I18N;

document.addEventListener("DOMContentLoaded", async () => {
    let stored = localStorage.getItem("selectedPack");
    let pack = stored ? JSON.parse(stored) : null;

    const selectedId = localStorage.getItem("selectedPackId") || (pack && pack.id);

    try {
        if ((!pack || !pack.id) && selectedId) {
            const found = EMBEDDED_PACKS.find(p => p.id === selectedId);
            if (found) pack = { ...found, ...(pack || {}) };
        }

        if (!pack) {
            console.error('No se encontró el pack seleccionado');
            document.getElementById("pack-title").textContent = 'Pack no seleccionado';
            return;
        }

        const lang = localStorage.getItem('lang') || 'es';
        const t = EMBEDDED_PACK_I18N[lang]?.[pack.id] || {};
        pack.title = t.title || pack.title || pack.id.replace(/^pack_/, '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        pack.desc = t.desc || t.descShort || pack.desc || '';
        pack.alt = t.alt || pack.alt || pack.id;

        document.getElementById("pack-title").textContent = pack.title;
        document.getElementById("pack-price").textContent = (typeof pack.price === 'number' ? pack.price + '€' : (pack.price || ''));
        document.getElementById("pack-description").textContent = pack.desc || '';
        const imgEl = document.getElementById("pack-image");
        if (imgEl) {
            imgEl.src = pack.img || '';
            imgEl.alt = pack.alt || pack.title || '';
        }

        const priceNumber = parseFloat(String(pack.price).replace(/[^0-9.]/g, '')) || 0;
        const tax = priceNumber * 0.21;
        const total = priceNumber + tax;
        document.getElementById("summary-subtotal").textContent = (priceNumber ? priceNumber.toFixed(2) + '€' : '0.00€');
        document.getElementById("summary-tax").textContent = `${tax.toFixed(2)}€`;
        document.getElementById("summary-total").textContent = `${total.toFixed(2)}€`;
    } catch (err) {
        console.error('Error inicializando comprar:', err);
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("comprarForm");
    const botonComprar = document.getElementById("btnComprar");
    const botonBorrar = document.getElementById("btnBorrar");
    const mensaje = document.getElementById("mensaje");

    form.addEventListener("submit", (e) => {

        e.preventDefault();
        mensaje.textContent = "";
        mensaje.style.color = "red";

        // Obtener valores
        const nombre = document.getElementById("NombreCompleto").value.trim();
        const email = document.getElementById("CorreoElectronico").value.trim();
        const tipoTarjeta = document.getElementById("TipodeTarjeta").value;
        const numerodeTarjeta = document.getElementById("NumerodeTarjeta").value;
        const nombreTitular = document.getElementById("NombreTitular").value.trim();
        const fechaCaudacidad = document.getElementById("FechadeCaudacidad").value;
        const cvv = document.getElementById("CVV").value;

        // === VALIDACIONES ===
        if (nombre.length < 3) return mostrarError("El nombre debe tener al menos 3 caracteres.");
        if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{3,}$/.test(nombre)) return mostrarError("El nombre solo puede contener letras.");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return mostrarError("El email no tiene un formato válido.");

        // tipo de tarjeta
        if (tipoTarjeta !== "Visa" && tipoTarjeta !== "Mastercard" && tipoTarjeta !== "American Express"){
            return mostrarError("Selecciona un tipo de tarjeta válido");
        }

        // longitud de tarjeta
        if (numerodeTarjeta.length !== 13 && numerodeTarjeta.length !== 15 && numerodeTarjeta.length !== 16 && numerodeTarjeta.length !== 19){
            return mostrarError("El número de tarjeta tiene una longitud incorrecta.");
        }

        if (nombreTitular.length < 3) return mostrarError("El nombre debe tener al menos 3 caracteres.");
        if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{3,}$/.test(nombreTitular)) return mostrarError("El nombre solo puede contener letras.");

        if (fechaCaudacidad) {
        const fecha = new Date(fechaCaudacidad);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fecha.getFullYear();
        if (fecha <= hoy)
            return mostrarError("Introduce una fecha de caudacidad válida.");
        } else {
            return mostrarError("Introduce una fecha de caudacidad.");
        }

        if (cvv.length !== 3) return mostrarError("CVV debe ser 3 digitos");

        // Si todo es correcto
        mensaje.className = "form-message success";
        mensaje.textContent = "✅ Compra completado correctamente. Redirigiendo...";

        setTimeout(() => {
            window.location.href = "versionb.html";
            }, 1500);
    })

    // borrar formulario
    botonBorrar.addEventListener("click", () => {
        form.reset();          
        return mostrarError("La forma a sido borrada")
    });

    function mostrarError(texto) {
        mensaje.className = "form-message error";
        mensaje.textContent = texto;
    }

})
