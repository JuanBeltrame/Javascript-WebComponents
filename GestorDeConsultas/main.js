class AppState {
    constructor() {
        this.queries = this.loadQueries();
        this.listeners = [];
    }

    loadQueries() {
        const stored = localStorage.getItem('queries');
        return stored ? JSON.parse(stored) : [];
    }

    saveQueries() {
        localStorage.setItem('queries', JSON.stringify(this.queries));
        this.notifyListeners();
    }

    addQuery(query) {
        const newQuery = {
            id: Date.now(),
            ...query,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        this.queries.unshift(newQuery);
        this.saveQueries();
    }

    updateQuery(id, updates) {
        const index = this.queries.findIndex(q => q.id === id);
        if (index !== -1) {
            this.queries[index] = { ...this.queries[index], ...updates };
            this.saveQueries();
        }
    }

    deleteQuery(id) {
        this.queries = this.queries.filter(q => q.id !== id);
        this.saveQueries();
    }

    getQueries() {
        return this.queries;
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener(this.queries));
    }
}

window.appState = new AppState();

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});
