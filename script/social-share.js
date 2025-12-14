// Script para copiar la URL de la página al portapapeles al hacer clic en botones de redes sociales
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener la URL actual de la página
            const currentUrl = window.location.href;
            
            // Copiar al portapapeles
            navigator.clipboard.writeText(currentUrl).then(() => {
                // Mostrar mensaje de confirmación
                const socialIcon = this.querySelector('i');
                const originalClasses = socialIcon.className;
                
                // Cambiar temporalmente el ícono a un check
                socialIcon.className = 'fas fa-check';
                
                // Restaurar el ícono original después de 1.5 segundos
                setTimeout(() => {
                    socialIcon.className = originalClasses;
                }, 1500);
                
                // Opcional: Mostrar un tooltip o mensaje
                showCopyMessage(this);
            }).catch(err => {
                console.error('Error al copiar al portapapeles:', err);
                alert('No se pudo copiar la URL al portapapeles');
            });
        });
    });
});

// Función para mostrar mensaje de confirmación
function showCopyMessage(element) {
    const tooltip = document.createElement('span');
    tooltip.textContent = '¡URL copiada!';
    tooltip.style.cssText = `
        position: absolute;
        background: #4CAF50;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    
    // Posicionar el tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top - 30}px`;
    tooltip.style.transform = 'translateX(-50%)';
    
    document.body.appendChild(tooltip);
    
    // Mostrar el tooltip
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    // Ocultar y eliminar el tooltip
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(tooltip);
        }, 300);
    }, 1500);
}
