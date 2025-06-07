export const tasks={
    updateTitle(item){
        const h2=document.getElementById("project_title");
        h2.textContent='Project name: ';

        const h2Project=document.getElementById("h2_project_name");
        h2Project.textContent=item.projectName;
    }
}