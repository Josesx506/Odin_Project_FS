import "@fortawesome/fontawesome-free/js/all";
import "./css/index.css";

import { openNav, closeNav, renderDropdown } from "./dropDown";
import { renderCarousel } from "./carousel"

// Cache nav buttons and body
const navDropdown = document.querySelector(".dropdown");
const navCarousel = document.querySelector(".carousel");
const body = document.getElementById("content");

function clearElement(element) {
    if (!element) return;
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    };
};

function dynamicEventListeners() {
    // Cache the form entries
    const dynamicNavBtn = document.querySelector(".open-dd-nav");
    const navMenuOptions = document.querySelector(".dd-nav");

    dynamicNavBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openNav();
    });

    navMenuOptions.addEventListener("click", (e) => {
        e.preventDefault();
        closeNav();
    });
};

function renderPage(pages) {
    if (!pages || !body) return;
    clearElement(body);
    body.appendChild(pages);
    dynamicEventListeners()
};

// Load the default page (Dropdown) for the first time
renderPage(renderDropdown());

// Event Listener for the pages
navDropdown.addEventListener("click", (e) => {
    renderPage(renderDropdown());
});

navCarousel.addEventListener("click", (e) => {
    renderPage(renderCarousel());
});