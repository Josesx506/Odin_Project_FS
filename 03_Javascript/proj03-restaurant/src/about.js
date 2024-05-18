let loadAboutCss = false;

const hoursOperation = (function () {
    const element = document.createElement("div");
    element.classList.add("hours-operations");
    
    const sunday = document.createElement("div");
    sunday.textContent = "Sunday: 8am - 8pm";
    const monday = document.createElement("div");
    monday.textContent = "Monday: 6am - 6pm";
    const tuesday = document.createElement("div");
    tuesday.textContent = "Tuesday: 6am - 6pm";
    const wednesday = document.createElement("div");
    wednesday.textContent = "Wednesday: 6am - 6pm";
    const thursday = document.createElement("div");
    thursday.textContent = "Thursday: 6am - 10pm";
    const friday = document.createElement("div");
    friday.textContent = "Friday: 6am - 10pm";
    const saturday = document.createElement("div");
    saturday.textContent = "Saturday: 8am - 10pm";

    const daysOfWeek = [sunday,monday,tuesday,wednesday,thursday,friday,saturday];
    daysOfWeek.forEach((item) => {
        item.classList.add("day-operating-hours");
        element.appendChild(item);
    });

    return element
}) ()

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

    const hours = document.createElement("div");
    hours.classList.add("mid-about-titles");
    hours.textContent = "Hours";

    const contactTitle = document.createElement("div");
    contactTitle.classList.add("mid-about-titles");
    contactTitle.textContent = "Contact";
    
    element.appendChild(hours)
    element.appendChild(hoursOperation)
    element.appendChild(contactTitle)
    element.appendChild(contactTypes)

    loadAboutCss = false;
    return element;
};

export default aboutPage