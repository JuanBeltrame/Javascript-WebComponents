class ContadorPalabras extends HTMLParagraphElement {
  constructor() {
    super();

    const elementoPadre = this.parentNode;

    function contarPalabras(nodo){
      const texto = nodo.innerText || nodo.textContent;
      return texto.trim().split(/\s+/g).filter(palabra => palabra.trim().length > 0).length;
    }

    const conteo = `Palabras: ${contarPalabras(elementoPadre)}`;

    const sombra = this.attachShadow({mode: 'open'});

    // Agregar estilos al Shadow DOM
    const estilo = document.createElement('style');
    estilo.textContent = `
      span {
        display: block;
        text-align: center;
        font-weight: bold;
        font-size: 1.3rem;
        color: #667eea;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
        padding: 15px 20px;
        border-radius: 10px;
        margin-top: 30px;
        border: 2px solid rgba(102, 126, 234, 0.3);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        transition: all 0.3s ease;
      }
      span:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(102, 126, 234, 0.3);
        border-color: rgba(102, 126, 234, 0.5);
      }
    `;

    const textoElemento = document.createElement('span');
    textoElemento.textContent = conteo;

    sombra.appendChild(estilo);
    sombra.appendChild(textoElemento);

    this.parentNode.addEventListener('input', () => {
      textoElemento.textContent = `Palabras: ${contarPalabras(elementoPadre)}`;
    });
  }
}

customElements.define('contador-palabras', ContadorPalabras, { extends: 'p' });