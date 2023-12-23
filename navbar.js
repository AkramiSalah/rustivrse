document.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const resposne = await fetch('navbar.html');
        const data = await resposne.text();
        document.getElementById('navbar-container').innerHTML = data;      
    } 
    catch(error){
        console.error("Error loading the navbar",error);
    }
    
    const navbarContainer = document.querySelector(".navbar ul");
    navbarContainer.addEventListener("mouseenter", ()=> {
        handleDragEnd();
        if (currentCardShowing.length !== 0){
            currentCardShowing[0].hideMonumentCard();     
        }
    });

    const MobileMenuOpener = document.getElementById('arrow-menu');
    const navbar = document.querySelector("#navbar-container .navbar ul");
    
    let isArrowMenuTouched = false;
    let isMenuOpen = false;
    let isMenuTransitioning = false;

    MobileMenuOpener.addEventListener('touchstart', arrowMenuTouchStart);
    MobileMenuOpener.addEventListener('touchend', arrowMenuTouchEnd);

    function arrowMenuTouchStart() {
        if(!isMenuTransitioning){
            if (isMenuOpen){
                isArrowMenuTouched = false;
            }
            else{
                isArrowMenuTouched = true;
            }  
        }            
    }

    function arrowMenuTouchEnd() {
        if (isArrowMenuTouched) {
            isArrowMenuTouched = false;
            isMenuOpen = true;
            isMenuTransitioning = true;
            navbar.style.animation = "slideInFromRight 0.5s ease"
            navbar.style.display = "block";    
        }
        else{
            navbar.style.animation = "slideInFromLeft 0.5s ease";
            navbar.addEventListener('animationend', onAnimationEnd, { once: true });
            isMenuOpen = false;
        }       
    }

    function onAnimationEnd() {
        navbar.style.display = "none";
        isMenuTransitioning = false;
    }
});