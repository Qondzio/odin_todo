export function deleteProject(item){
    console.log(item);
    console.log(localStorage);
    
    const projects = JSON.parse(localStorage.getItem("projects"));
    console.log(projects);
    const index = projects.findIndex((project) => project.projectName === item);
    console.log(index);
    
    projects.splice(index,1);
    console.log(projects);
    
    localStorage.setItem("projects", JSON.stringify(projects));   
}