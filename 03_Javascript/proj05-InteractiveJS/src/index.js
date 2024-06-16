import "@fortawesome/fontawesome-free/js/all";
import "./css/index.css";

import { openNav, closeNav, renderDropdown } from "./dropDown";
import { renderCarousel } from "./carousel"

// Cache nav buttons and body
const navIntJS = document.querySelector(".intjsft");
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
    const slides = document.querySelectorAll(".mySlides");
    const dots = document.querySelectorAll(".dot");
    const prevSlideBtn = document.querySelector(".prev-slide");
    const nextSlideBtn = document.querySelector(".next-slide");

    let slideIndex = 0;

    dynamicNavBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openNav();
    });

    navMenuOptions.addEventListener("click", (e) => {
        e.preventDefault();
        closeNav();
    });

    function changeSlide(change) {
        let i;
        // Toggle off all the slides
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        };

        slideIndex = slideIndex + change;
        // Capture edge-cases to ensure slide index doesn't negate/surpass carousel length
        if (slideIndex > slides.length) {slideIndex = 1}
        if (slideIndex < 1) {slideIndex = slides.length}

        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        
        let activeSlide = slides[slideIndex-1];
        activeSlide.style.display = "grid";
        dots[slideIndex-1].className += " active";
    }

    function autoSlideProgression() {
        changeSlide(1)
        setTimeout(autoSlideProgression, 5000); // Change image every 5 seconds
    };

    prevSlideBtn.addEventListener("click", (e) => {
        e.preventDefault();
        changeSlide(-1);
    });

    nextSlideBtn.addEventListener("click", (e) => {
        e.preventDefault();
        changeSlide(1);
    });

    autoSlideProgression();
};



function renderPage() {
    if (!body) return;
    clearElement(body);
    let nav = renderDropdown();
    let carousel = renderCarousel();
    body.appendChild(nav);
    body.appendChild(carousel);
    dynamicEventListeners();
};

// Load the default page (Dropdown) for the first time
renderPage(renderDropdown());

// Event Listener for the pages
navIntJS.addEventListener("click", (e) => {
    renderPage();
});