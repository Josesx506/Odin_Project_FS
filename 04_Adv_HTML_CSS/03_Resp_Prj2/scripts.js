
const hamburger = document.getElementById("hamburger");
const nav = document.querySelector(".nav__cntr");

hamburger.addEventListener("click", (e)=>{
    e.preventDefault();
    hamburger.classList.toggle("is-active");
    nav.classList.toggle("visible")
    console.log(hamburger.classList);
})