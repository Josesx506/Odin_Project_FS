import "@fortawesome/fontawesome-free/js/all"
import homePage from "./home";
import menuPage from "./menu";
import aboutPage from "./about";

console.log("Restaurant launch!!!!!");

// Cache nav buttons and body
const navOdHome = document.querySelector(".odin-home")
const navHome = document.querySelector(".home")
const navMenu = document.querySelector(".menu")
const navAbout = document.querySelector(".about")
const body = document.getElementById("content")

function loadcomponent(pages) {
    body.innerHTML = ""
    body.appendChild(pages);
};

navHome.addEventListener("click", (e) => {
    const home = new homePage();
    loadcomponent(home)
    const foodMenuBtn = document.querySelector(".foodPage");
    const drinksMenuBtn = document.querySelector(".drinksPage");
    foodMenuBtn.addEventListener("click", (ev) => {
        const menu = new menuPage();
        loadcomponent(menu)
    });
    // Load the drinks menu
    drinksMenuBtn.addEventListener("click", (ev) => {
        const menu = new menuPage();
        loadcomponent(menu)
        const drinksHeader = document.querySelector(".mid-titles.drinks");
        drinksHeader.scrollIntoView({ behavior: "smooth" });
    });
})


navMenu.addEventListener("click", (e) => {
    const menu = new menuPage();
    loadcomponent(menu);
})

navAbout.addEventListener("click", (e) => {
    const about = new aboutPage();
    loadcomponent(about);
})