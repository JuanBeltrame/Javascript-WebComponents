class AppFeatures extends HTMLElement {
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

                .features {
                    padding: 80px 20px;
                    background-color: #f9fafb;
                }

                .features-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                h2 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    text-align: center;
                    margin-bottom: 20px;
                    color: #1f2937;
                }

                .subtitle {
                    font-size: 1.2rem;
                    text-align: center;
                    color: #6b7280;
                    margin-bottom: 60px;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 40px;
                }

                .feature-card {
                    background: white;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    text-align: center;
                }

                .feature-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
                }

                .feature-icon {
                    font-size: 3rem;
                    margin-bottom: 20px;
                    display: block;
                }

                .feature-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 15px;
                    color: #1f2937;
                }

                .feature-description {
                    color: #6b7280;
                    line-height: 1.6;
                    font-size: 1rem;
                }

                @media (max-width: 768px) {
                    .features {
                        padding: 40px 20px;
                    }

                    h2 {
                        font-size: 2rem;
                    }

                    .features-grid {
                        grid-template-columns: 1fr;
                        gap: 30px;
                    }
                }
            </style>

            <section class="features section" id="features">
                <div class="features-container">
                    <h2>Características Principales</h2>
                    <p class="subtitle">
                        Todo lo que necesitas para gestionar tus consultas de manera efectiva
                    </p>
                    <div class="features-grid">
                        <div class="feature-card">
                            <span class="feature-icon">⚡</span>
                            <h3 class="feature-title">Rápido y Eficiente</h3>
                            <p class="feature-description">
                                Crea y gestiona consultas en segundos. Nuestra interfaz intuitiva
                                te permite trabajar sin complicaciones.
                            </p>
                        </div>
                        <div class="feature-card">
                            <span class="feature-icon">🔍</span>
                            <h3 class="feature-title">Seguimiento en Tiempo Real</h3>
                            <p class="feature-description">
                                Monitorea el estado de todas tus consultas. Sabe exactamente
                                qué está pendiente, en progreso o resuelto.
                            </p>
                        </div>
                        <div class="feature-card">
                            <span class="feature-icon">📊</span>
                            <h3 class="feature-title">Organización Inteligente</h3>
                            <p class="feature-description">
                                Categoriza y prioriza tus consultas. Filtra y busca
                                fácilmente la información que necesitas.
                            </p>
                        </div>
                        <div class="feature-card">
                            <span class="feature-icon">💾</span>
                            <h3 class="feature-title">Almacenamiento Local</h3>
                            <p class="feature-description">
                                Tus datos se guardan automáticamente en tu navegador.
                                Accede a ellos en cualquier momento, incluso sin conexión.
                            </p>
                        </div>
                        <div class="feature-card">
                            <span class="feature-icon">🎨</span>
                            <h3 class="feature-title">Interfaz Moderna</h3>
                            <p class="feature-description">
                                Diseño limpio y responsivo que se adapta a cualquier dispositivo.
                                Una experiencia visual agradable y profesional.
                            </p>
                        </div>
                        <div class="feature-card">
                            <span class="feature-icon">🔒</span>
                            <h3 class="feature-title">100% Privado</h3>
                            <p class="feature-description">
                                Sin servidores externos. Todos tus datos permanecen
                                en tu dispositivo, garantizando tu privacidad.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('app-features', AppFeatures);
