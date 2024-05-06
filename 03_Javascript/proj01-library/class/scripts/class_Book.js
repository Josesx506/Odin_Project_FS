class Book {
    constructor (title,author,numPages,genre,read,available) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.genre = genre;
        this.read = read;
        this.available = available;
    }

    get availablePages () {
        return `${this.available} ${this.numPages}`
    }
};


book1 = new Book("Tom Clancy: Ghost Recon","David Michaels",237,"Action",true,true);
console.log(book1.title);           // returns Tom Clancy: Ghost Recon
// Using the getter function
console.log(book1.availablePages);  // returns true 137