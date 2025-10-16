customElements.define('detalles-persona',
  class extends HTMLElement {
    constructor() {
      super();

      const plantilla = document.getElementById('plantilla-persona');
      const contenidoPlantilla = plantilla.content;

      const raizSombra = this.attachShadow({mode: 'open'});

      const estilo = document.createElement('style');
      estilo.textContent = `
        div { 
          padding: 20px; 
          border: none;
          background: white;
          width: 100%; 
          margin: 0;
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
        h2 { 
          margin: 0 0 15px;
          color: #667eea;
          font-size: 1.5rem;
          border-bottom: 2px solid #f0f0f0;
          padding-bottom: 10px;
          text-align: center;
        }
        ul { 
          margin: 15px 0;
          list-style: none;
        }
        ul li {
          padding: 8px 0;
          color: #555;
          font-size: 1.1rem;
        }
        ul li:before {
          content: "• ";
          color: #667eea;
          font-weight: bold;
          margin-right: 8px;
        }
        p { 
          margin: 10px 0;
          font-size: 1.2rem;
          color: #333;
        }
        ::slotted([slot="nombre-persona"]) {
          font-weight: bold;
          font-size: 1.3rem;
          color: #764ba2;
        }
      `;

      raizSombra.appendChild(estilo);
      raizSombra.appendChild(contenidoPlantilla.cloneNode(true));
    }
  }
);

customElements.define('editar-palabra',
  class extends HTMLElement {
    constructor() {
      super();

      const raizSombra = this.attachShadow({mode: 'open'});
      const formulario = document.createElement('form');
      const entrada = document.createElement('input');
      const texto = document.createElement('span');

      const estilo = document.createElement('style');
      estilo.textContent = `
        span { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4px 12px;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        span:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        input {
          padding: 4px 12px;
          border: 2px solid #667eea;
          border-radius: 6px;
          font-size: inherit;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s ease;
        }
        input:focus {
          border-color: #764ba2;
          box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1);
        }
      `;

      raizSombra.appendChild(estilo);
      raizSombra.appendChild(formulario);
      raizSombra.appendChild(texto);

      texto.textContent = this.textContent;
      entrada.value = this.textContent;

      formulario.appendChild(entrada);
      formulario.style.display = 'none';
      texto.style.display = 'inline-block';
      entrada.style.width = texto.clientWidth + 'px';

      this.setAttribute('tabindex', '0');
      entrada.setAttribute('required', 'required');
      this.style.display = 'inline-block';

      this.addEventListener('click', () => {
        texto.style.display = 'none';
        formulario.style.display = 'inline-block';
        entrada.focus();
        entrada.setSelectionRange(0, entrada.value.length)
      });

      formulario.addEventListener('submit', evento => {
        actualizarVisualizacion();
        evento.preventDefault();
      });

      entrada.addEventListener('blur', actualizarVisualizacion);

      function actualizarVisualizacion() {
        texto.style.display = 'inline-block';
        formulario.style.display = 'none';
        texto.textContent = entrada.value;
        entrada.style.width = texto.clientWidth + 'px';
      }
    }
  }
);