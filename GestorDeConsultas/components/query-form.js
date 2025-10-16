class AppQueryForm extends HTMLElement {
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

                .query-form-section {
                    padding: 80px 20px;
                    background-color: #ffffff;
                }

                .form-container {
                    max-width: 800px;
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
                    margin-bottom: 40px;
                }

                .form-card {
                    background: white;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .form-group {
                    margin-bottom: 25px;
                }

                label {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: #1f2937;
                }

                input[type="text"],
                input[type="email"],
                select,
                textarea {
                    width: 100%;
                    padding: 12px;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-family: inherit;
                    transition: border-color 0.3s ease;
                    box-sizing: border-box;
                }

                .form-row input[type="text"],
                .form-row input[type="email"] {
                    max-width: 100%;
                }

                input:focus,
                select:focus,
                textarea:focus {
                    outline: none;
                    border-color: #2563eb;
                }

                textarea {
                    resize: vertical;
                    min-height: 120px;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                    max-width: 100%;
                    align-items: start;
                }
                
                .form-row .form-group {
                    margin-bottom: 0;
                    width: 100%;
                }

                .btn-submit {
                    width: 100%;
                    padding: 15px;
                    background-color: #2563eb;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-submit:hover {
                    background-color: #1e40af;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .btn-submit:disabled {
                    background-color: #9ca3af;
                    cursor: not-allowed;
                    transform: none;
                }

                .success-message {
                    background-color: #d1fae5;
                    color: #065f46;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    text-align: center;
                    font-weight: 500;
                    display: none;
                }

                .success-message.show {
                    display: block;
                    animation: slideDown 0.3s ease;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .required {
                    color: #ef4444;
                }

                @media (max-width: 768px) {
                    .query-form-section {
                        padding: 40px 20px;
                    }

                    .form-card {
                        padding: 30px 20px;
                    }

                    .form-row {
                        grid-template-columns: 1fr;
                    }

                    h2 {
                        font-size: 2rem;
                    }
                }
            </style>

            <section class="query-form-section section" id="query-form">
                <div class="form-container">
                    <h2>Crear Nueva Consulta</h2>
                    <p class="subtitle">
                        Completa el formulario para registrar tu consulta
                    </p>
                    <div class="form-card">
                        <div class="success-message" id="success-message">
                            ✓ Consulta creada exitosamente
                        </div>
                        <form id="query-form-element">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="name">
                                        Nombre <span class="required">*</span>
                                    </label>
                                    <input type="text" id="name" name="name" required>
                                </div>
                                <div class="form-group">
                                    <label for="email">
                                        Email <span class="required">*</span>
                                    </label>
                                    <input type="email" id="email" name="email" required>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="category">
                                        Categoría <span class="required">*</span>
                                    </label>
                                    <select id="category" name="category" required>
                                        <option value="">Seleccionar...</option>
                                        <option value="technical">Técnica</option>
                                        <option value="billing">Facturación</option>
                                        <option value="support">Soporte</option>
                                        <option value="general">General</option>
                                        <option value="other">Otra</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="priority">
                                        Prioridad <span class="required">*</span>
                                    </label>
                                    <select id="priority" name="priority" required>
                                        <option value="">Seleccionar...</option>
                                        <option value="low">Baja</option>
                                        <option value="medium">Media</option>
                                        <option value="high">Alta</option>
                                        <option value="urgent">Urgente</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="subject">
                                    Asunto <span class="required">*</span>
                                </label>
                                <input type="text" id="subject" name="subject" required>
                            </div>
                            <div class="form-group">
                                <label for="description">
                                    Descripción <span class="required">*</span>
                                </label>
                                <textarea id="description" name="description" required></textarea>
                            </div>
                            <button type="submit" class="btn-submit">
                                Enviar Consulta
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        `;
    }

    addEventListeners() {
        const form = this.shadowRoot.getElementById('query-form-element');
        form?.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const query = {
            name: formData.get('name'),
            email: formData.get('email'),
            category: formData.get('category'),
            priority: formData.get('priority'),
            subject: formData.get('subject'),
            description: formData.get('description')
        };

        window.appState?.addQuery(query);

        const successMessage = this.shadowRoot.getElementById('success-message');
        successMessage?.classList.add('show');
        
        e.target.reset();

        setTimeout(() => {
            successMessage?.classList.remove('show');
        }, 3000);

        setTimeout(() => {
            const queryList = document.querySelector('app-query-list');
            queryList?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }
}

customElements.define('app-query-form', AppQueryForm);
