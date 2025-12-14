// footer.js
document.addEventListener('DOMContentLoaded', () => {
    const footerHTML = `
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3 data-i18n="brand">Mochileros Sin Fronteras</h3>
                <p data-i18n="footer_desc">Tu comunidad de viajeros y aventureros. Descubre el mundo con nosotros.</p>
                <div class="social-links">
                    <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="#" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
                    <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                </div>
            </div>
            
            <div class="footer-section">
                <h4 data-i18n="footer_quick_links">Enlaces Rápidos</h4>
                <ul>
                    <li><a href="index.html" data-i18n="nav_home">Inicio</a></li>
                    <li><a href="buscar-rutas.html" data-i18n="footer_link_routes">Buscar Rutas</a></li>
                    <li><a href="versionb.html" data-i18n="nav_packs">Packs</a></li>
                    <li><a href="blog.html" data-i18n="nav_blog">Blog</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h4 data-i18n="footer_legal">Legal</h4>
                <ul>
                    <li><a href="politica.html" data-i18n="footer_policy">Política de Privacidad</a></li>
                    <li><a href="#" data-i18n="footer_terms">Términos y Condiciones</a></li>
                    <li><a href="#" data-i18n="footer_legal_notice">Aviso Legal</a></li>
                    <li><a href="#contacto" data-i18n="nav_contact">Contacto</a></li>                    
                </ul>
            </div>
            
            <div class="footer-section">
                <h4 data-i18n="footer_newsletter_title">Newsletter</h4>
                <p data-i18n="footer_newsletter_text">Recibe nuestras últimas novedades</p>
                <form class="newsletter-form">
                    <input type="email" placeholder="Tu email" required data-i18n-placeholder="newsletter_placeholder">
                    <button type="submit" class="btn btn-primary" data-i18n="footer_subscribe">Suscribirse</button>
                </form>
            </div>
        </div>
        <div class="footer-bottom">
            <p data-i18n="footer_copyright">&copy; 2025 Mochileros Sin Fronteras. Todos los derechos reservados.</p>
        </div>
    </footer>
    `;

    // Insertar después del main
    const main = document.querySelector('main');
    if (main) {
        main.insertAdjacentHTML('afterend', footerHTML);
    }
});
