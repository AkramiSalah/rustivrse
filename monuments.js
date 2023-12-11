class Monument {
    constructor(x, y, radius, hoverCircleId) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.hoverCircleId = hoverCircleId;
        this.hoverCircle = document.getElementById(hoverCircleId);
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
        const scaledLeftPos = (this.x - this.radius) * sizeFactor + totalDragX;
        const scaledTopPos = (this.y - this.radius) * sizeFactor + totalDragY;
        return { left: scaledLeftPos, top: scaledTopPos };
    }

    // calculateScaledPosition() {
    //     const scaledLeftPos = this.x * sizeFactor + totalDragX - this.radius * sizeFactor;
    //     const scaledTopPos = this.y * sizeFactor + totalDragY - this.radius * sizeFactor;
    //     return { left: scaledLeftPos, top: scaledTopPos };
    // }

    showHoverCircle() {
        const { left, top } = this.calculateScaledPosition();
        const diameter = isScreenSmall ? (this.radius * 2)*sizeFactor : (this.radius * 2)/sizeFactorMin;
        this.hoverCircle.style.transition = "opacity 1s";
        this.hoverCircle.style.display = "block";
        this.hoverCircle.style.width = `${diameter}px`;
        this.hoverCircle.style.height = `${diameter}px`;
        this.hoverCircle.style.backgroundColor = 'red';
        this.hoverCircle.style.borderRadius = '50%';  // Make it a circle
        this.hoverCircle.style.position = 'fixed';
        this.hoverCircle.style.transform = 
            `translate(-50%, -50%) translate(${left + this.radius * sizeFactor}px, ${top + this.radius * sizeFactor}px)`;

        this.hoverCircle.style.opacity = '1';
    }

    hideHoverCircle() {
        this.hoverCircle.style.opacity = '0';    
        this.hoverCircle.addEventListener('transitionend', () => {
            this.hoverCircle.style.display = "none";
        });
    }
}