class Monument {
    constructor(x, y, radius, monumentName,safezone,radiation,puzzle,scientists,recycler) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.monumentName = monumentName;
        this.safezone = safezone;
        this.radiation = radiation;
        this.puzzle = puzzle;
        this.scientists = scientists;
        this.recycler = recycler;
        this.mon = document.createElement('div');
        this.mon.id = monumentName;
        this.mon.classList.add('monument');
        document.querySelector('.map').appendChild(this.mon);
        this.mon.innerHTML =
           `<div class="monument-name">${monumentName}</div>
            <div class="container">
                <div class="monument-image" style = "background-image : url('images/${this.monumentName}.jpg')"></div>
                <div class="monument-desc">
                    <div class="safeZone">Safezone: ${safezone}</div>
                    <div class="radiation">Radiation: ${radiation}</div>
                    <div class="puzzle">Puzzle: ${puzzle}</div>
                    <div class="scientists">Scientists: ${scientists}</div>
                    <div class="recycler">Recycler: ${recycler}</div>
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

    showHoverCircle() {
        const { left, top } = this.calculateScaledPosition();
        // const diameter = isScreenSmall ? (this.radius * 2) * sizeFactor : (this.radius * 2) / sizeFactorMin; //important no delete        
   
        this.mon.style.display = "block";
        this.mon.style.opacity = 0;
        setTimeout(() => {
            this.mon.style.transition = "opacity 0.3s ease-in-out";
            this.mon.style.opacity = 1;
            this.mon.style.transform = `translate(${left}px, ${top}px) translate(-50%, -50%)`;
        }, 0);
        }
   
    hideHoverCircle() {
        setTimeout(()=>{
            this.mon.style.opacity = 0;
        },0); 
    }
}