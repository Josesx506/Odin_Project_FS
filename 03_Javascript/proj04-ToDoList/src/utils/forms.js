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

function createInputFormDivs(divClass,inputId,labelText,dataKey) {
    const element = document.createElement("div");
    element.classList.add(divClass);
    element.dataset.dataKey = dataKey;

    const inputDivLabel = document.createElement("label");
    inputDivLabel.classList.add("todo-list-form-label");
    inputDivLabel.setAttribute("for",inputId);
    inputDivLabel.textContent = labelText;

    const inputDivInput = document.createElement("input");
    inputDivInput.classList.add("todo-list-form-input");
    inputDivInput.id = inputId;
    inputDivInput.required = true;
    inputDivInput.setAttribute("type","text");
    inputDivInput.setAttribute("name",inputId);

    element.appendChild(inputDivLabel);
    element.appendChild(inputDivInput);

    return element;
};

function createSelectFormDivs(divClass,optionId,labelText,optionList,dataKey) {
    const element = document.createElement("div");
    element.classList.add(divClass);
    element.dataset.dataKey = dataKey;

    const selectDivLabel = document.createElement("label");
    selectDivLabel.classList.add("todo-list-form-label");
    selectDivLabel.setAttribute("for",optionId);
    selectDivLabel.textContent = labelText;

    const selectDivInput = document.createElement("select");
    selectDivInput.classList.add("todo-list-form-select");
    selectDivInput.id = optionId;
    selectDivInput.required = true;
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

function createDateFormDivs(divClass,inputId,labelText,dataKey) {
    const element = document.createElement("div");
    element.classList.add(divClass);
    element.dataset.dataKey = dataKey;

    const inputDivLabel = document.createElement("label");
    inputDivLabel.classList.add("todo-list-form-label");
    inputDivLabel.setAttribute("for",inputId);
    inputDivLabel.textContent = labelText;

    const inputDivInput = document.createElement("input");
    inputDivInput.classList.add("todo-list-form-input");
    inputDivInput.id = inputId;
    inputDivInput.required = true;
    inputDivInput.setAttribute("type","date");
    inputDivInput.setAttribute("name",inputId);

    element.appendChild(inputDivLabel);
    element.appendChild(inputDivInput);

    return element;
};

function createTextareaFormDivs(divClass,inputId,labelText,dataKey) {
    const element = document.createElement("div");
    element.classList.add(divClass);
    element.dataset.dataKey = dataKey;

    const inputDivLabel = document.createElement("label");
    inputDivLabel.classList.add("todo-list-form-label");
    inputDivLabel.setAttribute("for",inputId);
    inputDivLabel.textContent = labelText;

    const inputDivInput = document.createElement("textarea");
    inputDivInput.classList.add("todo-list-form-input");
    inputDivInput.id = inputId;
    inputDivInput.setAttribute("maxlength",40);
    inputDivInput.setAttribute("placeholder","40 char. max");
    inputDivInput.setAttribute("name",inputId);

    element.appendChild(inputDivLabel);
    element.appendChild(inputDivInput);

    return element;
};


function createTodoListForm() {
    const element = document.createElement("form");
    element.id = "new-todo-list-entry-cntr";
    element.classList.add("modal-body");

    const data = refreshData();
    const projOptions = data.map(i => i.title);

    const titleDiv = createInputFormDivs("todo-list-entry-input","todo-list-title","Title","title");
    const descriptionDiv = createInputFormDivs("todo-list-entry-input","todo-list-description","Description","description");
    const projectsDiv = createSelectFormDivs("todo-list-entry-input","todo-list-projects","Project",projOptions,"proj-title");
    const priorityDiv = createSelectFormDivs("todo-list-entry-input","todo-list-priority","Priority",[1,2,3],"priority");
    priorityDiv.childNodes[1].childNodes[1].selected = true;
    const dateDiv = createDateFormDivs("todo-list-entry-input","todo-list-date","Date","dueDate");
    const noteDiv = createTextareaFormDivs("todo-list-entry-input","todo-list-notes","Notes","notes");
    const submit = document.createElement("input");
    submit.id = "todo-list-form-submit";
    submit.classList.add("clickable-btn");
    submit.setAttribute("type","submit");

    element.appendChild(titleDiv);
    element.appendChild(descriptionDiv);
    element.appendChild(projectsDiv);
    element.appendChild(priorityDiv);
    element.appendChild(dateDiv);
    element.appendChild(noteDiv);
    element.appendChild(submit);

    return element;
};

export { addProjForm, createTodoListForm }