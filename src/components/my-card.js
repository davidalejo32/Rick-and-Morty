class myCard extends HTMLElement {
   constructor () {
      super();

      this.attachShadow( { mode: 'open' } )

   }

   static get observedAttributes () {
      return ['img', "alt", 'name-per', 'status', 'species', 'last-location', 'first-location', 'color'];
   }

   attributeChangedCallback (attr, olvVal, newVal) {
      if( attr === 'img' && newVal !== olvVal) {
         this.img = newVal;
      }

      if( attr === 'alt' && newVal !== olvVal) {
         this.alt = newVal;
      }

      if( attr === 'name-per' && newVal !== olvVal) {
         this.namePer = newVal;
      }

      if( attr === 'status' && newVal !== olvVal) {
         this.status = newVal;
      }

      if( attr === 'species' && newVal !== olvVal) {
         this.species = newVal;
      }

      if( attr === 'last-location' && newVal !== olvVal) {
         this.last = newVal;
      }

      if( attr === 'first-location' && newVal !== olvVal) {
         this.first = newVal;
      }

      if( attr === 'color' && newVal !== olvVal) {
         this.color = newVal;
      }
   }

   getTemplate () {
      const template = document.createElement("template");
      template.innerHTML = `
         <article class="card">
            
            <div class="card__container">

               <figure class="card__img-container">
                  <img class="card__img" src="${this.img}" alt="${this.alt}">
                  <figcaption class="card__name">${this.namePer}</slot></figcaption>
               </figure>
   
               <div class="card__info">
                  <div class="card__alive">
                     <p class="card__info-name">${this.namePer}</p>
                     <div class="card__status">
                        <span class="card__status-color"></span>
                        <span class="card__status-per"> ${this.status} <span> - ${this.species} </span> </span>
                     </div>
                  </div>
   
                  <div class="card__ubication">
                     <p>Última ubicación conocida</p>
                     <p>${this.last}</p>
                  </div>
         
                  <div class="card__ubication">
                     <p>Visto por primera vez en</p>
                     <p>${this.first}</p>
                  </div>
               </div>
            </div>
         </article>
         ${this.getStyle()}
      `;
      return template;
   }

   getStyle () {
      return `
         <style>

            :host {
               --font: Arial, Helvetica, sans-serif;
               --color-status: ${this.color};
               font-family: var(--font);
            }

            
            *{
               margin: 0;
               padding: 0;
               box-sizing: border-box;
            }

            .card {
               width: 280px;
               height: 310px;
               max-height: auto;
               cursor: pointer;
               overflow: hidden;
               position: relative;
               border-radius: 1rem;
               transition: all 0.4s ease-in-out;
            }

            .card:hover {
               box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0.2);
               transition: all 0.3s ease-in;
            }

            .card__container{
               width: 100%;
               height: 100%;
               position: relative;
               border-radius: 10px;
               /* perspectiva en 3d */
               transform-style: preserve-3d;
               transition: all .5s ease;

            }

            .card__container--rotate {
                /* rota el contenedor cunado le den click */
               transform: rotateY(180deg);
            }

            .card__img-container {
               width: 100%;
               height: 100%;
               backface-visibility: hidden;
               position: relative;

            }

            .card__img{
               width: 100%;
               height: 100%;
               object-fit: cover;
               object-position: center center;
            }

            .card__img-container::after {
               width: 100%;
               height: 100%;
               content: "";
               position: absolute;
               background: linear-gradient(
                  180deg,
                   rgba(33, 33, 33, 0.8) 0%,
                   rgba(33, 33, 33, 0) 100%
               );
              transform: matrix(1, 0, 0, -1, 0, 0);

               top: 0;
               left: 0;
            }

            .card__name {
               font-size: 25px;
               font-weight: 700;
               text-align: center;
               width: 100%;
               color: rgb(255, 255, 255);
               position: absolute;
               bottom: 20px;
               z-index: 2;
            }

            .card__info {
               width: 100%;
               height: 100%;
               padding: 20px 20px 20px 30px;
               position: absolute;
               top: 0;
               left: 0;
               background-color: #22292ff7;
               display: flex;
               flex-direction: column;
               overflow-y: scroll;
               overflow-x: none;
               opacity: 1;
               backface-visibility: hidden;
               transform: rotateY(180deg);
               transition: all 0.5s ease;
            }

            .card__info::-webkit-scrollbar {
               width: 10px; 
               background-color: transparent;
            }

            .card__info::-webkit-scrollbar-thumb {
               background-color: #535a5f;
               border-radius: 8px;

            }

            .card__alive {
               border-bottom: 1px solid #fff;
            }

            .card__info-name {
               text-align: center;
               font-size: 27px;
               font-weight: 700;
               margin-bottom: 15px;
               color: #ffe4c2;
            }

            .card__status {
               display: flex;
               flex-wrap: wrap;
               align-items: center;
               justify-content: center;
               /* margin-left: 35px; */
               margin-bottom: 20px;
               color: #fff;
            }

            .card__status-color {
               width: 10px;
               height: 10px;
               border-radius: 50%;
               background-color: var(--color-status);
               margin-right: 8px;
            }

            .card__status-per {
               font-size: 15px;
               margin-right: 4px;
            }


            .card__ubication {
               margin-top: 30px;
            }

            .card__ubication p:nth-child(1) {
               font-size: 17px;
               font-weight: 800;
               
               color: #fff;
            }

            .card__ubication p:nth-child(2) {
               font-size: 14px;
               font-weight: 500;
               
               margin-top: 8px;
               color: rgb(192, 192, 192);
            }


         </style>
      `;
   }

   render () {

      this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
      
      this.cardContainer = this.shadowRoot.querySelector('.card__container');

      this.cardContainer.addEventListener("click", () => {
         this.cardContainer.classList.toggle("card__container--rotate")
      })
   }



   connectedCallback () {    
      this.render();
   }
}

customElements.define("my-card", myCard);