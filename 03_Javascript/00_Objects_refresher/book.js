function Book(title,author,numPages,read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
}

let theHobbit = new Book("The Hobbit","Jack Rowlinson",200,true)

// Add a prototype to the object after it has been created
Book.prototype.sayTitle = function() {
    console.log(`This book is titled "${this.title.toLowerCase()}"!`);
}

console.log(theHobbit.sayTitle())
console.log(theHobbit.valueOf())