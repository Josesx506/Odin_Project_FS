const img = document.querySelector("#giphy_img");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#gifSearch");
const searchText = document.querySelector("#searchText");

// Using Promises
// fetch("https://api.giphy.com/v1/gifs/translate?api_key=dpZgAvRpgnJRokfF9JkUIyBwDin7pT0y&s=cats", {mode: "cors"})
// .then(function(response) {
//     return response.json();
// })
// .then(function(response) {
//     img.src = response.data.images.original.url;
// });

// Using Async await
async function getCats() {
    const response = await fetch("https://api.giphy.com/v1/gifs/translate?api_key=dpZgAvRpgnJRokfF9JkUIyBwDin7pT0y&s=cats", {mode: "cors"});
    const catData = await response.json();
    img.src = catData.data.images.original.url;
};

getCats();

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchVal = searchInput.value;

    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=dpZgAvRpgnJRokfF9JkUIyBwDin7pT0y&s=${searchVal}`, {mode: "cors"})
    .then(function(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(function(response) {
        img.src = response.data.images.original.url;
        searchText.textContent = `Results for "${searchVal}"`;
        searchForm.reset();
    })
    .catch(function(error) {
        searchText.textContent = `Error: ${error.message} \nNo results found!!!`;
    });

});
