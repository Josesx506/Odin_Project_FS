const BookCount = (function(){
    let totalBooks = 0; // zero doesn't matter because it will be updated on load

    //cache DOM
    const stats = document.querySelector(".books-count");
    
    //bind events
    events.on("booksChanged", setBooks);
    _render();

    function _render() {
        stats.textContent = `${totalBooks} books`
    }

    function setBooks(newBooks) {
        totalBooks = newBooks;   // Update the book count with the new number of books
        _render();
    }
})();