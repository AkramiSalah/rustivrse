const monumentsList = [
    new Monument(925, 537, 52, "Outpost", 'v', 0, 'x', 'x', 'v'),
    new Monument(532, 810, 85, "Launch Site", 'x', 30, 'v', 'v', 'v'),
    new Monument(481, 350, 40, "Abandoned Military Base", 'x', 30, 'v', 'v', 'v'),
    new Monument(760, 1170, 55, "Airfield", 'x', 30, 'v', 'x', 'v'),
    new Monument(988, 330, 50, "Train Yard", 'x', 30, 'v', 'x', 'v'),
    new Monument(807, 189, 50, "Sewer Branch", 'x', 30, 'v', 'x', 'v'),
    new Monument(222, 343, 40, "Missile Silo", 'x', 30, 'v', 'v', 'v'),
    new Monument(188, 665, 50, "Giant Excavator", 'x', 30, 'v', 'v', 'x'),
    new Monument(571, 602, 40, "Military Tunnels", 'x', 30, 'v', 'v', 'v'),
    new Monument(996, 765, 40, "Water Treatment", 'x', 30, 'v', 'x', 'v'),
    new Monument(1296, 836, 40, "Small Harbour", 'x', 0, 'v', 'x', 'v'),
    new Monument(920, 1046, 35, "Arctic Research Base", 'x', 30, 'v', 'v', 'v'),
    new Monument(595, 1170, 35, "Satellite Dish", 'x', 30, 'v', 'x', 'v'),
    new Monument(308, 1102, 45, "Power Plant", 'x', 30, 'v', 'x', 'v'),
    new Monument(695, 900, 38, "Bandit Camp", 'v', 0, 'x', 'x', 'v'),
    new Monument(1270, 220, 35, "Harbour", 'x', 0, 'v', 'x', 'v'),
    new Monument(1060, 95, 35, "Ferry Terminal", 'x', 0, 'v', 'x', 'v'),
    new Monument(735, 700, 35, "Dome", 'x', 30, 'x', 'x', 'x'),
    new Monument(1094, 1242, 40, "Junkyard", 'x', 0, 'v', 'x', 'v'),
    new Monument(1277, 1173, 35, "Lighthouse", 'x', 0, 'x', 'x', 'v'),
    new Monument(152, 945, 35, "Fishing Village", 'v', 0, 'x', 'x', 'x'),
    new Monument(1159, 950, 35, "Mining Outpost", 'x', 0, 'x', 'x', 'v'),
    new Monument(382, 456, 40, "Abandoned Supermarket", 'x', 0, 'x', 'x', 'v'),
    new Monument(745, 470, 40, "Large Barn", 'v', 0, 'x', 'x', 'x'),
    new Monument(1165, 480, 35, "Ranch", 'v', 0, 'x', 'x', 'x'),
    new Monument(1362, 60, 35, "Large Oil Rig", 'x', 0, 'v', 'v', 'x'),
    new Monument(66, 60, 35, "Small Oil Rig", 'x', 0, 'v', 'v', 'x'),
    new Monument(46, 1236, 35, "Underwater Labs", 'x', 0, 'v', 'v', 'x'),
    new Monument(863, 908, 35, "Oxum's Gas Station", 'x', 0, 'x', 'x', 'v'),
    new Monument(1182, 642, 35, "Abandoned Cabins", 'x', 0, 'x', 'x', 'x')
];


const currentCardShowing = [];
const map = document.querySelector(".map");
const coordinatesElement = document.getElementById('coords');

let isAtLeftEdge = false;
let isAtTopEdge = false;
let isDragging = false;
let isFadingIn = false;
let isInsideCard = false;
let isMenuTransitioning = false;
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
        const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

        const deltaX = clientX - startPointX - currentDragX;
        const deltaY = clientY - startPointY - currentDragY;

        const currentX = parseFloat(getComputedStyle(map).backgroundPositionX);
        const currentY = parseFloat(getComputedStyle(map).backgroundPositionY);

        const newX = currentX + deltaX;
        const newY = currentY + deltaY;
        
        if (newX <= 500 && newX >= -500) {
            isAtLeftEdge = false;
            map.style.backgroundPositionX = `${newX}px`;
            currentDragX += deltaX;
        }
        else{
            isAtLeftEdge = true;
        }

        if (newY <= 500 && newY >= -1400) {
            isAtTopEdge = false;
            map.style.backgroundPositionY = `${newY}px`;
            currentDragY += deltaY;
        }
        else{
            isAtTopEdge = true;
        }

        if (currentCardShowing.length === 1){
            currentCardShowing[0].hideMonumentCard();
        }

        monumentsList.forEach(mon => {
            mon.alignMonumentCard();
            updateMonumentIconPosition(mon, deltaX, deltaY);     
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
async function handleMonumentClick(e) {
    for (let monument of monumentsList) {
      if (monument.isInsideBounds(e.clientX, e.clientY) && !isInsideCard) {
        if (currentCardShowing.length === 0) {
          currentCardShowing.push(monument);
          await currentCardShowing[0].showMonumentCard();
        }
        else {
          await currentCardShowing[0].hideMonumentCard();
          currentCardShowing.push(monument);
          await currentCardShowing[0].showMonumentCard();
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
    }
    if (!isInsideCard){
        map.style.cursor = "move";
    }
    if (isInsideCard){
        map.style.cursor = "default";
    }
}



// Determining map height and width:
const backgroundImage = getComputedStyle(document.querySelector('.map')).backgroundImage;
const imageUrl = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
const mapImage = new Image();
mapImage.src = imageUrl;

// Access dimensions after the map has loaded or window resized
mapImage.onload = calcSizeFactor;
window.addEventListener('resize', calcSizeFactor);

function calcSizeFactor() {   
    mapWidth = mapImage.width;
    mapHeight = mapImage.height;

    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    let widthScaleFactor = screenWidth / mapWidth;
    let heightScaleFactor = screenHeight / mapHeight;

    sizeFactor = Math.max(widthScaleFactor, heightScaleFactor);

    // aligning current monument if window is rezised
    if (currentCardShowing.length === 1){
        currentCardShowing[0].alignMonumentCard();
    }  

    // creating monument icons when loading map or when window is rezised
    createMonumentIcons();   
}


function createMonumentIcons(){
    monumentsList.forEach((mon) => {

    const monIcon = document.getElementById(mon.monumentName + "icon");
    if (monIcon)
        monIcon.remove();

    const monumentImage = document.createElement('img');
    monumentImage.id = `${mon.monumentName + "icon"}`;
    monumentImage.classList.add('monument-icon');
    monumentImage.src = `images/Icons/MapIcons/${mon.monumentName}.png`;
    const { left, top } = mon.calculateScaledPosition();
    monumentImage.style.left = `${left}px`;
    monumentImage.style.top = `${top}px`;
    document.querySelector(".monument-icons-container").appendChild(monumentImage);
    });
}

function updateMonumentIconPosition(mon, deltaX, deltaY){
    const monumentIcon = document.getElementById(mon.monumentName + "icon");
    const currentLeft = parseFloat(getComputedStyle(monumentIcon).left);
    const currentTop = parseFloat(getComputedStyle(monumentIcon).top);
    if (!isAtLeftEdge)
        monumentIcon.style.left = `${currentLeft + deltaX}px`;
    if (!isAtTopEdge)
        monumentIcon.style.top = `${currentTop + deltaY}px`;
}