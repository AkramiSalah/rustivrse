document.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const resposne = await fetch('navbar.html');
        const data = await resposne.text();
        document.getElementById('navbar-container').innerHTML = data;
    } 
    catch(error){
        console.error("Error loading the navbar",error);
    }
    
    const container = document.querySelector(".navbar ul");
    container.addEventListener("mouseenter", ()=> {
        handleDragEnd();
        monumentsList.forEach(mon => {
            mon.hideMonumentCard();
        })
    })  
});

