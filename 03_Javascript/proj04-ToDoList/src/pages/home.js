import {addProjBtn, addTodoBtn} from "../utils/buttons"

let loadHomeCss = false;

const projSidebar = (function() {
    const element = document.createElement("div");
    element.classList.add("projects-sidebar");
    element.appendChild(addProjBtn);

    return element;
}) ();

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

const priorityContainers = (function() {
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
}) ();

const todoContent = (function() {
    const element = document.createElement("div");
    element.classList.add("todo-lists");
    element.appendChild(addTodoBtn);
    element.appendChild(priorityContainers);

    return element;
}) ();


export default  function renderHome() {
    loadHomeCss = true;
    if (loadHomeCss) {
        import("../css/home.css");
    }
    const element = document.createElement("div");
    element.textContent = "This is Todo"

    element.appendChild(projSidebar);
    element.appendChild(todoContent);

    loadHomeCss = false;
    return element;
};
