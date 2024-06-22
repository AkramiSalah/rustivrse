let mapWidth = 0;
let mapHeight = 0;
let sizeFactor = 0;

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