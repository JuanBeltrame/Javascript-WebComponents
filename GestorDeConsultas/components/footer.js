class AppFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                footer {
                    background-color: #1f2937;
                    color: #f9fafb;
                    padding: 60px 20px 30px;
                }

                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 40px;
                    margin-bottom: 40px;
                }

                .footer-section h3 {
                    font-size: 1.2rem;
                    margin-bottom: 20px;
                    color: white;
                }

                .footer-section p {
                    color: #d1d5db;
                    line-height: 1.6;
                    margin-bottom: 15px;
                }

                .footer-links {
                    list-style: none;
                    padding: 0;
                }

                .footer-links li {
                    margin-bottom: 12px;
                }

                .footer-links a {
                    color: #d1d5db;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .footer-links a:hover {
                    color: #3b82f6;
                }

                .social-links {
                    display: flex;
                    gap: 15px;
                }

                .social-link {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background-color: #374151;
                    border-radius: 50%;
                    color: white;
                    text-decoration: none;
                    font-size: 1.2rem;
                    transition: all 0.3s ease;
                }

                .social-link:hover {
                    background-color: #3b82f6;
                    transform: translateY(-3px);
                }

                .footer-bottom {
                    border-top: 1px solid #374151;
                    padding-top: 30px;
                    text-align: center;
                    color: #9ca3af;
                }

                .footer-bottom p {
                    margin: 5px 0;
                }

                .footer-bottom a {
                    color: #3b82f6;
                    text-decoration: none;
                }

                .footer-bottom a:hover {
                    text-decoration: underline;
                }

                @media (max-width: 768px) {
                    footer {
                        padding: 40px 20px 20px;
                    }

                    .footer-content {
                        grid-template-columns: 1fr;
                        gap: 30px;
                    }
                }
            </style>

            <footer>
                <div class="footer-container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3>📋 Query Manager</h3>
                            <p>
                                La solución completa para gestionar todas tus consultas
                                de manera eficiente y organizada.
                            </p>
                            <div class="social-links">
                                <a href="#" class="social-link" title="GitHub">💻</a>
                                <a href="#" class="social-link" title="Twitter">🐦</a>
                                <a href="#" class="social-link" title="LinkedIn">💼</a>
                            </div>
                        </div>

                        <div class="footer-section">
                            <h3>Enlaces Rápidos</h3>
                            <ul class="footer-links">
                                <li><a href="#hero">Inicio</a></li>
                                <li><a href="#features">Características</a></li>
                                <li><a href="#query-form">Nueva Consulta</a></li>
                                <li><a href="#query-list">Consultas</a></li>
                            </ul>
                        </div>

                        <div class="footer-section">
                            <h3>Recursos</h3>
                            <ul class="footer-links">
                                <li><a href="#">Documentación</a></li>
                                <li><a href="#">Guía de Usuario</a></li>
                                <li><a href="#">API</a></li>
                                <li><a href="#">Soporte</a></li>
                            </ul>
                        </div>

                        <div class="footer-section">
                            <h3>Legal</h3>
                            <ul class="footer-links">
                                <li><a href="#">Política de Privacidad</a></li>
                                <li><a href="#">Términos de Servicio</a></li>
                                <li><a href="#">Cookies</a></li>
                                <li><a href="#">Contacto</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="footer-bottom">
                        <p>&copy; ${new Date().getFullYear()} Query Manager. Todos los derechos reservados.</p>
                        <p>Creado con Web Components y Vanilla JavaScript</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('app-footer', AppFooter);
