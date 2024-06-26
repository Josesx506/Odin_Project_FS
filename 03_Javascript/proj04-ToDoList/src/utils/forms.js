import { refreshData } from "./crud";

function addProjForm(){
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
    input.setAttribute("maxlength","20");
    input.setAttribute("name","new-project-entry");
    input.setAttribute("placeholder","create project");
    input.setAttribute("aria-label","create project");

    form.appendChild(input);

    element.appendChild(form);
    element.appendChild(icon);

    return element;
};

function createInputFormDivs(divClass,inputId,labelText,dataKey,maxlen=null) {
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
    if (maxlen !== null) {
        inputDivInput.setAttribute("maxlength",maxlen);
        inputDivInput.setAttribute("placeholder",`${maxlen} char. max`);
    }
        

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
    inputDivInput.setAttribute("maxlength",50);
    inputDivInput.setAttribute("placeholder","50 char. max");
    inputDivInput.setAttribute("name",inputId);

    element.appendChild(inputDivLabel);
    element.appendChild(inputDivInput);

    return element;
};


function createTodoListForm() {
    const element = document.createElement("form");
    element.id = "new-todo-list-entry-cntr";
    element.classList.add("modal-body");

    const data = refreshData(false);
    const activeProjIdx = data.findIndex((proj) => proj.active === true);
    const projOptions = data.map(i => i.title);

    const titleDiv = createInputFormDivs("todo-list-entry-input","todo-list-title","Title","title",20);
    const descriptionDiv = createInputFormDivs("todo-list-entry-input","todo-list-description","Description","description");
    const projectsDiv = createSelectFormDivs("todo-list-entry-input","todo-list-projects","Project",projOptions,"proj-title");
    projectsDiv.childNodes[1].childNodes[activeProjIdx].selected = true;
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

function editTodoListForm(projTitle, todoItem) {
    const form = createTodoListForm();
    form.childNodes.forEach((inputdiv) => {
        let key = inputdiv.dataset.dataKey;
        if (key === "proj-title") {
            inputdiv.childNodes[1].value = projTitle;
        } else if (key === "dueDate") {
            inputdiv.childNodes[1].value = todoItem[key].toISOString().split("T")[0];
        } else if (key !== null && key != undefined) {
            inputdiv.childNodes[1].value = todoItem[key];
        };
    });
    return form;
};

function expandTodoView(todoItem) {
    const element = document.createElement("div");
    element.classList.add("expanded-todo-item");

    const descriptionCntr = document.createElement("div");
    descriptionCntr.classList.add("expanded-todo-field-cntr","description");
    const descriptionLabel = document.createElement("div");
    descriptionLabel.classList.add("expanded-todo-label");
    descriptionLabel.textContent = "Description";
    const description = document.createElement("div");
    description.classList.add("expanded-todo-description");
    description.textContent = todoItem.description;

    descriptionCntr.appendChild(descriptionLabel);
    descriptionCntr.appendChild(description);

    const notesCntr = document.createElement("div");
    notesCntr.classList.add("expanded-todo-field-cntr","notes");
    const notesLabel = document.createElement("div");
    notesLabel.classList.add("expanded-todo-label");
    notesLabel.textContent = "Notes";
    const notes = document.createElement("div");
    notes.classList.add("expanded-todo-notes");
    notes.textContent = todoItem.notes;
    
    notesCntr.appendChild(notesLabel);
    notesCntr.appendChild(notes);

    const datesCntr = document.createElement("div");
    datesCntr.classList.add("expanded-todo-field-cntr","date");
    const datesLabel = document.createElement("div");
    datesLabel.classList.add("expanded-todo-label");
    datesLabel.textContent = "Date:";
    const dates = document.createElement("div");
    dates.classList.add("expanded-todo-dates");
    dates.textContent = todoItem.dueDate.toISOString().split("T")[0];
    
    datesCntr.appendChild(datesLabel);
    datesCntr.appendChild(dates);

    const priorityCntr = document.createElement("div");
    priorityCntr.classList.add("expanded-todo-field-cntr","priority");
    const priorityLabel = document.createElement("div");
    priorityLabel.classList.add("expanded-todo-label");
    priorityLabel.textContent = "Priority:";
    const priority = document.createElement("div");
    priority.classList.add("expanded-todo-dates");
    priority.textContent = todoItem.priority;
    
    priorityCntr.appendChild(priorityLabel);
    priorityCntr.appendChild(priority);

    const lowerCntr = document.createElement("div");
    lowerCntr.classList.add("expanded-todo-lower-cntr");

    lowerCntr.appendChild(datesCntr);
    lowerCntr.appendChild(priorityCntr);

    element.appendChild(descriptionCntr);
    element.appendChild(notesCntr);
    element.appendChild(lowerCntr);

    return element;
}

export { addProjForm, createTodoListForm, editTodoListForm, expandTodoView }