import {addProjBtn, addProjForm, addTodoBtn, deleteProjBtn} from "../utils/buttons"
import { refreshData, writeData } from "../utils/crud";

let loadHomeCss = false;

function renderProjectButtons () {
    const data = refreshData();
    const element = document.createElement("div");
    element.classList.add("projects-sidebar-cntr");

    data.forEach((proj, index) => {
        const projBtn = deleteProjBtn(proj.title, index);
        projBtn.dataset.id = index;
        if (proj.active) {
            projBtn.classList.add("selected");
        };
        element.appendChild(projBtn)
    });

    return element
};

function renderProjSidebar() {
    const element = renderProjectButtons();
    element.appendChild(addProjForm());

    return element;
};

function todoPriorityContainer(title,className){
    const header = document.createElement("div");
    header.classList.add("cntr-title");
    header.textContent = title;

    const body = document.createElement("div");
    body.classList.add(className, "cntr-body");

    const element = document.createElement("div");
    element.classList.add(className,"priority-cntr-box");
    element.appendChild(header);
    element.appendChild(body);

    return element;
};

function todoListContainer(listItem, id) {
    const todoElement = document.createElement("div");
    todoElement.textContent = listItem.title;
    todoElement.dataset.priority = parseInt(listItem.priority);
    todoElement.dataset.id = id;
    todoElement.setAttribute("draggable",true);
    todoElement.classList.add("todo-item");

    return todoElement;
}

function getActiveProject() {
    const data = refreshData();
    let selectedProj = data.filter((proj) => proj.active === true);
    if (selectedProj.length === 0) {
        const general = data.filter((proj) => proj.title === "General");
        selectedProj = general;
    };
    writeData(data);

    return selectedProj[0].items;
}

function priorityContainers() {
    const element = document.createElement("div");
    element.classList.add("priority-containers");
    
    const contentCntr1 = new todoPriorityContainer("In Progress", "low");
    contentCntr1.dataset.priority = 1;
    const contentCntr2 = new todoPriorityContainer("To Do", "med");
    contentCntr2.dataset.priority = 2;

    const contentCntr3 = new todoPriorityContainer("Completed", "high");
    contentCntr3.dataset.priority = 3;

    // Populate Priority Containers
    const priorityDict = {"1":contentCntr1,"2":contentCntr2,"3":contentCntr3,};
    const activeProjTodos = getActiveProject();
    if (activeProjTodos.length > 0) {
        activeProjTodos.forEach((todoItem, indexId) => {
            const todoElement = todoListContainer(todoItem, indexId);
            priorityDict[todoItem.priority].childNodes[1].appendChild(todoElement);
        })
    };

    element.appendChild(contentCntr1);
    element.appendChild(contentCntr2);
    element.appendChild(contentCntr3);

    return element;
};

function todoContent() {
    const element = document.createElement("div");
    element.classList.add("todo-lists");
    element.appendChild(addTodoBtn);
    element.appendChild(priorityContainers());

    return element;
};


const renderHome = function() {
    loadHomeCss = true;
    if (loadHomeCss) {
        import("../css/home.css");
    }
    const element = document.createElement("div");
    element.classList.add("content-cntr");

    element.appendChild(renderProjSidebar());
    element.appendChild(todoContent());

    loadHomeCss = false;
    return element;
};

export {getActiveProject, renderHome};