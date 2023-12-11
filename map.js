const map = document.querySelector(".map");
let isDragging = false;
let startPointX = 0;
let startPointY = 0;
let distanceTraveledX = 0;
let distanceTraveledY = 0;

let shiftedX = 0;
let shiftedY = 0;

let mapWidth = 0;
let mapHeight = 0;

// Event listeners for drag start on mouse and touch
map.addEventListener('mousedown', handleStart);
map.addEventListener('touchstart', handleStart);

function handleStart(e) {
    isDragging = true;
    if (e.type === 'mousedown') {
        // Set starting point for mouse drag
        startPointX = e.clientX;
        startPointY = e.clientY;
    } else if (e.type === 'touchstart') {
        // Set starting point for touch drag
        startPointX = e.touches[0].clientX;
        startPointY = e.touches[0].clientY;
    }
    map.style.cursor = "grab";
}

// Event listeners for drag move on mouse and touch
document.addEventListener('mousemove', handleMove);
document.addEventListener('touchmove', handleMove);

function handleMove(e) {
    if (isDragging) {
        const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

        const deltaX = clientX - startPointX - distanceTraveledX;
        const deltaY = clientY - startPointY - distanceTraveledY;

        const currentX = parseFloat(getComputedStyle(map).backgroundPositionX);
        const currentY = parseFloat(getComputedStyle(map).backgroundPositionY);

        const newX = currentX + deltaX;
        const newY = currentY + deltaY;

        // Update background position within specified bounds
        if (newX <= 500 && newX >= -500) {
            map.style.backgroundPositionX = `${newX}px`;
            distanceTraveledX += deltaX;
        }

        if (newY <= 500 && newY >= -1400) {
            map.style.backgroundPositionY = `${newY}px`;
            distanceTraveledY += deltaY;
        }
    } else {
        handleHover(e);
    }
}



const backgroundImage = getComputedStyle(document.querySelector('.map')).backgroundImage;

// Extract the URL from the background-image property
const imageUrl = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');

// Create a new Image object
const mapImage = new Image();

// Set the source to the background image URL
mapImage.src = imageUrl;

// Access dimensions after the image has loaded
mapImage.onload = function() {
    mapWidth = mapImage.width;
    mapHeight = mapImage.height;
};



function handleHover(e) {
    // Handle hover logic if needed
    // Get the screen resolution
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    // Calculate the scale factors for width and height
    let widthScaleFactor = screenWidth / mapWidth;
    let heightScaleFactor = screenHeight / mapHeight;

    // Use the minimum of the two scale factors
    let sizeFactor = Math.max(widthScaleFactor, heightScaleFactor);

    console.log('Hover detected');
    const absPosX = (e.clientX - shiftedX)/sizeFactor;
    const absPosY = (e.clientY - shiftedY)/sizeFactor;
    
    console.log(`${absPosY}`);
    console.log(`${sizeFactor}`);
    if( 570.0 <= absPosX && absPosX <= 670.0 &&  600.0 <= absPosY && absPosY <= 700.0){
        alert("גמרתי");
        console.log("Hovering on mon");
        
    }

    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    coordinatesElement.textContent = `(${clientX - shiftedX}, ${clientY - shiftedY}), (${absPosX}, ${absPosY}), ${sizeFactor}`;

}

// Event listeners for drag end on mouse and touch
document.addEventListener('mouseup', handleEnd);
document.addEventListener('touchend', handleEnd);

function handleEnd() {
    if (isDragging) {
        isDragging = false;
        shiftedX += distanceTraveledX;
        shiftedY += distanceTraveledY;
        distanceTraveledX = 0;
        distanceTraveledY = 0;
        map.style.cursor = "move";
    }
}

// Event listeners for updating mouse coordinates on mouse and touch move
const coordinatesElement = document.getElementById('coords');
document.addEventListener('mousemove', updateCoordinates);
document.addEventListener('touchmove', updateCoordinates);

function updateCoordinates(event) {
    //const clientX = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;
    //const clientY = event.type === 'mousemove' ? event.clientY : event.touches[0].clientY;
    //coordinatesElement.textContent = `(${clientX - shiftedX}, ${clientY - shiftedY}), ${mapHeight}, ${mapWidth}`;
}
