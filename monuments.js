class Monument {
    constructor(x, y, radius, monumentName, safezone, radiation, puzzle, scientists, recycler) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.monumentName = monumentName;
        this.safezone = safezone;
        this.radiation = radiation;
        this.puzzle = puzzle;
        this.scientists = scientists;
        this.recycler = recycler;
        this.cardContainer = document.createElement('div');
        this.cardContainer.id = monumentName;
        this.cardContainer.classList.add('monument');
        document.querySelector('.map').appendChild(this.cardContainer);
        this.createMonumentCardElement();
        this.cardCloseButton = document.getElementById(`${this.monumentName}close`);
        this.cardCloseButton.addEventListener('click',this.hideMonumentCard);
        this.cardContainer.addEventListener('mouseenter',this.insideCard);
        this.cardContainer.addEventListener('mouseleave',this.outsideCard);
    }

    createMonumentCardElement(){
        this.cardContainer.innerHTML =
           `<div class="monument-name"><i id="${this.monumentName}close" class="close-icon">X</i>${this.monumentName}</div>
            <div class="container">
                <div class="monument-image"></div>
                <div class="monument-desc">
                    <div class="info-item">
                        <img src="images/MapIcons/SafeZone.png" alt="safezone">
                        <span class="content">${this.safezone}</span>         
                    </div>

                    <div class="info-item">
                        <img src="images/MapIcons/radiation.png" alt="radiation">
                        <span class="content">${this.radiation}%</span>  
                    </div>

                    <div class="info-item">
                        <img src="images/MapIcons/puzzle.png" alt="puzzle">
                        <span class="content">${this.puzzle}</span>  
                    </div>

                    <div class="info-item">
                        <img src="images/MapIcons/scientist.png" alt="scientist">
                        <span class="content">${this.scientists}</span>  
                    </div>

                    <div class="info-item">
                        <img src="images/MapIcons/recyyclerIcon.png" alt="recycler">
                        <span class="content">${this.recycler}</span>    
                    </div>
                </div>
            </div>          
            <div class="moreDetails"><a href="#">More Details</a></div>`
    }

    distanceToMonument(mouseX, mouseY) {
        const dx = (mouseX-totalDragX)/sizeFactor - this.x;
        const dy = (mouseY-totalDragY)/sizeFactor - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    isInsideBounds(mouseX, mouseY) {
        return this.distanceToMonument(mouseX, mouseY) <= this.radius;
    }

    calculateScaledPosition() {
        const scaledLeftPos = this.x * sizeFactor + totalDragX;
        const scaledTopPos = this.y * sizeFactor + totalDragY;
        return { left: scaledLeftPos, top: scaledTopPos };
    }

    showMonumentCard() {
        if (!isFadingIn){
             // const diameter = isScreenSmall ? (this.radius * 2) * sizeFactor : (this.radius * 2) / sizeFactorMin; //important no delete 
            isFadingIn = true;
            this.alignMonumentCard();
            this.cardContainer.style.display = "block";
            this.cardContainer.style.pointerEvents= "auto";
            setTimeout(() => {
                this.cardContainer.style.transition = "opacity 0.4s ease-in-out";
                this.cardContainer.style.opacity = 1;         
            }, 0);
        }          
    }
        
   
    hideMonumentCard = async () => {
        isFadingIn = false;
        this.cardContainer.style.transition = "opacity 0.15678s ease-in-out";
      
        // Change opacity and wait for transition to complete
        await new Promise(resolve => {
          this.cardContainer.style.opacity = 0;
          const transitionEndHandler = () => {
            resolve();
            // Remove the event listener to avoid memory leaks
            this.cardContainer.removeEventListener('transitionend', transitionEndHandler);
          };
          // Listen for the 'transitionend' event to know when the transition is complete
          this.cardContainer.addEventListener('transitionend', transitionEndHandler, { once: true });
        });
      
        // After transition is complete, hide the container
        this.cardContainer.style.display = "none";
        map.style.cursor = "move";
      
        if (currentCardShowing.length !== 0) {
          currentCardShowing.pop();
        }
      };
      
    alignMonumentCard = () => {
        const { left, top } = this.calculateScaledPosition();
        this.cardContainer.style.transform = `translate(${left}px, ${top}px) translate(-50%, -50%)`;
    }

    insideCard = (e) => {
        isInsideCard = true;
        e.currentTarget.style.cursor = "default";
    }

    outsideCard = () => {
        isInsideCard = false;
    }
}