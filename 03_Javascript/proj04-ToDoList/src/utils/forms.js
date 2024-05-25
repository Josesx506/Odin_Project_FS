import { refreshData } from "./crud";

function addProjForm(){
    // 10:46 for checkboxes
    const element = document.createElement("div");
    element.classList.add("add-project","clickable-btn");

    const form = document.createElement("form");
    form.classList.add("new-project-form");
    
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-folder-plus");
    const input = document.createElement("input");
    input.setAttribute("type","text");
    input.classList.add("new-project-entry");
    input.id = "new-project-entry";
    input.setAttribute("name","new-project-entry");
    input.setAttribute("placeholder","create project");
    input.setAttribute("aria-label","create project");

    form.appendChild(input);

    element.appendChild(form);
    element.appendChild(icon);

    return element;
};

function createInputFormDivs(divClass,inputId,labelText) {
    const element = document.createElement("div");
    element.classList.add(divClass);

    const inputDivLabel = document.createElement("label");
    inputDivLabel.classList.add("todo-list-form-label");
    inputDivLabel.setAttribute("for",inputId);
    inputDivLabel.textContent = labelText;

    const inputDivInput = document.createElement("input");
    inputDivInput.classList.add("todo-list-form-input");
    inputDivInput.id = inputId;
    inputDivInput.setAttribute("type","text");
    inputDivInput.setAttribute("name",inputId);

    element.appendChild(inputDivLabel);
    element.appendChild(inputDivInput);

    return element;
};

function createSelectFormDivs(divClass,optionId,labelText,optionList) {
    const element = document.createElement("div");
    element.classList.add(divClass);

    const selectDivLabel = document.createElement("label");
    selectDivLabel.classList.add("todo-list-form-label");
    selectDivLabel.setAttribute("for",optionId);
    selectDivLabel.textContent = labelText;

    const selectDivInput = document.createElement("select");
    selectDivInput.classList.add("todo-list-form-select");
    selectDivInput.id = optionId;
    selectDivInput.setAttribute("name",optionId);
    optionList.forEach((option) => {
        let optionElement = document.createElement("option");
        optionElement.textContent = option;
        selectDivInput.appendChild(optionElement);
    });

    element.appendChild(selectDivLabel);
    element.appendChild(selectDivInput);

    return element;
};

function createDateFormDivs(divClass,inputId,labelText) {
    const element = document.createElement("div");
    element.classList.add(divClass);

    const inputDivLabel = document.createElement("label");
    inputDivLabel.classList.add("todo-list-form-label");
    inputDivLabel.setAttribute("for",inputId);
    inputDivLabel.textContent = labelText;

    const inputDivInput = document.createElement("input");
    inputDivInput.classList.add("todo-list-form-input");
    inputDivInput.id = inputId;
    inputDivInput.setAttribute("type","date");
    inputDivInput.setAttribute("name",inputId);

    element.appendChild(inputDivLabel);
    element.appendChild(inputDivInput);

    return element;
};

function createTextareaFormDivs(divClass,inputId,labelText) {
    const element = document.createElement("div");
    element.classList.add(divClass);

    const inputDivLabel = document.createElement("label");
    inputDivLabel.classList.add("todo-list-form-label");
    inputDivLabel.setAttribute("for",inputId);
    inputDivLabel.textContent = labelText;

    const inputDivInput = document.createElement("textarea");
    inputDivInput.classList.add("todo-list-form-input");
    inputDivInput.id = inputId;
    inputDivInput.setAttribute("maxlength",40);
    inputDivInput.setAttribute("name",inputId);

    element.appendChild(inputDivLabel);
    element.appendChild(inputDivInput);

    return element;
};


function createTodoListForm() {
    const element = document.createElement("form");
    element.classList.add("new-todo-list-entry-cntr");

    const data = refreshData();
    const projOptions = data.map(i => i.title);

    const titleDiv = createInputFormDivs("todo-list-entry-input","todo-list-title","Title");
    const descriptionDiv = createInputFormDivs("todo-list-entry-input","todo-list-description","Description");
    const projectsDiv = createSelectFormDivs("todo-list-entry-input","todo-list-projects","Project",projOptions);
    const priorityDiv = createSelectFormDivs("todo-list-entry-input","todo-list-priority","Priority",[1,2,3]);
    const dateDiv = createDateFormDivs("todo-list-entry-input","todo-list-date","Date");
    const noteDiv = createTextareaFormDivs("todo-list-entry-input","todo-list-notes","Notes");

    element.appendChild(titleDiv);
    element.appendChild(descriptionDiv);
    element.appendChild(projectsDiv);
    element.appendChild(priorityDiv);
    element.appendChild(dateDiv);
    element.appendChild(noteDiv);

    return element;
};

export { addProjForm, createTodoListForm }