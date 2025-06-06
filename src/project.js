import "./project_load.js";
import { loadProjects } from "./project_load.js";

function createProject(projectName){
    const tasks=[];
    return {projectName, tasks}
}

export default function addProject(){
    const body=document.querySelector("body");
    const dialog=document.createElement("dialog");
    dialog.id="project_dialog";
    
    const h3=document.createElement("h3");
    h3.textContent="Add a new Project";

    const dialogInputsDiv=document.createElement("div");
    dialogInputsDiv.classList.add("dialog_inputs");
    const input=document.createElement("input");
    input.type="text";
    input.placeholder="Project name";
    input.name="projectName";
    input.id="projectName";
    input.size="35";
    input.maxLength="30";
    input.required=true;
    dialogInputsDiv.appendChild(input);

    const dialogButtonsDiv=document.createElement("div");
    dialogButtonsDiv.classList.add("dialog_buttons");
    const submitButton=document.createElement("button");
    submitButton.classList.add("submit_button");
    submitButton.id="submit";
    submitButton.textContent="Submit";
    const cancelButton=document.createElement("button");
    cancelButton.classList.add("cancel_button");
    cancelButton.id="cancel";
    cancelButton.textContent="Cancel";

    dialogButtonsDiv.append(submitButton,cancelButton);
    dialog.append(h3, dialogInputsDiv, dialogButtonsDiv);
    body.appendChild(dialog);
    
    dialog.showModal();

    cancelButton.onclick=()=>{
        dialog.close();
        body.removeChild(dialog);
    }
    
    submitButton.onclick=()=>{
        if(input.value===""){
            alert("Name of the Project cannot be empty!");
            return
        }
        if(localStorage.length===0)
        {
            localStorage.setItem("projects", "[]");
        }
        const projects=JSON.parse(localStorage.getItem("projects"));
        projects.push(createProject(input.value));
        localStorage.setItem("projects", JSON.stringify(projects));
        loadProjects();
        dialog.close();
        body.removeChild(dialog);
        
        
    }
}