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

    const mobileMenuOpener = document.getElementById('arrow-menu');
    const navbar = document.querySelector("#navbar-container .navbar ul");
    const mobileMenuCloser = document.querySelector("#navbar-container .navbar ul .close-navbar") 
    let isMenuTransitioning = false;

    mobileMenuOpener.addEventListener('click', openNavbarMenu);
    mobileMenuCloser.addEventListener('click', closeNavbarMenu);

    function openNavbarMenu(){
        if (!isMenuTransitioning){
            navbar.style.animation = "slideInFromRight 0.5s ease"
            navbar.style.display = "block";
            isMenuTransitioning = true;
            if (currentCardShowing.length !==0){
                currentCardShowing[0].hideMonumentCard();
            }   
        }     
    }

    function closeNavbarMenu(){
        navbar.style.animation = "slideInFromLeft 0.5s ease";
        navbar.addEventListener('animationend', onAnimationEnd, { once: true });
    }

    function onAnimationEnd() {
        navbar.style.display = "none";
        isMenuTransitioning = false;
    }
});