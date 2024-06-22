const handleMonumentIconClick = async (e) => {
    let clickedMon;
    monumentsList.forEach(mon => {
        if (mon.monumentName === e.target.ariaDescription) {
            clickedMon = mon;
            return;
        }
    });
    if (!isInsideCard) {
        if (currentCardShowing.length !== 0) await currentCardShowing[0].hideMonumentCard();                 
        currentCardShowing.push(clickedMon);
        currentCardShowing[0].showMonumentCard();
    }
}

function createMonumentIcons(){
    monumentsList.forEach((mon) => {
        const monIcon = document.getElementById(mon.monumentName + "icon");
        if (monIcon) monIcon.remove();
        
        const monumentImage = document.createElement('img');
        monumentImage.id = `${mon.monumentName + "icon"}`;
        monumentImage.ariaDescription = mon.monumentName;
        monumentImage.classList.add('monument-icon');
        monumentImage.src = `images/Icons/MapIcons/${mon.monumentName}.png`;
        const { left, top } = mon.calculateScaledPosition();
        monumentImage.style.left = `${left}px`;
        monumentImage.style.top = `${top}px`;
        document.querySelector(".monument-icons-container").appendChild(monumentImage);
        monumentImage.addEventListener('click', handleMonumentIconClick);
    });
}

function updateMonumentIconPosition(mon, deltaX, deltaY){
    const monumentIcon = document.getElementById(mon.monumentName + "icon");
    const currentLeft = parseFloat(getComputedStyle(monumentIcon).left);
    const currentTop = parseFloat(getComputedStyle(monumentIcon).top);
    if (!isAtLeftEdge) monumentIcon.style.left = `${currentLeft + deltaX}px`;      
    if (!isAtTopEdge) monumentIcon.style.top = `${currentTop + deltaY}px`;      
}