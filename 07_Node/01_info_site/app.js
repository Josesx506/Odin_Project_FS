const express = require("express");
const path = require("node:path");

const app = express()

// mount the static public folder on the root endpoint with middleware
app.use("/", express.static("public"));

app.get("/", (req,res) => {
    res.sendFile("index.html");
})

// Handling redirects
app.get("/about-me", (req,res) => {
    res.redirect("/about.html");
})

// Handle errors - should come last to prevent intercepting valid requests
app.get("*", (req,res) => {
    let filePath = path.join(__dirname,"public", "404.html");
    res.sendFile(filePath);
})

// Load the port from an environment variable or use a default value
const PORT = process.env.PORT || 8080;

// Listen for request
app.listen(PORT, 
    () => console.log(`Express server running on port: ${PORT}`)
);