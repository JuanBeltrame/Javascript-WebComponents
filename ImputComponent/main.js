class CustomInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._value = '';
        this._isValid = true;
    }

    static get observedAttributes() {
        return [
            'label',
            'type',
            'placeholder',
            'value',
            'required',
            'disabled',
            'readonly',
            'minlength',
            'maxlength',
            'min',
            'max',
            'pattern',
            'error-message',
            'helper-text',
            'icon',
            'show-counter'
        ];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        const input = this.shadowRoot.querySelector('input');
        if (input) {
            input.value = val;
        }
        this.updateCounter();
    }

    get isValid() {
        return this._isValid;
    }

    focus() {
        this.shadowRoot.querySelector('input')?.focus();
    }

    blur() {
        this.shadowRoot.querySelector('input')?.blur();
    }

    reset() {
        this.value = '';
        this.clearError();
    }

    render() {
        const label = this.getAttribute('label') || '';
        const type = this.getAttribute('type') || 'text';
        const placeholder = this.getAttribute('placeholder') || '';
        const value = this.getAttribute('value') || '';
        const required = this.hasAttribute('required');
        const disabled = this.hasAttribute('disabled');
        const readonly = this.hasAttribute('readonly');
        const helperText = this.getAttribute('helper-text') || '';
        const icon = this.getAttribute('icon') || '';
        const showCounter = this.hasAttribute('show-counter');
        const maxlength = this.getAttribute('maxlength');

        this.shadowRoot.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                }

                :host {
                    display: block;
                    width: 100%;
                }

                .input-wrapper {
                    width: 100%;
                }

                .label {
                    display: block;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 0.5rem;
                }

                .label.required::after {
                    content: ' *';
                    color: #ef4444;
                }

                .input-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .icon {
                    position: absolute;
                    left: 1rem;
                    font-size: 1.2rem;
                    pointer-events: none;
                }

                input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    font-size: 1rem;
                    color: #1f2937;
                    background-color: #ffffff;
                    border: 2px solid #d1d5db;
                    border-radius: 8px;
                    outline: none;
                    transition: all 0.2s ease;
                    font-family: inherit;
                }

                input.with-icon {
                    padding-left: 3rem;
                }

                input:focus {
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                input:disabled {
                    background-color: #f3f4f6;
                    color: #9ca3af;
                    cursor: not-allowed;
                }

                input:read-only {
                    background-color: #f9fafb;
                }

                input.error {
                    border-color: #ef4444;
                }

                input.error:focus {
                    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
                }

                input.success {
                    border-color: #10b981;
                }

                .helper-text {
                    display: block;
                    margin-top: 0.5rem;
                    font-size: 0.875rem;
                    color: #6b7280;
                }

                .error-message {
                    display: none;
                    margin-top: 0.5rem;
                    font-size: 0.875rem;
                    color: #ef4444;
                }

                .error-message.show {
                    display: block;
                }

                .counter {
                    display: block;
                    margin-top: 0.5rem;
                    font-size: 0.75rem;
                    color: #6b7280;
                    text-align: right;
                }

                .counter.limit {
                    color: #ef4444;
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }

                .shake {
                    animation: shake 0.3s ease;
                }
            </style>

            <div class="input-wrapper">
                ${label ? `<label class="label ${required ? 'required' : ''}">${label}</label>` : ''}
                
                <div class="input-container">
                    ${icon ? `<span class="icon">${icon}</span>` : ''}
                    <input
                        type="${type}"
                        placeholder="${placeholder}"
                        value="${value}"
                        ${required ? 'required' : ''}
                        ${disabled ? 'disabled' : ''}
                        ${readonly ? 'readonly' : ''}
                        ${this.getAttribute('minlength') ? `minlength="${this.getAttribute('minlength')}"` : ''}
                        ${maxlength ? `maxlength="${maxlength}"` : ''}
                        ${this.getAttribute('min') ? `min="${this.getAttribute('min')}"` : ''}
                        ${this.getAttribute('max') ? `max="${this.getAttribute('max')}"` : ''}
                        ${this.getAttribute('pattern') ? `pattern="${this.getAttribute('pattern')}"` : ''}
                        class="${icon ? 'with-icon' : ''}"
                    />
                </div>

                ${helperText ? `<span class="helper-text">${helperText}</span>` : ''}
                
                <span class="error-message"></span>
                
                ${showCounter && maxlength ? `<span class="counter">0 / ${maxlength}</span>` : ''}
            </div>
        `;

        this._value = value;
        this.updateCounter();
    }

    setupEventListeners() {
        const input = this.shadowRoot.querySelector('input');
        
        if (!input) return;

        input.addEventListener('input', (e) => {
            this._value = e.target.value;
            this.updateCounter();
            this.validate();
            
            this.dispatchEvent(new CustomEvent('input', {
                detail: { value: this._value },
                bubbles: true,
                composed: true
            }));
        });

        input.addEventListener('change', (e) => {
            this.dispatchEvent(new CustomEvent('change', {
                detail: { value: this._value },
                bubbles: true,
                composed: true
            }));
        });

        input.addEventListener('focus', () => {
            this.dispatchEvent(new CustomEvent('focus', {
                bubbles: true,
                composed: true
            }));
        });

        input.addEventListener('blur', () => {
            this.validate();
            this.dispatchEvent(new CustomEvent('blur', {
                bubbles: true,
                composed: true
            }));
        });
    }

    validate() {
        const input = this.shadowRoot.querySelector('input');
        
        if (!input) return true;

        const isValid = input.checkValidity();
        this._isValid = isValid;

        if (!isValid) {
            this.showError(this.getErrorMessage(input));
        } else {
            this.clearError();
        }

        return isValid;
    }

    getErrorMessage(input) {
        const customError = this.getAttribute('error-message');
        
        if (customError) return customError;

        if (input.validity.valueMissing) {
            return 'Este campo es requerido';
        }
        if (input.validity.typeMismatch) {
            return `Por favor ingresa un ${input.type} válido`;
        }
        if (input.validity.tooShort) {
            return `Mínimo ${input.minLength} caracteres`;
        }
        if (input.validity.tooLong) {
            return `Máximo ${input.maxLength} caracteres`;
        }
        if (input.validity.rangeUnderflow) {
            return `El valor mínimo es ${input.min}`;
        }
        if (input.validity.rangeOverflow) {
            return `El valor máximo es ${input.max}`;
        }
        if (input.validity.patternMismatch) {
            return 'El formato no es válido';
        }

        return 'Valor inválido';
    }

    showError(message) {
        const input = this.shadowRoot.querySelector('input');
        const errorMessage = this.shadowRoot.querySelector('.error-message');
        
        if (input && errorMessage) {
            input.classList.add('error', 'shake');
            input.classList.remove('success');
            errorMessage.textContent = message;
            errorMessage.classList.add('show');

            setTimeout(() => {
                input.classList.remove('shake');
            }, 300);
        }
    }

    clearError() {
        const input = this.shadowRoot.querySelector('input');
        const errorMessage = this.shadowRoot.querySelector('.error-message');
        
        if (input && errorMessage) {
            input.classList.remove('error');
            errorMessage.classList.remove('show');
            
            if (this._value) {
                input.classList.add('success');
            } else {
                input.classList.remove('success');
            }
        }
    }

    updateCounter() {
        const counter = this.shadowRoot.querySelector('.counter');
        const maxlength = this.getAttribute('maxlength');
        
        if (counter && maxlength) {
            const currentLength = this._value.length;
            counter.textContent = `${currentLength} / ${maxlength}`;
            
            if (currentLength >= maxlength * 0.9) {
                counter.classList.add('limit');
            } else {
                counter.classList.remove('limit');
            }
        }
    }
}

customElements.define('custom-input', CustomInput);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('demoForm');
    const output = document.getElementById('formOutput');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputs = form.querySelectorAll('custom-input');
            let allValid = true;
            const formData = {};

            inputs.forEach(input => {
                if (!input.validate()) {
                    allValid = false;
                }
                formData[input.id] = input.value;
            });

            if (allValid) {
                output.innerHTML = `
                    <h3>✓ Formulario enviado correctamente</h3>
                    <pre>${JSON.stringify(formData, null, 2)}</pre>
                `;
                output.classList.add('show');

                setTimeout(() => {
                    inputs.forEach(input => input.reset());
                    output.classList.remove('show');
                }, 3000);
            } else {
                output.innerHTML = `
                    <h3>✗ Por favor corrige los errores en el formulario</h3>
                `;
                output.classList.add('show');
            }
        });
    }

    document.querySelectorAll('custom-input').forEach(input => {
        input.addEventListener('input', (e) => {
            console.log(`Input cambió: ${e.detail.value}`);
        });
    });
});
