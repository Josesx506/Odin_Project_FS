function createModalHeader(titleText) {
    const element = document.createElement("div");
    element.classList.add("modal-header");

    const title = document.createElement("div");
    title.classList.add("modal-title");
    title.textContent = titleText;
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("modal-close-btn");
    closeBtn.innerHTML = `&times;`;
    element.appendChild(title);
    element.appendChild(closeBtn);

    return element;
}

function createModal(titleText, body) {
    const element = document.createElement("div");
    element.id = "modal";
    element.classList.add("modal");

    const header = createModalHeader(titleText);
    element.appendChild(header);
    element.appendChild(body);

    return element;
};

export { createModalHeader, createModal };