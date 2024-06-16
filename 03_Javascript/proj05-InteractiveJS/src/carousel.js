let loadCarouselCss = false;

function createOuterFrame() {
    const element = document.createElement("div");
    element.classList.add("slideshow-container");
    return element;
}

function createInnerFrame(src,indexLabel,imgCaption) {
    const element = document.createElement("div");
    element.classList.add("mySlides","fade");

    const slideProgress = document.createElement("div");
    slideProgress.classList.add("numbertext");
    slideProgress.textContent = indexLabel;
    
    const slideImg = document.createElement("img");
    slideImg.src = src;
    slideImg.classList.add("slide-img");

    const slideCaption = document.createElement("div");
    slideCaption.classList.add("captiontext");
    slideCaption.textContent = imgCaption;

    element.appendChild(slideProgress);
    element.appendChild(slideImg);
    element.appendChild(slideCaption);

    return element;
}

function renderCarousel() {
    loadCarouselCss = true;
    if (loadCarouselCss) {
        import("./css/carousel.css");
    }

    const element = document.createElement("div");
    element.classList.add("slides-outer")

    const outerFrame = createOuterFrame();
    const lowerDivCounter = document.createElement("div");
    lowerDivCounter.classList.add("dotCntr")

    let imgSrcs = ["https://cdn.stocksnap.io/img-thumbs/280h/cow-animal_QPQCNNQGWU.jpg",
        "https://cdn.stocksnap.io/img-thumbs/280h/bird-spoonbill_OXW52JDMAI.jpg",
        "https://cdn.stocksnap.io/img-thumbs/280h/bird-perched_VSG77EODME.jpg",
        "https://cdn.stocksnap.io/img-thumbs/280h/woodpecker-bird_6XMNEMASTW.jpg",
        "https://cdn.stocksnap.io/img-thumbs/280h/chalet-wood_7PBFL1ERJT.jpg"]
    
    imgSrcs.forEach((value,index) => {
        let imgDiv = createInnerFrame(value,`${index+1} / ${imgSrcs.length}`, `Caption ${index+1}`)
        outerFrame.appendChild(imgDiv);
        let dotSpan = document.createElement("span");
        dotSpan.classList.add("dot");
        lowerDivCounter.appendChild(dotSpan);
    });


    let prevBtn = document.createElement("a");
    prevBtn.classList.add("prev-slide");
    prevBtn.innerHTML = `&#10094;`;
    let nextBtn = document.createElement("a");
    nextBtn.classList.add("next-slide");
    nextBtn.innerHTML = `&#10095;`;
    outerFrame.appendChild(prevBtn);
    outerFrame.appendChild(nextBtn);


    element.appendChild(outerFrame);
    element.appendChild(lowerDivCounter);

    loadCarouselCss = false;
    return element;
}


export { renderCarousel }