export function deleteProject(item){
    const projects = JSON.parse(localStorage.getItem("projects"));
    const index = projects.findIndex((project) => project.projectName === item);
    projects.splice(index,1);
    localStorage.setItem("projects", JSON.stringify(projects));   
}