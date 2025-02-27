
const url1 = new URL('/foo', 'https://example.org:8080');

// Add a heading/hash argument
url1.hash = 'baz';
console.log("Hash = ",url1.hash);

// Add a search argument
url1.search = "?q=todo1&year=2025";
console.log("Search = ",url1.search);
console.log("Search Params = ",url1.searchParams); // Serialize the search object

// Print the entire url object
console.log(url1);