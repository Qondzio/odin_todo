import image_edit from "./images/edit.svg";
import image_delete from "./images/delete.svg";
import image_x from "./images/x.svg";


function createTask(title,date,priority,description){
    const finished=false;
    return {title,date,priority,description,finished}
}
export const tasks={
    updateTitle(item){
        const h2=document.getElementById("project_title");
        h2.textContent='Project name: ';

        const h2Project=document.getElementById("h2_project_name");
        h2Project.textContent=item.projectName;

        const main=document.querySelector(".main_add_task");
        main.style.display="flex";
    },
    addTaskDialog(){
        const dialog=document.createElement("dialog");

        const h3=document.createElement("h3");
        h3.textContent="Add a new Task";

        const div1=document.createElement("div");
        div1.classList.add("dialog_inputs");
        const input_title=document.createElement("input");
        input_title.type="text";
        input_title.placeholder="Title";
        input_title.name="title";
        input_title.id="title";
        input_title.size="35";
        input_title.maxlength="30";
        input_title.required=true;

        const input_date=document.createElement("input");
        input_date.type="date";
        input_date.name="date";
        input_date.id="date";
        input_date.required=true;

        const select=document.createElement("select");
        select.id="select";
        const option_low=document.createElement("option");
        option_low.value="low";
        option_low.textContent="Low";
        const option_medium=document.createElement("option");
        option_medium.value="medium";
        option_medium.textContent="Medium";
        const option_high=document.createElement("option");
        option_high.value="high";
        option_high.textContent="High";

        const textarea=document.createElement("textarea");
        textarea.name="description";
        textarea.id="description";
        textarea.placeholder="Description";
        textarea.rows="7";

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

        select.append(option_low, option_medium, option_high);
        div1.append(input_title, input_date, select, textarea);
        dialogButtonsDiv.append(submitButton,cancelButton);
        dialog.append(h3, div1, dialogButtonsDiv);
        document.body.append(dialog);

        dialog.showModal();


        cancelButton.onclick=()=>{
            dialog.close();
            document.body.removeChild(dialog);
        }

        submitButton.onclick=()=>{
            const task=createTask(input_title.value, input_date.value, select.value, textarea.value);
            this.addTask(task);   
            dialog.close();
            document.body.removeChild(dialog);
        }
    },
    addTask(task){
        const projects=JSON.parse(localStorage.getItem("projects"));
        const index=projects.findIndex((item)=>item.projectName === document.getElementById("h2_project_name").textContent);
        projects[index].tasks.push(task);
        localStorage.setItem("projects", JSON.stringify(projects));
        this.displayTasks();
    },
    displayTasks(){
        
        const main=document.querySelector(".main_tasks");
        main.innerHTML="";
        
        const projects=JSON.parse(localStorage.getItem("projects"));
        const index=projects.findIndex((item)=>item.projectName === document.getElementById("h2_project_name").textContent);

        projects[index].tasks.forEach((element, task_index) => {
            
            const div=document.createElement("div");
            
            if(element.priority==='low'){div.style.borderLeft="10px solid green"}
            else if(element.priority==='medium'){div.style.borderLeft="10px solid orange"};
            const span=document.createElement("span");
            span.classList.add("task_info_left");

            const span2=document.createElement("span");
            if(element.finished===true){
                span2.classList.add("checked");
                div.classList.add("task_checked");
            }
            else{
                span2.classList.add("unchecked");
                div.classList.add("task");
            }

            const h4=document.createElement("h4");
            h4.textContent=element.title;

            const span3=document.createElement("span");
            span3.classList.add("task_info_right");

            const img_edit=document.createElement("img");
            img_edit.src=image_edit;
            img_edit.alt="edit_task";
            img_edit.width=25;
            img_edit.height=25;

            const img_delete=document.createElement("img");
            img_delete.src=image_delete;
            img_delete.alt="delete_task";
            img_delete.width=25;
            img_delete.height=25;

            span.append(span2,h4);
            span3.append(img_edit,img_delete);
            div.append(span,span3);
            main.appendChild(div);

            div.addEventListener('click', ()=>this.displayDescription(element.description));

            span2.addEventListener('click', (event)=>{
                this.finishTask(task_index);
                event.stopPropagation();
            })
            
            img_edit.addEventListener('click', (event)=>{
                event.stopPropagation();
                this.editTask(element,task_index);
                
            })

            img_delete.addEventListener('click', (event)=>{
                event.stopPropagation();
                this.deleteTask(element, task_index);
            })
        });
    },
    displayDescription(item){
        const dialog=document.createElement("dialog");
        dialog.classList.add("dialog_description");
        const h3=document.createElement("h3");
        h3.textContent="Description";

        const x=document.createElement("img");
        x.src=image_x;
        x.width=40;
        x.height=30;
        x.classList.add("image_x");

        const p=document.createElement("p");
        p.textContent=item;

        dialog.append(h3,x,p);
        document.body.append(dialog);
        dialog.showModal();

        x.addEventListener('click', ()=>{
            dialog.close();
            document.body.removeChild(dialog);
        })
    },
    finishTask(task_index){
        const projects=JSON.parse(localStorage.getItem("projects"));
        const index=projects.findIndex((item)=>item.projectName === document.getElementById("h2_project_name").textContent);
        if(projects[index].tasks[task_index].finished===false){
            projects[index].tasks[task_index].finished=true;
        }
        else {
            projects[index].tasks[task_index].finished=false;
        }
        localStorage.setItem("projects", JSON.stringify(projects));

        this.displayTasks();
        
    },
    editTask(element, taskIndex){        
        const dialog=document.createElement("dialog");

        const h3=document.createElement("h3");
        h3.textContent="Edit Task";

        const div1=document.createElement("div");
        div1.classList.add("dialog_inputs");
        const input_title=document.createElement("input");
        input_title.type="text";
        input_title.name="title";
        input_title.id="title";
        input_title.size="35";
        input_title.maxlength="30";
        input_title.required=true;
        input_title.value=element.title;

        const input_date=document.createElement("input");
        input_date.type="date";
        input_date.name="date";
        input_date.id="date";
        input_date.required=true;
        input_date.value=element.date;

        const select=document.createElement("select");
        select.id="select";
        const option_low=document.createElement("option");
        option_low.value="low";
        option_low.textContent="Low";
        const option_medium=document.createElement("option");
        option_medium.value="medium";
        option_medium.textContent="Medium";
        const option_high=document.createElement("option");
        option_high.value="high";
        option_high.textContent="High";
        switch (element.priority) {
            case 'low':
                option_low.selected=true;
                break;
            case 'medium':
                option_medium.selected=true;
                break;
            case 'high':
                option_high.selected=true;
                break;
        }

        const textarea=document.createElement("textarea");
        textarea.name="description";
        textarea.id="description";
        textarea.placeholder="Description";
        textarea.rows="7";
        textarea.value=element.description;

        const dialogButtonsDiv=document.createElement("div");
        dialogButtonsDiv.classList.add("dialog_buttons");
        const submitButton=document.createElement("button");
        submitButton.classList.add("submit_button");
        submitButton.id="submit";
        submitButton.textContent="Save changes";
        submitButton.style.backgroundColor="green";
        const cancelButton=document.createElement("button");
        cancelButton.classList.add("cancel_button");
        cancelButton.id="cancel";
        cancelButton.textContent="Cancel";

        select.append(option_low, option_medium, option_high);
        div1.append(input_title, input_date, select, textarea);
        dialogButtonsDiv.append(submitButton,cancelButton);
        dialog.append(h3, div1, dialogButtonsDiv);
        document.body.append(dialog);

        dialog.showModal();

        cancelButton.onclick=()=>{
            dialog.close();
            document.body.removeChild(dialog);
        }

        submitButton.onclick=()=>{            
            const projects=JSON.parse(localStorage.getItem("projects"));
            const projectIndex=projects.findIndex((item)=>item.projectName === document.getElementById("h2_project_name").textContent);
            
            projects[projectIndex].tasks[taskIndex]=createTask(input_title.value, input_date.value, select.value, textarea.value);
            
            localStorage.setItem("projects", JSON.stringify(projects));
            this.displayTasks();

            dialog.close();
            document.body.removeChild(dialog);
        }
    },
    deleteTask(task_index){
        const projects=JSON.parse(localStorage.getItem("projects"));
        const projectIndex=projects.findIndex((item)=>item.projectName === document.getElementById("h2_project_name").textContent);

        projects[projectIndex].tasks.splice(task_index,1);
        localStorage.setItem("projects", JSON.stringify(projects));
        this.displayTasks();
    }
}