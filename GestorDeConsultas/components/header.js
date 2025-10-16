class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                header {
                    background-color: #ffffff;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }

                .header-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .logo {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #2563eb;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .logo-icon {
                    font-size: 2rem;
                }

                nav ul {
                    list-style: none;
                    display: flex;
                    gap: 30px;
                    margin: 0;
                    padding: 0;
                }

                nav a {
                    color: #1f2937;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.3s ease;
                    cursor: pointer;
                }

                nav a:hover {
                    color: #2563eb;
                }

                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #1f2937;
                }

                @media (max-width: 768px) {
                    nav ul {
                        display: none;
                        flex-direction: column;
                        position: absolute;
                        top: 70px;
                        left: 0;
                        right: 0;
                        background: white;
                        padding: 20px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }

                    nav ul.active {
                        display: flex;
                    }

                    .mobile-menu-btn {
                        display: block;
                    }
                }
            </style>

            <header>
                <div class="header-container">
                    <a href="#" class="logo">
                        <span class="logo-icon">📋</span>
                        Gestor de Consultas
                    </a>
                    <nav>
                        <button class="mobile-menu-btn">☰</button>
                        <ul>
                            <li><a href="#hero">Inicio</a></li>
                            <li><a href="#features">Características</a></li>
                            <li><a href="#query-form">Nueva Consulta</a></li>
                            <li><a href="#query-list">Consultas</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        `;
    }

    addEventListeners() {
        const menuBtn = this.shadowRoot.querySelector('.mobile-menu-btn');
        const nav = this.shadowRoot.querySelector('nav ul');

        menuBtn?.addEventListener('click', () => {
            nav?.classList.toggle('active');
        });

        this.shadowRoot.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav?.classList.remove('active');
            });
        });
    }
}

customElements.define('app-header', AppHeader);
