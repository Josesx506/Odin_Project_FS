
// function closeModal() {
//     // modal
//     // if (modal === null) return;
//     // modal.classlist.remove("active");
//     overlay.classlist.remove("active");
// };

function createModal(titleText, body) {
    const element = document.createElement("div");
    element.id = "modal";
    element.classList.add("modal");

    const header = document.createElement("div");
    header.classList.add("modal-header");

    const title = document.createElement("div");
    title.classList.add("modal-title");
    title.textContent = titleText;
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("modal-close-btn");
    closeBtn.innerHTML = `&times;`;
    header.appendChild(title);
    header.appendChild(closeBtn);

    element.appendChild(header);
    element.appendChild(body);

    return element;
};

export { createModal };