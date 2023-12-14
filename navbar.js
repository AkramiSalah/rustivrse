document.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const resposne = await fetch('navbar.html');
        const data = await resposne.text();
        document.getElementById('navbar-container').innerHTML = data;
    } 
    catch{
        console.error("Error loading the navbar",error);
    }  
});