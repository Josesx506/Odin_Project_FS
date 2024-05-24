import {addProjBtn, addProjForm, addTodoBtn, deleteProjBtn} from "../utils/buttons"
import { refreshData } from "../utils/crud";

let loadHomeCss = false;

function renderProjectButtons () {
    const data = refreshData();
    const element = document.createElement("div");
    element.classList.add("projects-sidebar-cntr");

    data.forEach((proj, index) => {
        const projBtn = deleteProjBtn(proj.title);
        projBtn.dataset.id = index;
        element.appendChild(projBtn)
    });

    return element
};

function renderProjSidebar() {
    const element = renderProjectButtons();
    element.appendChild(addProjForm());

    return element;
};

function todoContainer(title,className){
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

function priorityContainers() {
    const element = document.createElement("div");
    element.classList.add("priority-containers");

    const contentCntr1 = new todoContainer("In Progress", "low");
    contentCntr1.dataset.priority = 1;
    const contentCntr2 = new todoContainer("To Do", "med");
    contentCntr2.dataset.priority = 2;

    // Test todo items - Give each item an item on load from the json
    let testTodo = document.createElement("div");
    testTodo.textContent = "Todo item 1";
    testTodo.setAttribute("draggable",true);
    testTodo.classList.add("todo-item");
    testTodo.dataset.priority = 2;
    let testTodo1 = document.createElement("div");
    testTodo1.textContent = "Todo item 2";
    testTodo1.setAttribute("draggable",true);
    testTodo1.classList.add("todo-item");
    testTodo1.dataset.priority = 2;
    contentCntr1.childNodes[1].appendChild(testTodo);
    contentCntr2.childNodes[1].appendChild(testTodo1);

    const contentCntr3 = new todoContainer("Completed", "high");
    contentCntr3.dataset.priority = 3;

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

export {renderHome};