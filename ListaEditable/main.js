'use strict';

(function() {
  class ListaEditable extends HTMLElement {
    constructor() {

      super();

      const sombra = this.attachShadow({ mode: 'open' });

      const contenedorLista = document.createElement('div');

      const titulo = this.titulo;
      const textoAgregar = this.textoAgregar;
      const elementosLista = this.elementos;

      contenedorLista.classList.add('lista-editable');

      contenedorLista.innerHTML = `
        <style>
          h3 {
            text-align: center;
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }

          li, div > div {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .icono {
            background-color: #2d3d2e;
            color: #ffffff;
            border: 2px solid #4a5d4b;
            border-radius: 8px;
            cursor: pointer;
            float: right;
            font-size: 1.8rem;
            padding: 0.5rem 1rem;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          .icono:hover {
            background-color: #4a5d4b;
            border-color: #6b8c6e;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }

          .icono:active {
            transform: translateY(0);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          }
        </style>
        <h3>${titulo}</h3>
        <ul class="lista-elementos">
          ${elementosLista.map(elemento => `
            <li>${elemento}
              <button class="eliminar-elemento icono">✖</button>
            </li>
          `).join('')}
        </ul>
        <div>
          <label>${textoAgregar}</label>
          <input class="entrada-nuevo-elemento" type="text">
          <button class="agregar-elemento icono">✔</button>
        </div>
      `;

      
      this.agregarElemento = this.agregarElemento.bind(this);
      this.manejarEventosEliminar = this.manejarEventosEliminar.bind(this);
      this.eliminarElemento = this.eliminarElemento.bind(this);

      
      sombra.appendChild(contenedorLista);
    }

    
    agregarElemento(e) {
      const entradaTexto = this.shadowRoot.querySelector('.entrada-nuevo-elemento');

      if (entradaTexto.value) {
        const li = document.createElement('li');
        const boton = document.createElement('button');
        const cantidadHijos = this.listaElementos.children.length;

        li.textContent = entradaTexto.value;
        boton.classList.add('eliminar-elemento', 'icono');
        boton.innerHTML = '✖';

        this.listaElementos.appendChild(li);
        this.listaElementos.children[cantidadHijos].appendChild(boton);

        this.manejarEventosEliminar([boton]);

        entradaTexto.value = '';
      }
    }

    
    connectedCallback() {
      const botonesEliminar = [...this.shadowRoot.querySelectorAll('.eliminar-elemento')];
      const botonAgregar = this.shadowRoot.querySelector('.agregar-elemento');
      const entradaTexto = this.shadowRoot.querySelector('.entrada-nuevo-elemento');

      this.listaElementos = this.shadowRoot.querySelector('.lista-elementos');

      this.manejarEventosEliminar(botonesEliminar);
      botonAgregar.addEventListener('click', this.agregarElemento, false);
      entradaTexto.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.agregarElemento(e);
        }
      });
    }

    
    get titulo() {
      return this.getAttribute('title') || '';
    }

    get elementos() {
      const elementos = [];

      [...this.attributes].forEach(atributo => {
        if (atributo.name.includes('list-item')) {
          elementos.push(atributo.value);
        }
      });

      return elementos;
    }

    get textoAgregar() {
      return this.getAttribute('add-item-text') || '';
    }

    manejarEventosEliminar(arregloElementos) {
      arregloElementos.forEach(elemento => {
        elemento.addEventListener('click', this.eliminarElemento, false);
      });
    }

    eliminarElemento(e) {
      e.target.parentNode.remove();
    }
  }

  
  customElements.define('lista-editable', ListaEditable);
})();
