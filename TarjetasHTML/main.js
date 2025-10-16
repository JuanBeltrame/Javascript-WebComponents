customElements.define('element-details',
  class extends HTMLElement {
    constructor() {
      super();
      
      
      const raizSombra = this.attachShadow({mode: 'open'});
      
      
      const nombre = this.dataset.name || 'elemento';
      const descripcion = this.dataset.description || 'Sin descripción';
      const atributosJSON = this.dataset.attributes || '[]';
      const atributos = JSON.parse(atributosJSON);
      
      
      const estilo = document.createElement('style');
      estilo.textContent = `
        details {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        details:hover {
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }
        
        details[open] {
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.2);
        }
        
        summary {
          list-style: none;
          outline: none;
          user-select: none;
        }
        
        summary::-webkit-details-marker {
          display: none;
        }
        
        summary::before {
          content: '▶';
          display: inline-block;
          margin-right: 0.5rem;
          transition: transform 0.3s ease;
          color: #667eea;
          font-size: 0.8rem;
        }
        
        details[open] summary::before {
          transform: rotate(90deg);
        }
        
        .elemento-nombre {
          font-weight: bold;
          color: #667eea;
          font-size: 1.3rem;
          font-family: 'Courier New', monospace;
          margin-right: 0.5rem;
        }
        
        .elemento-descripcion {
          color: #555;
          font-style: italic;
          font-size: 0.95rem;
        }
        
        .atributos-contenido {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 2px solid rgba(102, 126, 234, 0.2);
        }
        
        .atributos-titulo {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 6px 14px;
          border-radius: 6px;
          display: inline-block;
          font-size: 0.9rem;
          font-weight: bold;
          margin-bottom: 1rem;
          box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
        }
        
        .atributo-item {
          margin-bottom: 1rem;
          padding-left: 1rem;
          border-left: 3px solid #667eea;
        }
        
        .atributo-nombre {
          font-weight: bold;
          color: #667eea;
          font-family: 'Courier New', monospace;
          font-size: 1.05rem;
          margin-bottom: 0.3rem;
        }
        
        .atributo-descripcion {
          color: #666;
          line-height: 1.5;
          margin-left: 0.5rem;
        }
        
        .sin-atributos {
          color: #999;
          font-style: italic;
          margin-left: 1rem;
        }
        
        hr {
          margin: 1rem 0 0 0;
          border: none;
          border-top: 2px solid rgba(102, 126, 234, 0.1);
        }
      `;
      
      
      const detalles = document.createElement('details');
      
      
      const resumen = document.createElement('summary');
      
      const nombreElemento = document.createElement('code');
      nombreElemento.className = 'elemento-nombre';
      nombreElemento.textContent = `<${nombre}>`;
      
      const descripcionElemento = document.createElement('i');
      descripcionElemento.className = 'elemento-descripcion';
      descripcionElemento.textContent = descripcion;
      
      resumen.appendChild(nombreElemento);
      resumen.appendChild(descripcionElemento);
      
      
      const contenidoAtributos = document.createElement('div');
      contenidoAtributos.className = 'atributos-contenido';
      
      const tituloAtributos = document.createElement('h4');
      tituloAtributos.className = 'atributos-titulo';
      tituloAtributos.textContent = 'Atributos';
      
      contenidoAtributos.appendChild(tituloAtributos);
      
      if (atributos.length === 0) {
        const sinAtributos = document.createElement('p');
        sinAtributos.className = 'sin-atributos';
        sinAtributos.textContent = 'Ninguno';
        contenidoAtributos.appendChild(sinAtributos);
      } else {
        atributos.forEach(attr => {
          const itemAtributo = document.createElement('div');
          itemAtributo.className = 'atributo-item';
          
          const nombreAttr = document.createElement('dt');
          nombreAttr.className = 'atributo-nombre';
          nombreAttr.textContent = attr.name;
          
          const descAttr = document.createElement('dd');
          descAttr.className = 'atributo-descripcion';
          descAttr.textContent = attr.desc;
          
          itemAtributo.appendChild(nombreAttr);
          itemAtributo.appendChild(descAttr);
          contenidoAtributos.appendChild(itemAtributo);
        });
      }
      

      const lineaDivisoria = document.createElement('hr');
      
      
      detalles.appendChild(resumen);
      detalles.appendChild(contenidoAtributos);
      
      raizSombra.appendChild(estilo);
      raizSombra.appendChild(detalles);
      raizSombra.appendChild(lineaDivisoria);
    }
  }
);