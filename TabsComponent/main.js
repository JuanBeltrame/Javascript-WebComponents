class CustomTabs extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._activeIndex = 0;
    }

    static get observedAttributes() {
        return ['orientation', 'theme'];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.setInitialActiveTab();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot) {
            this.render();
            this.setupEventListeners();
        }
    }

    get orientation() {
        return this.getAttribute('orientation') || 'horizontal';
    }

    get theme() {
        return this.getAttribute('theme') || 'default';
    }

    get activeIndex() {
        return this._activeIndex;
    }

    set activeIndex(index) {
        this._activeIndex = index;
        this.updateTabs(index);
    }

    setInitialActiveTab() {
        const tabItems = this.querySelectorAll('tab-item');
        tabItems.forEach((item, index) => {
            if (item.hasAttribute('active')) {
                this._activeIndex = index;
            }
        });
        this.updateTabs(this._activeIndex);
    }

    render() {
        const orientation = this.orientation;
        const theme = this.theme;

        this.shadowRoot.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                }

                :host {
                    display: block;
                    width: 100%;
                }

                .tabs-container {
                    display: flex;
                    gap: 0;
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .tabs-container.horizontal {
                    flex-direction: column;
                }

                .tabs-container.vertical {
                    flex-direction: row;
                    min-height: 400px;
                }

                .tabs-header {
                    display: flex;
                    background: #f9fafb;
                    border-bottom: 2px solid #e5e7eb;
                }

                .tabs-container.horizontal .tabs-header {
                    flex-direction: row;
                    overflow-x: auto;
                    overflow-y: hidden;
                }

                .tabs-container.vertical .tabs-header {
                    flex-direction: column;
                    border-bottom: none;
                    border-right: 2px solid #e5e7eb;
                    min-width: 200px;
                    overflow-y: auto;
                    overflow-x: hidden;
                }

                .tabs-header::-webkit-scrollbar {
                    height: 4px;
                    width: 4px;
                }

                .tabs-header::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                .tabs-header::-webkit-scrollbar-thumb {
                    background: #667eea;
                    border-radius: 4px;
                }

                .tab-button {
                    background: transparent;
                    border: none;
                    padding: 16px 24px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: 500;
                    color: #6b7280;
                    transition: all 0.3s ease;
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    white-space: nowrap;
                    flex-shrink: 0;
                }

                .tab-button:hover {
                    background: rgba(102, 126, 234, 0.1);
                    color: #667eea;
                }

                .tab-button:focus {
                    outline: 2px solid #667eea;
                    outline-offset: -2px;
                    z-index: 1;
                }

                .tab-button.active {
                    color: #667eea;
                    font-weight: 600;
                    background: white;
                }

                .tabs-container.horizontal .tab-button.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }

                .tabs-container.vertical .tab-button.active::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    width: 3px;
                    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
                }

                .tab-icon {
                    font-size: 1.2rem;
                }

                .tabs-content {
                    flex: 1;
                    padding: 24px;
                    background: white;
                }

                ::slotted(tab-item) {
                    display: none !important;
                }

                ::slotted(tab-item[data-active]) {
                    display: block !important;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .tabs-content {
                    animation: fadeIn 0.3s ease;
                }

                @media (max-width: 768px) {
                    .tabs-container.vertical {
                        flex-direction: column;
                        min-height: auto;
                    }

                    .tabs-container.vertical .tabs-header {
                        flex-direction: row;
                        border-right: none;
                        border-bottom: 2px solid #e5e7eb;
                        min-width: auto;
                        overflow-x: auto;
                        overflow-y: hidden;
                    }

                    .tabs-container.vertical .tab-button.active::after {
                        top: auto;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        width: auto;
                        height: 3px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    }

                    .tab-button {
                        padding: 12px 16px;
                        font-size: 0.9rem;
                    }

                    .tabs-content {
                        padding: 16px;
                    }
                }
            </style>

            <div class="tabs-container ${orientation}">
                <div class="tabs-header" role="tablist">
                    <!-- Los botones de tabs se generarán aquí -->
                </div>
                <div class="tabs-content">
                    <slot></slot>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const tabItems = this.querySelectorAll('tab-item');
        const tabsHeader = this.shadowRoot.querySelector('.tabs-header');
        
        tabsHeader.innerHTML = '';

        tabItems.forEach((item, index) => {
            const button = document.createElement('button');
            button.className = 'tab-button';
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-selected', index === this._activeIndex ? 'true' : 'false');
            button.setAttribute('tabindex', index === this._activeIndex ? '0' : '-1');
            button.dataset.index = index;

            const icon = item.getAttribute('icon');
            if (icon) {
                const iconSpan = document.createElement('span');
                iconSpan.className = 'tab-icon';
                iconSpan.textContent = icon;
                button.appendChild(iconSpan);
            }

            const label = item.getAttribute('label') || `Tab ${index + 1}`;
            const labelSpan = document.createElement('span');
            labelSpan.textContent = label;
            button.appendChild(labelSpan);

            if (index === this._activeIndex) {
                button.classList.add('active');
            }

            button.addEventListener('click', () => {
                this.activeIndex = index;
                this.dispatchTabChangeEvent(index, label);
            });

            tabsHeader.appendChild(button);
        });

        this.setupKeyboardNavigation();
    }

    setupKeyboardNavigation() {
        const tabsHeader = this.shadowRoot.querySelector('.tabs-header');
        const tabButtons = Array.from(tabsHeader.querySelectorAll('.tab-button'));

        tabsHeader.addEventListener('keydown', (e) => {
            const currentIndex = parseInt(e.target.dataset.index);
            let newIndex = currentIndex;

            const isHorizontal = this.orientation === 'horizontal';

            if ((isHorizontal && e.key === 'ArrowRight') || (!isHorizontal && e.key === 'ArrowDown')) {
                newIndex = (currentIndex + 1) % tabButtons.length;
                e.preventDefault();
            } else if ((isHorizontal && e.key === 'ArrowLeft') || (!isHorizontal && e.key === 'ArrowUp')) {
                newIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
                e.preventDefault();
            } else if (e.key === 'Home') {
                newIndex = 0;
                e.preventDefault();
            } else if (e.key === 'End') {
                newIndex = tabButtons.length - 1;
                e.preventDefault();
            }

            if (newIndex !== currentIndex) {
                this.activeIndex = newIndex;
                tabButtons[newIndex].focus();
                const label = this.querySelectorAll('tab-item')[newIndex].getAttribute('label');
                this.dispatchTabChangeEvent(newIndex, label);
            }
        });
    }

    updateTabs(index) {
        const tabItems = this.querySelectorAll('tab-item');
        const tabButtons = this.shadowRoot.querySelectorAll('.tab-button');

        tabItems.forEach((item, i) => {
            if (i === index) {
                item.setAttribute('data-active', '');
            } else {
                item.removeAttribute('data-active');
            }
        });

        tabButtons.forEach((button, i) => {
            if (i === index) {
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');
                button.setAttribute('tabindex', '0');
            } else {
                button.classList.remove('active');
                button.setAttribute('aria-selected', 'false');
                button.setAttribute('tabindex', '-1');
            }
        });
    }

    dispatchTabChangeEvent(index, label) {
        this.dispatchEvent(new CustomEvent('tab-change', {
            bubbles: true,
            composed: true,
            detail: { 
                index, 
                label,
                tabsId: this.id 
            }
        }));
    }

    selectTab(index) {
        const tabItems = this.querySelectorAll('tab-item');
        if (index >= 0 && index < tabItems.length) {
            this.activeIndex = index;
        }
    }

    selectTabByLabel(label) {
        const tabItems = Array.from(this.querySelectorAll('tab-item'));
        const index = tabItems.findIndex(item => item.getAttribute('label') === label);
        if (index !== -1) {
            this.activeIndex = index;
        }
    }
}

class TabItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.style.display = this.hasAttribute('data-active') ? 'block' : 'none';
    }

    static get observedAttributes() {
        return ['data-active'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-active') {
            this.style.display = newValue !== null ? 'block' : 'none';
        }
    }
}

customElements.define('custom-tabs', CustomTabs);
customElements.define('tab-item', TabItem);

document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');

    document.addEventListener('tab-change', (e) => {
        console.log('Tab cambió:', e.detail);
        
        showOutput(`Tab seleccionado: "${e.detail.label}" (índice: ${e.detail.index})`);
    });

    function showOutput(message) {
        output.innerHTML = `
            <div class="message info">
                <strong>ℹ</strong> ${message}
            </div>
        `;
        output.classList.add('show');

        setTimeout(() => {
            output.classList.remove('show');
        }, 2000);
    }

    const dynamicTabs = document.getElementById('dynamicTabs');
    if (dynamicTabs) {
        console.log('Tabs dinámicos cargados');
    }
});
