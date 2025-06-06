import deleteIcon from "./images/delete.svg";
import flagIcon from "./images/flag.svg";
import {deleteProject} from "./delete_project.js"


export const loadProjects=function(){
    const main=document.querySelector(".main_projects");
    main.innerHTML="";
    const projects=JSON.parse(localStorage.getItem("projects"));

    projects.forEach((item)=>{
        const div=document.createElement("div");
        div.classList.add("project");

        const spanLeft=document.createElement("span");
        spanLeft.classList.add("left");
        const img1=document.createElement("img");
        img1.src=flagIcon;
        img1.alt="task_flag";
        img1.width=23;
        img1.height=23;
        const h3=document.createElement("h3");
        h3.textContent=item.projectName;

        const spanRight=document.createElement("span");
        spanRight.classList.add("right");
        const img2=document.createElement("img");
        img2.src=deleteIcon;
        img2.alt="trash_can";
        img2.width=23;
        img2.height=23;
        img2.id="delete_icon";

        spanLeft.append(img1,h3);
        spanRight.appendChild(img2);
        div.append(spanLeft,spanRight);
        main.appendChild(div);

        img2.addEventListener('click', ()=>{
            deleteProject(item.projectName);
            loadProjects();
        })
    })
     
};