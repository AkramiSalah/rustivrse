class Monument {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    distanceToMonument(mouseX, mouseY) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    isInsideCircle(mouseX, mouseY) {
        return this.distanceToMonument(mouseX, mouseY) <= this.radius;
    }

    calculateScaledPosition(sizeFactor, totalDragX, totalDragY) {
        const scaledLeftPos = (this.x - this.radius) * sizeFactor + totalDragX;
        const scaledTopPos = (this.y - this.radius) * sizeFactor + totalDragY;
        return { left: scaledLeftPos, top: scaledTopPos };
    }
}

const outpost = new Monument(625,145,70);