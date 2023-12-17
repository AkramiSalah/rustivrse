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
        console.log("test")
        monumentsList.forEach(mon=>{
            mon.hideMonumentCard();
        })
        // if (currentCardShowing.length !== 0){
        //     currentCardShowing[0].hideMonumentCard();      
        // }

        // why this ^^ dont work ?
    });
});