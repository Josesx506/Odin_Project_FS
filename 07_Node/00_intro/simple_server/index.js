const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

// Load the port from an environment variable or use a default value
const PORT = process.env.PORT || 8080;

const server = http.createServer((req,res) => {
    // Handle filepaths dynamically if html routes uses file names. Works with different 
    // file types including json and css

    let filePath = path.join(__dirname,"public", req.url === "/" ? "index.html": req.url);
    let extName = path.extname(filePath);   // Extract the file extension
    let contentType;                        // Set the content type
    switch (extName) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
        default:
            contentType =  "text/html";
            break;
    }
    
    fs.readFile(filePath, (err,content) => {
        if (err) {
            if(err.code === "ENOENT") {
                // Page not found
                fs.readFile(path.join(__dirname, "public", "404.html"), (fileErr, content) => {
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.end(content, "utf8");
                })
            } else {
                // Server error
                res.writeHead(500)
                res.end(`Server Error: ${err.code}`)
            }
        } else {
            // successful request
            res.writeHead(200, { "Content-Type": contentType })
            res.end(content, "utf8");
        }
    })
});

// Listen for request
server.listen(PORT, 
    () => console.log(`Server running on port: ${PORT}`)
);

/**
 * Other way to setup server with hardcoded switch routes. Doesn't load css, json, and image files.
 * 
*/

// switch (req.url) {
//     case "/":
//         fs.readFile(path.join(__dirname, "public", "index.html"), (fileErr, content) => {
//             if (fileErr) throw fileErr;
//             // Return the status code and content type
//             res.writeHead(200, {"Content-Type": "text/html"});
//             // Render the html content to the browser
//             res.end(content);
//         })
//         break;
    
//     case "/about":
//         fs.readFile(path.join(__dirname, "public", "about.html"), (fileErr, content) => {
//             if (fileErr) throw fileErr;
//             // Return the status code and content type
//             res.writeHead(200, {"Content-Type": "text/html"});
//             // Render the html content to the browser
//             res.end(content);
//         })
//         break;
    
//     case "/page1":
//         fs.readFile(path.join(__dirname, "public", "page1.html"), (fileErr, content) => {
//             if (fileErr) throw fileErr;
//             // Return the status code and content type
//             res.writeHead(200, {"Content-Type": "text/html"});
//             // Render the html content to the browser
//             res.end(content);
//         })
//         break;
    
//     case "/api":
//         const users = [
//             {name:"John Doe", age: 30},
//             {name:"Jane Doe", age: 26},
//             {name:"Tem Popo", age: 23},
//         ]
//         // Return the status code and content type
//         res.writeHead(200, {"Content-Type": "application/json"});
//         // Render the html content to the browser
//         res.end(JSON.stringify(users));
//         break;
    
//     default:
//         fs.readFile(path.join(__dirname, "public", "404.html"), (fileErr, content) => {
//             if (fileErr) throw fileErr;
//             // Return the status code and content type
//             res.writeHead(200, {"Content-Type": "text/html"});
//             // Render the html content to the browser
//             res.end(content);
//         })
//         break;
// }