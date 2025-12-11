document.addEventListener("DOMContentLoaded", async () => {
    let stored = localStorage.getItem("selectedPack");
    let pack = stored ? JSON.parse(stored) : null;

    const selectedId = localStorage.getItem("selectedPackId") || (pack && pack.id);

    try {
        if ((!pack || !pack.id) && selectedId) {
            // buscar pack en data/pack.json
            const res = await fetch('/data/pack.json');
            if (res.ok) {
                const all = await res.json();
                const found = all.find(p => p.id === selectedId);
                if (found) pack = { ...found, ...(pack || {}) };
            }
        }

        // Si aún falta pack, mostrar mensaje y devolver
        if (!pack) {
            console.error('No se encontró el pack seleccionado');
            document.getElementById("pack-title").textContent = 'Pack no seleccionado';
            return;
        }

        // Intentar cargar traducciones para packs (opcional)
        const lang = localStorage.getItem('lang') || 'es';
        try {
            const resI = await fetch(`/data/i18n/${lang}/pack.json`);
            if (resI.ok) {
                const i18nPacks = await resI.json();
                const t = i18nPacks[pack.id] || {};
                pack.title = t.title || pack.title || pack.id;
                pack.desc = t.desc || pack.desc || '';
                pack.alt = t.alt || pack.alt || pack.id;
            } else {
                // fallback: generar título legible desde id
                pack.title = pack.title || pack.id.replace(/^pack_/, '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                pack.desc = pack.desc || '';
                pack.alt = pack.alt || pack.id;
            }
        } catch (e) {
            pack.title = pack.title || pack.id.replace(/^pack_/, '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            pack.desc = pack.desc || '';
            pack.alt = pack.alt || pack.id;
        }

        // Rellenar UI
        document.getElementById("pack-title").textContent = pack.title;
        document.getElementById("pack-price").textContent = (typeof pack.price === 'number' ? pack.price + '€' : (pack.price || ''));
        document.getElementById("pack-description").textContent = pack.desc || '';
        const imgEl = document.getElementById("pack-image");
        if (imgEl) {
            imgEl.src = pack.img || '';
            imgEl.alt = pack.alt || pack.title || '';
        }

        // Resumen pedido (cálculo seguro)
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

    // Clear form when Borrar is clicked
    botonBorrar.addEventListener("click", () => {
        form.reset();          
        return mostrarError("La forma a sido borrada")
    });

    function mostrarError(texto) {
        mensaje.className = "form-message error";
        mensaje.textContent = texto;
    }

})
