const monumentsList = [
    new Monument(925, 537, 55, "Outpost", true, 0, false, false, true),
    new Monument(532, 810, 85, "Launch Site", false, 30, true, true, true),
    new Monument(481, 350, 40, "Abandoned Military Base", false, 30, true, true, true),
    new Monument(760, 1170, 55, "Airfield", false, 30, true, false, true),
    new Monument(988, 330, 50, "Train Yard", false, 30, true, false, true),
    new Monument(807, 189, 50, "Sewer Branch", false, 30, true, false, true),
    new Monument(222, 343, 40, "Missle Silo", false, 30, true, true, true),
    new Monument(181, 664, 50, "Giant Excavator", false, 30, true, true, true),
    new Monument(571, 602, 40, "Military Tunnels", false, 30, true, true, true),
    new Monument(996, 765, 40, "Water Treatment", false, 30, true, false, true),
    new Monument(1296, 836, 40, "Small Harbour", false, 30, true, false, true),
    new Monument(920, 1046, 35, "Arctic Reaserch Base", false, 30, true, true, true),
    new Monument(585, 1160, 35, "Satellite Dish", false, 30, true, false, true),
    new Monument(308, 1102, 35, "Power Plant", false, 30, true, false, true),
    new Monument(695, 900, 35, "Bandit Camp", true, 30, true, false, true),
    new Monument(1270, 220, 35, "Harbour", false, 30, true, false, true),
    new Monument(1060, 95, 35, "Ferry Terminal", false, 30, true, false, true),
    new Monument(735, 700, 20, "Dome", false, 30, true, false, true),
    new Monument(1100, 1240, 40, "Junkyard", false, 30, true, false, true),
    new Monument(1277, 1173, 15, "Lighthouse", false, 30, true, false, true),
    new Monument(152, 945, 15, "Fishing Village", false, 30, true, false, true),
    new Monument(1159, 950, 20, "Mining Outpost", false, 30, true, false, true),
    new Monument(372, 496, 20, "Abandoned Supermarket", false, 30, true, false, true),
    new Monument(745, 470, 40, "Large Barn", false, 30, true, false, true),
    new Monument(1165, 480, 30, "Ranch", false, 30, true, false, true),
    new Monument(1316, -29, 20, "Large Oil Rig", false, 30, true, true, true),
    new Monument(185, -29, 20, "Small Oil Rig", false, 30, true, true, true),
    new Monument(707, -29, 20, "Underwater Labs", false, 30, true, true, true),
    new Monument(680, 362, 15, "Oxum's Gas Station", false, 30, true, true, true)
];

const currentCardShowing = [];
const map = document.querySelector(".map");
const monumentCards = document.querySelectorAll(".monument");
const coordinatesElement = document.getElementById('coords');
const cardCloseButton = document.querySelectorAll('.monument .monument-name i')

let isDragging = false;
let isHoveringOverCard = false;
let isFadingIn = false;
// let isScreenSmall = false; - not in use atm.

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
    map.style.cursor = "grabbing";

    if (e.type === 'mousedown') {
        startPointX = e.clientX;
        startPointY = e.clientY;
    } else if (e.type === 'touchstart') {
        startPointX = e.touches[0].clientX;
        startPointY = e.touches[0].clientY;
    }                 
}

// Event listeners for drag move - mouse and touch
map.addEventListener('mousemove', handleDragMove);
map.addEventListener('touchmove', handleDragMove);

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
        
        monumentsList.forEach(mon =>{
            mon.hideMonumentCard();
        });
    }
    else{
        handleMapHover(e);     
    }
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


map.addEventListener('click',handleMonumentClick);

function handleMonumentClick(e) { 
    for (const monument of monumentsList) {
        if (monument.isInsideBounds(e.clientX, e.clientY) && e.buttons === 0) {
            if (currentCardShowing.length === 0){
                monument.showMonumentCard();
                currentCardShowing.push(monument);
            }
            else if((currentCardShowing.length === 1 && currentCardShowing[0] != monument))
            {
                currentCardShowing[0].hideMonumentCard();
                currentCardShowing.pop();
                currentCardShowing.push(monument);
                monument.showMonumentCard();                          
            } 
            map.style.cursor = "default";         
        } 
        else {  
            if (!isHoveringOverCard){
                monument.hideMonumentCard();
                currentCardShowing.pop();
            }                           
        }
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
const imageUrl = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
const mapImage = new Image();
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

    // aligning monuments if window is rezised    
    monumentsList.forEach(monument =>{
        monument.alignMonumentCard();
    });  

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
        map.style.cursor = "default"; 
    })
})

monumentCards.forEach(card =>{
    card.addEventListener('mouseleave',()=>{
        isHoveringOverCard = false;   
        map.style.cursor = "move";  
    })
})

cardCloseButton.forEach(btn=>{
    btn.addEventListener('click',()=>{
        monumentsList.forEach(mon=>{
            mon.hideMonumentCard();
        })
    })
});