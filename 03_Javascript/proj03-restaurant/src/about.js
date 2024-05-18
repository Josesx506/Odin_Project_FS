let loadAboutCss = false;

function Contact(title,phone,email) {
    this.title = title;
    this.phone = phone;
    this.email = email;
}

const contactTypes = (function () {
    const element = document.createElement("div");
    element.classList.add("contact-options");

    const allContacts = [new Contact("Manager","+1 (225) 449-4416","odinmanager@email.com"),
                         new Contact("Catering","+1 (225) 449-4417","odincatering@email.com"),
                         new Contact("Online Ordering","+1 (225) 449-4418","odinonlineorder@email.com"),
                         new Contact("Pickup","+1 (225) 449-4419","odinpickup@email.com")
    ];
    
    allContacts.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("contact-card");

        const title = document.createElement("div");
        title.classList.add("card-title");
        title.textContent = item.title;
        const body = document.createElement("div");
        body.classList.add("card-body");
        const phone = document.createElement("div");
        phone.classList.add("card-body-phone");
        phone.textContent = item.phone;
        const email = document.createElement("div");
        email.classList.add("card-body-email");
        email.textContent = item.email;
        body.appendChild(phone);
        body.appendChild(email);
        card.appendChild(title);
        card.appendChild(body);
        
        element.appendChild(card);
    });

    return element
}) ()

function aboutPage(){
    loadAboutCss = true;
    if (loadAboutCss) {
        import("./css/about.css");
    }
    
    const element = document.createElement("div");
    element.classList.add("about-page-content");
    // element.textContent = "This is about";

    element.appendChild(contactTypes)
    // element.appendChild(aboutMenu)
    // element.appendChild(drinksMenu)
    // element.appendChild(reservationsMenu)
    // element.appendChild(caterMenu)

    loadAboutCss = false;
    return element;
};

export default aboutPage