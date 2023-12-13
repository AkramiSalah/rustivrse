const monumentsList = [
    new Monument(925, 537, 55, "Outpost", true, 0, false, false, true),
    new Monument(532, 810, 85, "Launch Site", false, 30, true, true, true)  
];

const map = document.querySelector(".map");
const monumentCards = document.querySelectorAll(".monument");

let isDragging = false;
let isScreenSmall = false;
let isHoveringOverCard = false;
let isFadingIn = false;

let startPointX = 0;
let startPointY = 0;

let currentDragX = 0;
let currentDragY = 0;

let totalDragX = 0;
let totalDragY = 0;

let mapWidth = 0;
let mapHeight = 0;
let sizeFactor = 0;


// Event listeners for drag start - mouse and touch
map.addEventListener('mousedown', handleDragStart);
map.addEventListener('touchstart', handleDragStart);

function handleDragStart(e) {
    isDragging = true;
    if (e.type === 'mousedown') {
        startPointX = e.clientX;
        startPointY = e.clientY;
    } else if (e.type === 'touchstart') {
        startPointX = e.touches[0].clientX;
        startPointY = e.touches[0].clientY;
    }               
    map.style.cursor = "grab";
}

// Event listeners for drag move - mouse and touch
map.addEventListener('mousemove', handleDragMove);
map.addEventListener('touchmove', handleDragMove);

function handleDragMove(e) {
    if (isDragging) {
        map.style.cursor = "grab";
        const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

        const deltaX = clientX - startPointX - currentDragX;
        const deltaY = clientY - startPointY - currentDragY;

        const currentX = parseFloat(getComputedStyle(map).backgroundPositionX);
        const currentY = parseFloat(getComputedStyle(map).backgroundPositionY);

        const newX = currentX + deltaX;
        const newY = currentY + deltaY;

        // Update background position within specified bounds
        if (newX <= 500 && newX >= -500) {
            map.style.backgroundPositionX = `${newX}px`;
            currentDragX += deltaX;
        }

        if (newY <= 500 && newY >= -1400) {
            map.style.backgroundPositionY = `${newY}px`;
            currentDragY += deltaY;
        }

        monumentsList.forEach(mon =>{
            mon.mon.style.display = "none"
        })
    }
}

// Event listeners for hover - mouse and touch
map.addEventListener('mousemove',handleMonumentHover)
map.addEventListener('touchmove',handleMonumentHover)

function handleMonumentHover(e) { 
    for (const monument of monumentsList) {
        if (monument.isInsideBounds(e.clientX, e.clientY) && e.buttons === 0) {
            monument.showMonumentCard();
        } 
        else {  
            if (!isHoveringOverCard){
                monument.hideMonumentCard();
            }        
                      
        }
    }
}

map.addEventListener('mousemove', handleHover);
map.addEventListener('touchmove', handleHover);

function handleHover(e) {
    if(!isDragging){

    const absPosX = (e.clientX - totalDragX) / sizeFactor;
    const absPosY = (e.clientY - totalDragY) / sizeFactor;

    // updating the coordinates at the bottom of the screen:
    const coordinatesElement = document.getElementById('coords');
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    coordinatesElement.textContent = `(${clientX - totalDragX}, ${clientY - totalDragY}), (${Math.round(absPosX)}, ${Math.round(absPosY)})`;
    } 
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
        map.style.cursor = "move";
    }
}

// Determining map height and width:

const backgroundImage = getComputedStyle(document.querySelector('.map')).backgroundImage;

// Extract the URL from the background-image property
const imageUrl = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');

// Create a new Image object
const mapImage = new Image();

// Set the source to the background image URL
mapImage.src = imageUrl;


function calcSizeFactor() {   
    mapWidth = mapImage.width;
    mapHeight = mapImage.height;

    // Get the screen resolution
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    // Calculate the scale factors for width and height
    let widthScaleFactor = screenWidth / mapWidth;
    let heightScaleFactor = screenHeight / mapHeight;

    // Use the maximum of the two scale factors
    sizeFactor = Math.max(widthScaleFactor, heightScaleFactor);
    
    // sizeFactorMin = Math.min(widthScaleFactor, heightScaleFactor);
  
    // if( widthScaleFactor <= 1 || heightScaleFactor <= 1){
    //     isScreenSmall = true;
    // }
}

// Access dimensions after the map has loaded or window resized
mapImage.onload = calcSizeFactor;
window.addEventListener('resize', calcSizeFactor);


monumentCards.forEach(card =>{
    card.addEventListener('mouseenter',()=>{
        isHoveringOverCard = true;
    })
})

monumentCards.forEach(card =>{
    card.addEventListener('mouseleave',()=>{
        isHoveringOverCard = false;
    })
})