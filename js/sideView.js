AFRAME.registerComponent('side-view', {
  createPlaceThumbnail: function(position, id){
      const element = document.createElement('a-entity')
      element.setAttribute('visible', true);
      element.setAttribute('id', `place-${id}`)
      element.setAttribute('geometry', {
          primitive: 'circle',
          radius: 2.5,
      })
      element.setAttribute('material', {
          src: './assets/helicopter.png',
          opacity: 0.9
        })
      element.setAttribute('position', position);
      element.setAttribute('cursor-listener', {})
      return element
  },
  createPlaces: function(){
      const sideviewcontroler = document.querySelector('#side-view-container')
      let previousXPosition = -150;
      let previousYPosition = 30;
      for(var i = 1; i <= 4; i=i+1){
          const position = {
              x: (previousXPosition+=50),
              y: (previousYPosition+=2),
              z: -40
          }
          const element = this.createPlaceThumbnail(position, i)
          sideviewcontroler.appendChild(element)
      }
  },
  tick: function(){
      const placesContainer = document.querySelector('#places-container');
      const {state} = placesContainer.getAttribute('tour');
      if(state === 'view' || state === 'change-view'){
          this.el.setAttribute('visible', true)
      }
      else{
          this.el.setAttribute('visible', false)
      }
  },
  init: function(){
      this.createPlaces();
  },
  handleClickEvents: function(){
      this.el.addEventListener('click', ()=>{
          const placesContainer = document.querySelector('#places-container')
          const {state} = placesContainer.getAttribute('tour')
          if(state === 'places-list'){
              const id = this.el.getAttribute('id')
              const placesid = ['taj-mahal', 'budapest', 'new-york-city', 'eiffel-tower']
              if(placesid.includes(id)){
                  placesContainer.setAttribute('tour', {
                      state: 'view',
                      selectedCard: id
                  })
              }
              if(state === 'view'){
                  this.handleViewState()
              }
              if(state === 'change-view'){
                  this.handleViewState();
              }
          }
      })
  }
})