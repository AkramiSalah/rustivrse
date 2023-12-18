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
        if (currentCardShowing.length === 1){
            currentCardShowing[0].hideMonumentCard();      
        }
    });
});