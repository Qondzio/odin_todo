import "./styles.css"

const hamburger=document.getElementById("hamburger_menu");

hamburger.addEventListener('click', ()=>{
    const leftDiv=document.querySelector(".main_left");
    leftDiv.classList.toggle("main_left_active");
})