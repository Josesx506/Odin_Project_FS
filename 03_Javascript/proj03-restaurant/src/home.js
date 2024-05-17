let loadCss = false;

const intro = (function () {
    const element = document.createElement("div");
    element.classList.add("top-div");
    element.innerHTML = `<span><i class="fa-solid fa-location-dot"></i> 2401 East Brightside Road</span>`;
    return element
}) ()

const aboutMenu = (function () {
    const element = document.createElement("div");
    element.classList.add("page-card");
    const img = document.createElement("img");
    img.src = "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
    img.classList.add("page-card-images");

    const cardBody = document.createElement("div");
    cardBody.classList.add("page-card-body");

    const cardTitle = document.createElement("div");
    const cardSubtitle = document.createElement("div");
    const cardBodyText = document.createElement("div");
    const cardButton = document.createElement("button");

    cardTitle.classList.add("page-card-title");
    cardTitle.textContent = "About Us";

    cardSubtitle.classList.add("page-card-subtitle");
    cardSubtitle.textContent = "Odin Restaurant Project";

    cardBodyText.classList.add("page-card-bodytext");
    cardBodyText.textContent = "Our neighborhood restaurant is dedicated to offering delicious food at reasonable prices in a warm, welcoming, and family-friendly atmosphere.";

    cardButton.classList.add("page-card-button");
    cardButton.classList.add("foodPage");
    cardButton.textContent = "Our Menu";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);
    cardBody.appendChild(cardBodyText);
    cardBody.appendChild(cardButton);

    element.appendChild(img);
    element.appendChild(cardBody);
    return element
}) ();

const drinksMenu = (function () {
    const element = document.createElement("div");
    element.classList.add("page-card");
    const img = document.createElement("img");
    img.src = "https://images.pexels.com/photos/2104568/pexels-photo-2104568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    img.classList.add("page-card-images");

    const cardBody = document.createElement("div");
    cardBody.classList.add("page-card-body");

    const cardTitle = document.createElement("div");
    const cardSubtitle = document.createElement("div");
    const cardBodyText = document.createElement("div");
    const cardButton = document.createElement("button");

    cardTitle.classList.add("page-card-title");
    cardTitle.textContent = "Drinks";

    cardSubtitle.classList.add("page-card-subtitle");
    cardSubtitle.textContent = "Wine and Dinery";

    cardBodyText.classList.add("page-card-bodytext");
    cardBodyText.textContent = "Our bar will focus on 100% locally-crafted spirits and beers! There are thousands of local libation options and house cocktails we hope to bring you over the years.";

    cardButton.classList.add("page-card-button");
    cardButton.classList.add("drinksPage");
    cardButton.textContent = "Drinks";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);
    cardBody.appendChild(cardBodyText);
    cardBody.appendChild(cardButton);

    element.appendChild(cardBody);
    element.appendChild(img);
    return element
}) ();

const reservationsMenu = (function () {
    const element = document.createElement("div");
    element.classList.add("page-card-wide");

    const cardBody = document.createElement("div");
    cardBody.classList.add("page-card-body");
    cardBody.classList.add("wide");

    const cardTitle = document.createElement("div");
    const cardSubtitle = document.createElement("div");
    const cardBodyText = document.createElement("div");
    const cardButton = document.createElement("button");

    cardTitle.classList.add("page-card-title");
    cardTitle.classList.add("wide");
    cardTitle.textContent = "Reservations";

    cardSubtitle.classList.add("page-card-subtitle");
    cardSubtitle.classList.add("wide");
    cardSubtitle.textContent = "Join Us Today";

    cardBodyText.classList.add("page-card-bodytext");
    cardBodyText.classList.add("wide");
    cardBodyText.textContent = "Click the button below to make a reservation.";
    cardButton.style.backgroundColor = "transparent";
    cardButton.style.border = "1px solid white"

    cardButton.classList.add("page-card-button");
    cardButton.textContent = "Reservations";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);
    cardBody.appendChild(cardBodyText);
    cardBody.appendChild(cardButton);

    element.appendChild(cardBody);
    return element
}) ();

const caterMenu = (function () {
    const element = document.createElement("div");
    element.classList.add("page-card");
    const img = document.createElement("img");
    img.src = "https://images.pexels.com/photos/903376/pexels-photo-903376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    img.classList.add("page-card-images");

    const cardBody = document.createElement("div");
    cardBody.classList.add("page-card-body");

    const cardTitle = document.createElement("div");
    const cardSubtitle = document.createElement("div");
    const cardBodyText = document.createElement("div");
    const cardButton = document.createElement("button");

    cardTitle.classList.add("page-card-title");
    cardTitle.textContent = "Cater with Us";

    cardSubtitle.classList.add("page-card-subtitle");
    cardSubtitle.textContent = "Inquire Now";

    cardBodyText.classList.add("page-card-bodytext");
    cardBodyText.textContent = "We specialize in on-site catering for weddings and other special events. We also provide pick-up or delivery, as well as set-up services.";

    cardButton.classList.add("page-card-button");
    cardButton.classList.add("caterPage");
    cardButton.textContent = "Catering";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);
    cardBody.appendChild(cardBodyText);
    cardBody.appendChild(cardButton);

    element.appendChild(img);
    element.appendChild(cardBody);
    return element
}) ();

export default function homePage(){
    loadCss = true;
    if (loadCss) {
        import("./css/home.css");
    }
    console.log("This is the homepage");
    const element = document.createElement("div");
    element.classList.add("home-page-content");

    element.appendChild(intro)
    element.appendChild(aboutMenu)
    element.appendChild(drinksMenu)
    element.appendChild(reservationsMenu)
    element.appendChild(caterMenu)

    loadCss = false;
    return element;
};