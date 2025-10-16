class AppQueryList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.filterStatus = 'all';
        this.filterCategory = 'all';
    }

    connectedCallback() {
        this.render();
        this.subscribeToState();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                .query-list-section {
                    padding: 80px 20px;
                    background-color: #f9fafb;
                }

                .list-container {
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
                    margin-bottom: 40px;
                }

                .filters {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 30px;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .filter-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .filter-group label {
                    font-weight: 600;
                    color: #1f2937;
                    font-size: 0.9rem;
                }

                select {
                    padding: 10px 15px;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 1rem;
                    background-color: white;
                    cursor: pointer;
                }

                .queries-grid {
                    display: grid;
                    gap: 20px;
                }

                .query-card {
                    background: white;
                    padding: 25px;
                    border-radius: 12px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    border-left: 4px solid #2563eb;
                    transition: all 0.3s ease;
                }

                .query-card:hover {
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                    transform: translateX(5px);
                }

                .query-card.priority-urgent {
                    border-left-color: #ef4444;
                }

                .query-card.priority-high {
                    border-left-color: #f59e0b;
                }

                .query-card.priority-medium {
                    border-left-color: #3b82f6;
                }

                .query-card.priority-low {
                    border-left-color: #10b981;
                }

                .query-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 15px;
                    gap: 15px;
                }

                .query-title {
                    font-size: 1.3rem;
                    font-weight: 600;
                    color: #1f2937;
                    margin: 0;
                    flex: 1;
                }

                .query-meta {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    margin-bottom: 15px;
                }

                .badge {
                    padding: 5px 12px;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 500;
                }

                .badge-status {
                    background-color: #dbeafe;
                    color: #1e40af;
                }

                .badge-status.pending {
                    background-color: #fef3c7;
                    color: #92400e;
                }

                .badge-status.in-progress {
                    background-color: #dbeafe;
                    color: #1e40af;
                }

                .badge-status.resolved {
                    background-color: #d1fae5;
                    color: #065f46;
                }

                .badge-category {
                    background-color: #f3f4f6;
                    color: #374151;
                }

                .badge-priority {
                    background-color: #fee2e2;
                    color: #991b1b;
                }

                .query-description {
                    color: #6b7280;
                    line-height: 1.6;
                    margin-bottom: 15px;
                }

                .query-info {
                    font-size: 0.9rem;
                    color: #9ca3af;
                    margin-bottom: 15px;
                }

                .query-actions {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .btn {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 6px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-status {
                    background-color: #dbeafe;
                    color: #1e40af;
                }

                .btn-status:hover {
                    background-color: #bfdbfe;
                }

                .btn-delete {
                    background-color: #fee2e2;
                    color: #991b1b;
                }

                .btn-delete:hover {
                    background-color: #fecaca;
                }

                .empty-state {
                    text-align: center;
                    padding: 60px 20px;
                }

                .empty-icon {
                    font-size: 4rem;
                    margin-bottom: 20px;
                }

                .empty-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #1f2937;
                    margin-bottom: 10px;
                }

                .empty-text {
                    color: #6b7280;
                    font-size: 1.1rem;
                }

                @media (max-width: 768px) {
                    .query-list-section {
                        padding: 40px 20px;
                    }

                    h2 {
                        font-size: 2rem;
                    }

                    .query-header {
                        flex-direction: column;
                    }

                    .filters {
                        flex-direction: column;
                        gap: 15px;
                    }
                }
            </style>

            <section class="query-list-section section" id="query-list">
                <div class="list-container">
                    <h2>Consultas Registradas</h2>
                    <p class="subtitle">
                        Gestiona y da seguimiento a todas tus consultas
                    </p>
                    
                    <div class="filters">
                        <div class="filter-group">
                            <label for="status-filter">Estado:</label>
                            <select id="status-filter">
                                <option value="all">Todos</option>
                                <option value="pending">Pendiente</option>
                                <option value="in-progress">En Progreso</option>
                                <option value="resolved">Resuelto</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label for="category-filter">Categoría:</label>
                            <select id="category-filter">
                                <option value="all">Todas</option>
                                <option value="technical">Técnica</option>
                                <option value="billing">Facturación</option>
                                <option value="support">Soporte</option>
                                <option value="general">General</option>
                                <option value="other">Otra</option>
                            </select>
                        </div>
                    </div>

                    <div class="queries-grid" id="queries-container">
                    </div>
                </div>
            </section>
        `;

        this.updateQueryList();
    }

    subscribeToState() {
        if (window.appState) {
            window.appState.subscribe(() => {
                this.updateQueryList();
            });
        }
    }

    addEventListeners() {
        const statusFilter = this.shadowRoot.getElementById('status-filter');
        const categoryFilter = this.shadowRoot.getElementById('category-filter');

        statusFilter?.addEventListener('change', (e) => {
            this.filterStatus = e.target.value;
            this.updateQueryList();
        });

        categoryFilter?.addEventListener('change', (e) => {
            this.filterCategory = e.target.value;
            this.updateQueryList();
        });
    }

    updateQueryList() {
        const container = this.shadowRoot.getElementById('queries-container');
        if (!container) return;

        let queries = window.appState?.getQueries() || [];

        if (this.filterStatus !== 'all') {
            queries = queries.filter(q => q.status === this.filterStatus);
        }
        if (this.filterCategory !== 'all') {
            queries = queries.filter(q => q.category === this.filterCategory);
        }

        if (queries.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📭</div>
                    <h3 class="empty-title">No hay consultas</h3>
                    <p class="empty-text">Crea tu primera consulta usando el formulario arriba</p>
                </div>
            `;
            return;
        }

        container.innerHTML = queries.map(query => this.createQueryCard(query)).join('');

        this.attachCardEventListeners();
    }

    createQueryCard(query) {
        const statusLabels = {
            'pending': 'Pendiente',
            'in-progress': 'En Progreso',
            'resolved': 'Resuelto'
        };

        const categoryLabels = {
            'technical': 'Técnica',
            'billing': 'Facturación',
            'support': 'Soporte',
            'general': 'General',
            'other': 'Otra'
        };

        const priorityLabels = {
            'low': 'Baja',
            'medium': 'Media',
            'high': 'Alta',
            'urgent': 'Urgente'
        };

        return `
            <div class="query-card priority-${query.priority}" data-id="${query.id}">
                <div class="query-header">
                    <h3 class="query-title">${query.subject}</h3>
                </div>
                <div class="query-meta">
                    <span class="badge badge-status ${query.status}">${statusLabels[query.status]}</span>
                    <span class="badge badge-category">${categoryLabels[query.category]}</span>
                    <span class="badge badge-priority">Prioridad: ${priorityLabels[query.priority]}</span>
                </div>
                <p class="query-description">${query.description}</p>
                <div class="query-info">
                    <strong>${query.name}</strong> (${query.email}) • ${this.formatDate(query.createdAt)}
                </div>
                <div class="query-actions">
                    <button class="btn btn-status" data-action="toggle-status" data-id="${query.id}">
                        ${query.status === 'resolved' ? 'Reabrir' : 'Cambiar Estado'}
                    </button>
                    <button class="btn btn-delete" data-action="delete" data-id="${query.id}">
                        Eliminar
                    </button>
                </div>
            </div>
        `;
    }

    attachCardEventListeners() {
        this.shadowRoot.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const id = parseInt(e.target.dataset.id);

                if (action === 'delete') {
                    this.deleteQuery(id);
                } else if (action === 'toggle-status') {
                    this.toggleStatus(id);
                }
            });
        });
    }

    toggleStatus(id) {
        const queries = window.appState?.getQueries() || [];
        const query = queries.find(q => q.id === id);
        
        if (query) {
            const statusCycle = {
                'pending': 'in-progress',
                'in-progress': 'resolved',
                'resolved': 'pending'
            };
            
            const newStatus = statusCycle[query.status];
            window.appState?.updateQuery(id, { status: newStatus });
        }
    }

    deleteQuery(id) {
        if (confirm('¿Estás seguro de que quieres eliminar esta consulta?')) {
            window.appState?.deleteQuery(id);
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

customElements.define('app-query-list', AppQueryList);
