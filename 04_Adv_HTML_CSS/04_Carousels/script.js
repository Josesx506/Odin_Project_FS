const carousel = document.querySelector('.carousel');
let scrollAmount = 0;
const cardWidth = carousel.querySelector('li').offsetWidth + 24; // 24 for gap

function autoScroll() {
    scrollAmount += cardWidth;

    if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
        scrollAmount = 0;
    }

    carousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

setInterval(autoScroll, 300); // scroll every 3 seconds