

function citySearch() {
    const element = document.createElement("div");
    element.classList.add("form-cntr");

    let form = document.createElement("form");
    element.classList.add("search-form-body");

    let searchInput = document.createElement("input");
    searchInput.id = "search-city-input";
    searchInput.setAttribute("name","search-city-input");
    searchInput.setAttribute("type","text");
    searchInput.setAttribute("maxlength",50);
    searchInput.setAttribute("placeholder","Enter City");

    let searchSubmit = document.createElement("button");
    searchSubmit.setAttribute("type","submit");
    searchSubmit.innerHTML = `<i class="fa fa-search"></i>`;

    form.appendChild(searchInput);
    form.appendChild(searchSubmit);
    element.appendChild(form);

    return element;
};

export { citySearch }