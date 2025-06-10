import "./styles.css"
import addProject from "./project.js"
import { loadProjects } from "./project_load.js";
import {tasks} from "./tasks.js";

//This adds a function to our website to click on hamburger which opens up left sidebar.
const hamburger=document.getElementById("hamburger_menu");
hamburger.addEventListener('click', ()=>{
    const leftDiv=document.querySelector(".main_left");
    leftDiv.classList.toggle("main_left_active");
})


//Opens a "<dialog>" to create a Project
const addProjectButton=document.getElementById("add_project");
addProjectButton.onclick=()=>addProject();

//Load stored Projects immediately after opening website
if(localStorage.length!==0){
    loadProjects();
}

//Opens a <dialog> to create a Task for selected Project
const add_task_div=document.querySelector(".main_add_task");
add_task_div.addEventListener('click', ()=>{
    tasks.addTaskDialog();
})