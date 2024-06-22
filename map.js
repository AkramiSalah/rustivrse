const currentCardShowing = [];
const map = document.querySelector(".map");
const coordinatesElement = document.getElementById('coords');

let isAtLeftEdge = false;
let isAtTopEdge = false;
let isDragging = false;
let isFadingIn = false;
let isInsideCard = false;
let isMenuTransitioning = false;

let startPointX = 0;
let startPointY = 0;

let currentDragX = 0;
let currentDragY = 0;

let totalDragX = 0;
let totalDragY = 0;

// Event listeners for drag start - mouse and touch
map.addEventListener('mousedown', handleDragStart);
map.addEventListener('touchstart', handleDragStart);

function handleDragStart(e) {
    isDragging = true;
    map.style.cursor = "grabbing";

    if (e.type === 'mousedown') {
        startPointX = e.clientX;
        startPointY = e.clientY;
    }
    else if (e.type === 'touchstart') {
        startPointX = e.touches[0].clientX;
        startPointY = e.touches[0].clientY;
    }                     
}

// Event listeners for drag move - mouse and touch
map.addEventListener('mousemove', handleDragMove);
map.addEventListener('touchmove', handleDragMove);

function handleDragMove(e) {
    if (isDragging) {
        const { deltaX, deltaY, newX, newY } = calcXYCoordinates(e);    
        adjustMapPosition(newX, newY, deltaX, deltaY);
           
        if (currentCardShowing.length === 1) currentCardShowing[0].hideMonumentCard();
            
        monumentsList.forEach(mon => {
            mon.alignMonumentCard();
            updateMonumentIconPosition(mon, deltaX, deltaY);     
        });
    }
    else handleMapHover(e);               
}

const calcXYCoordinates = (e) => {
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

    const deltaX = clientX - startPointX - currentDragX;
    const deltaY = clientY - startPointY - currentDragY;

    const currentX = parseFloat(getComputedStyle(map).backgroundPositionX);
    const currentY = parseFloat(getComputedStyle(map).backgroundPositionY);

    const newX = currentX + deltaX;
    const newY = currentY + deltaY;

    return { deltaX, deltaY, newX, newY };
}

const adjustMapPosition = (newX, newY, deltaX, deltaY) => {
    if (newX <= 500 && newX >= -500) {
        isAtLeftEdge = false;
        map.style.backgroundPositionX = `${newX}px`;
        currentDragX += deltaX;
    }
    else isAtLeftEdge = true;
              
    if (newY <= 500 && newY >= -1400) {
        isAtTopEdge = false;
        map.style.backgroundPositionY = `${newY}px`;
        currentDragY += deltaY;
    }
    else  isAtTopEdge = true;
}

function handleMapHover(e) {
    const absPosX = (e.clientX - totalDragX) / sizeFactor;
    const absPosY = (e.clientY - totalDragY) / sizeFactor;

    // updating the coordinates at the bottom of the screen:
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    coordinatesElement.textContent = `(${clientX - totalDragX}, ${clientY - totalDragY}),
                                        (${Math.round(absPosX)}, ${Math.round(absPosY)})`;                                                                              
}

// Event listeners for ending drag - mouse and touch
map.addEventListener('mouseup', handleDragEnd);
map.addEventListener('touchend', handleDragEnd);

function handleDragEnd() {
    if (isDragging) {
        isDragging = false;
        totalDragX += currentDragX;
        totalDragY += currentDragY;
        currentDragX = 0;
        currentDragY = 0;
    }
    
    if (!isInsideCard) map.style.cursor = "move";  
    else map.style.cursor = "default";  
}