export function deleteProject(item){
    const projects = JSON.parse(localStorage.getItem("projects"));
    const index = projects.findIndex((project) => project.projectName === item);
    projects.splice(index,1);
    localStorage.setItem("projects", JSON.stringify(projects));

    const h2=document.getElementById("project_title");
    h2.textContent="Please select a Project from the left side or create a new one.";
    const h2Project=document.getElementById("h2_project_name");
    h2Project.textContent="";
    const main=document.querySelector(".main_add_task");
    main.style.display="none";
    document.querySelector(".main_tasks").innerHTML="";
}