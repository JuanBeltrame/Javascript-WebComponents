class CustomModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._isOpen = false;
        this._focusedElementBeforeModal = null;
    }

    static get observedAttributes() {
        return ['title', 'size', 'type', 'close-on-backdrop'];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot) {
            this.render();
        }
    }

    get isOpen() {
        return this._isOpen;
    }

    open() {
        if (this._isOpen) return;

        this._focusedElementBeforeModal = document.activeElement;
        this._isOpen = true;
        
        const overlay = this.shadowRoot.querySelector('.modal-overlay');
        overlay.classList.add('active');
        
        document.body.style.overflow = 'hidden';
        
        this.trapFocus();
        
        this.dispatchEvent(new CustomEvent('modal-open', {
            bubbles: true,
            composed: true,
            detail: { modalId: this.id }
        }));

        setTimeout(() => {
            const firstFocusable = this.shadowRoot.querySelector('.modal-close');
            firstFocusable?.focus();
        }, 100);
    }

    close() {
        if (!this._isOpen) return;

        const overlay = this.shadowRoot.querySelector('.modal-overlay');
        overlay.classList.remove('active');
        
        this._isOpen = false;
        document.body.style.overflow = '';
        
        if (this._focusedElementBeforeModal) {
            this._focusedElementBeforeModal.focus();
        }
        
        this.dispatchEvent(new CustomEvent('modal-close', {
            bubbles: true,
            composed: true,
            detail: { modalId: this.id }
        }));
    }

    confirm() {
        this.dispatchEvent(new CustomEvent('modal-confirm', {
            bubbles: true,
            composed: true,
            detail: { modalId: this.id }
        }));
        this.close();
    }

    cancel() {
        this.dispatchEvent(new CustomEvent('modal-cancel', {
            bubbles: true,
            composed: true,
            detail: { modalId: this.id }
        }));
        this.close();
    }

    render() {
        const title = this.getAttribute('title') || 'Modal';
        const size = this.getAttribute('size') || 'medium';
        const type = this.getAttribute('type') || 'default';
        const closeOnBackdrop = this.getAttribute('close-on-backdrop') !== 'false';

        this.shadowRoot.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                }

                :host {
                    display: block;
                }

                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s ease, visibility 0.3s ease;
                    backdrop-filter: blur(2px);
                }

                .modal-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }

                .modal-container {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    max-height: 90vh;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transform: scale(0.9) translateY(-20px);
                    transition: transform 0.3s ease;
                    position: relative;
                }

                .modal-overlay.active .modal-container {
                    transform: scale(1) translateY(0);
                }

                .modal-container.small {
                    width: 90%;
                    max-width: 400px;
                }

                .modal-container.medium {
                    width: 90%;
                    max-width: 600px;
                }

                .modal-container.large {
                    width: 90%;
                    max-width: 900px;
                }

                .modal-header {
                    padding: 24px;
                    border-bottom: 1px solid #e5e7eb;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }

                .modal-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 0;
                }

                .modal-close {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 1.5rem;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                }

                .modal-close:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: rotate(90deg);
                }

                .modal-close:focus {
                    outline: 2px solid white;
                    outline-offset: 2px;
                }

                .modal-body {
                    padding: 24px;
                    overflow-y: auto;
                    flex: 1;
                }

                .modal-body::-webkit-scrollbar {
                    width: 8px;
                }

                .modal-body::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                .modal-body::-webkit-scrollbar-thumb {
                    background: #667eea;
                    border-radius: 4px;
                }

                .modal-body::-webkit-scrollbar-thumb:hover {
                    background: #764ba2;
                }

                .modal-footer {
                    padding: 16px 24px;
                    border-top: 1px solid #e5e7eb;
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                    background-color: #f9fafb;
                }

                .modal-footer.hidden {
                    display: none;
                }

                .btn {
                    padding: 10px 20px;
                    border-radius: 6px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    border: none;
                    transition: all 0.2s ease;
                }

                .btn:focus {
                    outline: 2px solid #667eea;
                    outline-offset: 2px;
                }

                .btn-confirm {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }

                .btn-confirm:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                }

                .btn-cancel {
                    background: white;
                    color: #374151;
                    border: 2px solid #e5e7eb;
                }

                .btn-cancel:hover {
                    background: #f9fafb;
                    border-color: #d1d5db;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideUp {
                    from {
                        transform: translateY(50px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                @media (max-width: 768px) {
                    .modal-container.small,
                    .modal-container.medium,
                    .modal-container.large {
                        width: 95%;
                        max-width: none;
                        max-height: 95vh;
                    }

                    .modal-header {
                        padding: 16px;
                    }

                    .modal-title {
                        font-size: 1.25rem;
                    }

                    .modal-body {
                        padding: 16px;
                    }

                    .modal-footer {
                        padding: 12px 16px;
                        flex-direction: column-reverse;
                    }

                    .btn {
                        width: 100%;
                    }
                }
            </style>

            <div class="modal-overlay" data-close-on-backdrop="${closeOnBackdrop}">
                <div class="modal-container ${size}">
                    <div class="modal-header">
                        <h2 class="modal-title">${title}</h2>
                        <button class="modal-close" aria-label="Cerrar modal">✕</button>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    <div class="modal-footer ${type !== 'confirm' ? 'hidden' : ''}">
                        <button class="btn btn-cancel">Cancelar</button>
                        <button class="btn btn-confirm">Confirmar</button>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const closeBtn = this.shadowRoot.querySelector('.modal-close');
        const overlay = this.shadowRoot.querySelector('.modal-overlay');
        const confirmBtn = this.shadowRoot.querySelector('.btn-confirm');
        const cancelBtn = this.shadowRoot.querySelector('.btn-cancel');

        closeBtn?.addEventListener('click', () => this.close());

        overlay?.addEventListener('click', (e) => {
            const closeOnBackdrop = overlay.dataset.closeOnBackdrop === 'true';
            if (e.target === overlay && closeOnBackdrop) {
                this.close();
            }
        });

        confirmBtn?.addEventListener('click', () => this.confirm());
        cancelBtn?.addEventListener('click', () => this.cancel());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this._isOpen) {
                this.close();
            }
        });
    }

    trapFocus() {
        const focusableElements = this.shadowRoot.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        this.shadowRoot.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (this.shadowRoot.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        });
    }
}

customElements.define('custom-modal', CustomModal);

document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const contactForm = document.getElementById('contactForm');

    document.addEventListener('modal-open', (e) => {
        console.log('Modal abierto:', e.detail.modalId);
    });

    document.addEventListener('modal-close', (e) => {
        console.log('Modal cerrado:', e.detail.modalId);
    });

    document.addEventListener('modal-confirm', (e) => {
        console.log('Modal confirmado:', e.detail.modalId);
        showOutput('✓ Acción confirmada', 'success');
    });

    document.addEventListener('modal-cancel', (e) => {
        console.log('Modal cancelado:', e.detail.modalId);
        showOutput('✗ Acción cancelada', 'info');
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            showOutput(`Formulario enviado: ${JSON.stringify(data, null, 2)}`, 'success');
            
            document.getElementById('modal2').close();
            contactForm.reset();
        });
    }

    function showOutput(message, type = 'info') {
        output.innerHTML = `
            <div class="message ${type}">
                <strong>${type === 'success' ? '✓' : 'ℹ'}</strong> ${message}
            </div>
        `;
        output.classList.add('show');

        setTimeout(() => {
            output.classList.remove('show');
        }, 3000);
    }
});
