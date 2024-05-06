const createNewBook = document.querySelector("#createBookSubmit");
const libraryCntr = document.querySelector(".libraryDisplay");
const addBookToggle = document.querySelector("#addBookSubmit");
const bookForm = document.querySelectorAll("#bookForm");

document.addEventListener("DOMContentLoaded", function() {
    loadLibrary()
});

class Book {
    constructor (title,author,numPages,genre,read,available) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.genre = genre;
        this.read = read;
        this.available = available;
    }
};

const myLibrary = [new Book("Tom Clancy: Ghost Recon","David Michaels",237,"Action",true,true),
                   new Book("Tom Clancy: Splinter Cell","David Michaels",355,"Action",false,true),
                   new Book("Day of Reckoning","Jack Higgins",305,"Action",false,true),
                   new Book("Half of a Yellow Sun","Chimamanda Adichie",562,"Novel",true,true),
                   new Book("The Day of the Jackal","Frederick Forsyth",482,"Action",false,true),];

function toggleForm(event) {
    let formCntr = document.querySelector(".formContent").style;
    if (formCntr.display === "none") {
        formCntr.display="block";
        addBookToggle.textContent = "Cancel"
    } else {
        // Clear the form input data
        document.querySelector("#bookForm").reset();
        formCntr.display="none";
        addBookToggle.textContent = "Add Book"
    }
};

function editRead(e) {
    e.preventDefault();
    // Access the parent of the element which is 2 levels above
    bookElement = e.currentTarget.parentNode.parentNode;
    bookId = parseInt(bookElement.id.split("-")[1]);
    myLibrary[bookId].read = !myLibrary[bookId].read;
    // console.log(bookId);
    // Equivalent of refreshing the page
    loadLibrary();
};

function deleteBook(e) {
    e.preventDefault();
    // Access the parent of the element which is 2 levels above
    bookElement = e.currentTarget.parentNode.parentNode;
    bookId = parseInt(bookElement.id.split("-")[1]);
    // Pop the book from the array
    myLibrary.splice(bookId,1);
    // Equivalent of refreshing the page
    loadLibrary();
};

function addBookToLibrary(event) {
    // Prevent send data to a server
    event.preventDefault();

    // do stuff here
    let form = document.querySelectorAll("#bookForm .book-entry input");
    let formData = {}; // temporary object
    form.forEach(function(e) {
        // Update the temporary form data with the form element ids
        let bools = ["available","read"];
        if (bools.includes(e.id)) {
            formData[e.id] = e.checked;
        } else {
            formData[e.id] = e.value;
        };
    });

    // Clear the form input data
    document.querySelector("#bookForm").reset();

    // Create a book object and append it to the list
    const newBook = new Book(formData.title,
                             formData.author,
                             formData.numPages,
                             formData.genre,
                             formData.read,
                             formData.available
                            );
    // console.log(newBook);
    // Append the new book to the library
    myLibrary.push(newBook);

    // Equivalent of refreshing the page
    addBookToggle.textContent = "Add Book"
    loadLibrary();
};

function createBookDisplay(e,idx) {
    // console.log(idx + ":" + e);
    // create a new div element
    const bookItem = document.createElement("div");
    bookItem.id = `book-${idx}`;
    bookItem.classList.add("library-item");

    // Button Containers
    const bookModBtns = document.createElement("div");
    bookModBtns.classList.add("library-item-btn-cntr");

    const editButton = document.createElement("button");
    editButton.className = "editBookBtn";
    editButton.innerHTML = `<i class="far fa-edit"></i>`;

    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteBookBtn";
    deleteButton.innerHTML =  `<i class="fa">&#xf014;</i>`;
    
    bookModBtns.appendChild(editButton);
    bookModBtns.appendChild(deleteButton);

    // Book title p-element
    const bookTitle = document.createElement("div");
    bookTitle.classList.add("library-item-title");
    bookTitle.textContent = e.title;

    // Book author p-element
    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("library-item-author");
    bookAuthor.textContent = `by: ${e.author}`;

    // Book author p-element
    const bookRead = document.createElement("p");
    bookRead.classList.add("library-item-read");

    if (e.read === true) {
        bookItem.style.borderColor = "green";
        bookItem.style.borderWidth = "2px";
        bookItem.style.borderStyle = "solid";
        bookRead.innerHTML = "Read " + `<i style="color:green;" class="fa-solid fa-check"></i>`
    } else {
        bookItem.style.borderColor = "green";
        bookItem.style.borderWidth = "2px";
        bookItem.style.borderStyle = "dashed";
        bookRead.innerHTML = "Read " + `<i style="color:red;" class="fa-solid fa-xmark"></i>`
    }

    // Add the children elements to the book div
    bookItem.appendChild(bookModBtns);
    bookItem.appendChild(bookTitle);
    bookItem.appendChild(bookAuthor);
    bookItem.appendChild(bookRead);


    // add the newly created book and its content into the DOM
    libraryCntr.appendChild(bookItem);
};

function loadLibrary() {
    // This is equivalent to a render function
    console.log("Loading New Library");
    libraryCntr.innerHTML = "";         // Clear the div to avoid replicates
    myLibrary.forEach(createBookDisplay);
    document.querySelector(".formContent").style.display="none"; // Hide the form by default
    addBookToggle.addEventListener("click", toggleForm);
    addBookToggle.textContent = "Add Book"

    //bind events
    createNewBook.addEventListener("click", () => {
        bookForm.noValideate = false; // This ensures form validation even when submit is outside the form
        addBookToLibrary
    });

    // Edit the read status of the book
    let editReadBook = document.querySelectorAll(".editBookBtn");
    editReadBook.forEach((editBtn) => {
        editBtn.addEventListener("click", editRead);
    })

    // Delete the book from the library
    let deleteLibBook = document.querySelectorAll(".deleteBookBtn");
    deleteLibBook.forEach((delBtn) => {
        delBtn.addEventListener("click", deleteBook);
    })

    // Broadcast the changes to the BookCount module 
    events.emit("booksChanged", myLibrary.length);
};

