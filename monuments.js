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
        this.mon = document.getElementById(monumentName);
        this.mon.innerHTML =
           `<div class="monument-name">${monumentName}</div> 
            <div class="container">
                <div class="monument-image"></div>
                <div class="monument-desc">
                    <div class="safeZone">safezone: ${safezone}</div>
                    <div class="radiation">radiation: ${radiation}</div>
                    <div class="puzzle">puzzle: ${puzzle}</div>
                    <div class="scientists">scientists: ${scientists}</div>
                    <div class="recycler">recycler: ${recycler}</div>
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

    // calculateScaledPosition() {
    //     const scaledLeftPos = this.x * sizeFactor + totalDragX - this.radius * sizeFactor;
    //     const scaledTopPos = this.y * sizeFactor + totalDragY - this.radius * sizeFactor;
    //     return { left: scaledLeftPos, top: scaledTopPos };
    // }

    showHoverCircle() {
        const { left, top } = this.calculateScaledPosition();
        // const diameter = isScreenSmall ? (this.radius * 2) * sizeFactor : (this.radius * 2) / sizeFactorMin; //important no delete        
    
        // Apply styles for fade-in
        this.mon.style.transition = "opacity 1s";
        this.mon.style.display = "block";
        this.mon.style.position = 'fixed';
        this.mon.style.transform = `translate(${left}px, ${top}px) translate(-50%, -50%)`;
    
        // Trigger fade-in by setting opacity to 1 after a brief delay (e.g., using setTimeout)
        setTimeout(() => {
            this.mon.style.opacity = '1';
        }, 50);
    }
    
    hideHoverCircle() {
        this.mon.style.opacity = '0';    
        this.mon.addEventListener('transitionend', () => {
            this.mon.style.display = "none";
        });
    }
}