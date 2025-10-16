class AppHero extends HTMLElement {
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

                .hero {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 100px 20px;
                    text-align: center;
                }

                .hero-container {
                    max-width: 800px;
                    margin: 0 auto;
                }

                h1 {
                    font-size: 3.5rem;
                    font-weight: 800;
                    margin-bottom: 20px;
                    line-height: 1.2;
                }

                .subtitle {
                    font-size: 1.5rem;
                    margin-bottom: 40px;
                    opacity: 0.95;
                    line-height: 1.6;
                }

                .cta-buttons {
                    display: flex;
                    gap: 20px;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .btn {
                    padding: 15px 30px;
                    border-radius: 8px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    border: none;
                }

                .btn-primary {
                    background-color: white;
                    color: #667eea;
                }

                .btn-primary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                }

                .btn-secondary {
                    background-color: transparent;
                    color: white;
                    border: 2px solid white;
                }

                .btn-secondary:hover {
                    background-color: white;
                    color: #667eea;
                }

                .stats {
                    display: flex;
                    justify-content: center;
                    gap: 60px;
                    margin-top: 60px;
                    flex-wrap: wrap;
                }

                .stat-item {
                    text-align: center;
                }

                .stat-number {
                    font-size: 2.5rem;
                    font-weight: 700;
                    display: block;
                }

                .stat-label {
                    font-size: 1rem;
                    opacity: 0.9;
                    margin-top: 5px;
                }

                @media (max-width: 768px) {
                    .hero {
                        padding: 60px 20px;
                    }

                    h1 {
                        font-size: 2.5rem;
                    }

                    .subtitle {
                        font-size: 1.2rem;
                    }

                    .cta-buttons {
                        flex-direction: column;
                        align-items: center;
                    }

                    .btn {
                        width: 100%;
                        max-width: 300px;
                    }
                }
            </style>

            <section class="hero" id="hero">
                <div class="hero-container">
                    <h1>Gestiona tus Consultas de Forma Eficiente</h1>
                    <p class="subtitle">
                        La plataforma todo-en-uno para organizar, rastrear y resolver
                        todas tus consultas en un solo lugar.
                    </p>
                    <div class="cta-buttons">
                        <a href="#query-form" class="btn btn-primary">Crear Consulta</a>
                        <a href="#features" class="btn btn-secondary">Saber Más</a>
                    </div>
                    <div class="stats">
                        <div class="stat-item">
                            <span class="stat-number" id="total-queries">0</span>
                            <span class="stat-label">Consultas Totales</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number" id="pending-queries">0</span>
                            <span class="stat-label">Pendientes</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number" id="resolved-queries">0</span>
                            <span class="stat-label">Resueltas</span>
                        </div>
                    </div>
                </div>
            </section>
        `;

        this.updateStats();
        this.subscribeToState();
    }

    updateStats() {
        const queries = window.appState?.getQueries() || [];
        const total = queries.length;
        const pending = queries.filter(q => q.status === 'pending').length;
        const resolved = queries.filter(q => q.status === 'resolved').length;

        const totalEl = this.shadowRoot.getElementById('total-queries');
        const pendingEl = this.shadowRoot.getElementById('pending-queries');
        const resolvedEl = this.shadowRoot.getElementById('resolved-queries');

        if (totalEl) totalEl.textContent = total;
        if (pendingEl) pendingEl.textContent = pending;
        if (resolvedEl) resolvedEl.textContent = resolved;
    }

    subscribeToState() {
        if (window.appState) {
            window.appState.subscribe(() => {
                this.updateStats();
            });
        }
    }
}

customElements.define('app-hero', AppHero);
