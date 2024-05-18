import "@fortawesome/fontawesome-free/js/all"
import homePage from "./home";
import menuPage from "./menu";

console.log("restaurant launch!!!!!");

// Cache buttons
const navOdHome = document.querySelector(".odin-home")
const navHome = document.querySelector(".home")
const navAbout = document.querySelector(".about")
const navMenu = document.querySelector(".menu")
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
    })
})


navMenu.addEventListener("click", (e) => {
    const menu = new menuPage();
    loadcomponent(menu)
    console.log(e,"clicked menu;")
})