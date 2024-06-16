let loadDropdownCss = false;

function renderNav(items = ["Home","About","Contact"]) {
    const element = document.createElement("div");
    element.classList.add("dd-nav");

    const closeBtn = document.createElement("a");
    closeBtn.href="javascript:void(0)";
    closeBtn.classList.add("close-dd-nav");
    closeBtn.innerHTML = `&times`
    element.appendChild(closeBtn);

    items.forEach((item) => {
        let ddItem = document.createElement("a");
        ddItem.textContent = item;
        ddItem.classList.add("dd-li-item");
        element.appendChild(ddItem);
    });

    return element
};

function openNav() {
    const openBtn = document.querySelector(".open-dd-nav");
    openBtn.style.display = "none";
    const navOptions = document.querySelector(".dd-nav");
    navOptions.style.width = "100%";
};

function closeNav() {
    const openBtn = document.querySelector(".open-dd-nav");
    openBtn.style.display = "grid";
    const navOptions = document.querySelector(".dd-nav");
    navOptions.style.width = "0";
};

function renderMobileBtn() {
    const element = document.createElement("span");
    element.classList.add("open-dd-nav");
    element.innerHTML = `&#9776 Menu`

    return element
}

function renderDropdown() {
    loadDropdownCss = true;
    if (loadDropdownCss) {
        import("./css/dropdown.css");
    }

    const element = document.createElement("div");
    element.classList.add("wrapper");

    const ddElements = renderNav();
    const ddBtn = renderMobileBtn();

    element.appendChild(ddElements);
    element.appendChild(ddBtn);

    loadDropdownCss = false;
    return element
}


export { openNav, closeNav, renderDropdown }