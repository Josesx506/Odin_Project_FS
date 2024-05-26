const addTodoBtn = (function(){
    const btn = document.createElement("button");
    btn.classList.add("add-todo","clickable-btn");
    btn.dataset.modalTarget = "#modal";
    btn.innerHTML = `<span>New Todo <i class="fa-solid fa-calendar-plus"></i></span>`;

    return btn;
}) ()

function deleteProjBtn(text,id) {
    const btn = document.createElement("div");
    btn.classList.add("project-item-cntr","clickable-btn");
    btn.innerHTML = `<span class="project-item-selector">${text}</span><button class="delete-project-btn icon-btns"><i class="fa-solid fa-folder-minus"></i></button>`;
    btn.childNodes[1].dataset.id = id;

    return btn;
};

function modifyTodoBtns() {
    const rightCntr = document.createElement("div");
    rightCntr.classList.add("todo-item-right-cntr");
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check-todo-item");
    checkBtn.innerHTML = `<i class="fa-solid fa-square-check"></i>`;
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo-item");
    editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
    const delBtn = document.createElement("button");
    delBtn.classList.add("delete-todo-item");
    delBtn.innerHTML = `<i class="fa-regular fa-square-minus"></i>`;

    rightCntr.appendChild(checkBtn);
    rightCntr.appendChild(editBtn);
    rightCntr.appendChild(delBtn);
    return rightCntr
};

export { addTodoBtn, deleteProjBtn, modifyTodoBtns };