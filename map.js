const map = document.querySelector(".map");
let isDragging = false;

let startPointX = 0;
let startPointY = 0;

let currentDragX = 0;
let currentDragY = 0;

let totalDragX = 0;
let totalDragY = 0;

let mapWidth = 0;
let mapHeight = 0;

let hoverSquare = document.getElementById('hoverSquare');

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
document.addEventListener('mousemove', handleDragMove);
document.addEventListener('touchmove', handleDragMove);


function handleDragMove(e) {
    if (isDragging) {
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
        hoverSquare.style.display = "none"
    }
}

// Event listeners for hover - mouse and touch
map.addEventListener('mousemove', handleHover);
map.addEventListener('touchmove', handleHover);

function handleHover(e) {
    if(!isDragging){

    // Get the screen resolution
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    // Calculate the scale factors for width and height
    let widthScaleFactor = screenWidth / mapWidth;
    let heightScaleFactor = screenHeight / mapHeight;

    // Use the maximum of the two scale factors
    let sizeFactor = Math.max(widthScaleFactor, heightScaleFactor);

    const absPosX = (e.clientX - totalDragX) / sizeFactor;
    const absPosY = (e.clientY - totalDragY) / sizeFactor;

    
    
    //change
    
    
    const isInsideBounds =
        absPosX >= 570 && absPosX <= 670 && absPosY >= 600 && absPosY <= 700;

    if (isInsideBounds) {
        if (hoverSquare) {  
            const squareSize = 100; 
            hoverSquare.style.transition  = "opacity 1s"
            hoverSquare.style.display = "block"
            hoverSquare.style.width = `${squareSize}px`;
            hoverSquare.style.height = `${squareSize}px`;
            hoverSquare.style.backgroundColor = 'red';
            hoverSquare.style.position = 'fixed';
            hoverSquare.style.opacity = '1';        
            console.log(hoverSquare.style.transition)
        }

        // Calculate the position based on the background position and scale factors
        const scaledLeftPos = (600 * sizeFactor + totalDragX) ;
        const scaledTopPos = (620 * sizeFactor + totalDragY) ;

        // Position the square within the specified bounds
        hoverSquare.style.left = `${scaledLeftPos}px`;
        hoverSquare.style.top = `${scaledTopPos}px`;
    } 
    else {
        hoverSquare.style.opacity = '0';    
        hoverSquare.addEventListener('transitionend', () => {
            hoverSquare.style.display = "none";
        });          
    }


    //end of change
    
    

    // updating the coordinates at the bottom of the screen:
    const coordinatesElement = document.getElementById('coords');
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    coordinatesElement.textContent = `(${clientX - totalDragX}, ${clientY - totalDragY}), (${Math.round(absPosX)}, ${Math.round(absPosY)})`;
    } 
}


// Event listeners for ending drag - mouse and touch
document.addEventListener('mouseup', handleDragEnd);
document.addEventListener('touchend', handleDragEnd);

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

// Access dimensions after the map has loaded
mapImage.onload = function () {
    mapWidth = mapImage.width;
    mapHeight = mapImage.height;
};
