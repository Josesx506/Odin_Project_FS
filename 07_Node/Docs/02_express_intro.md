### Intro
Express is an advanced server module in node that allows us to serve requests. Like httpServer it accepts an anonymous 
function with a `(req,res)=>{}` argument but different routes can be specified more easily.
```JS
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello, world!")
});

const PORT = 3000;
app.listen(PORT); // Can also accept callbacks after port arg
```
When a server receives a request, Express stores the request in a request object. This request gets passed through a chain of 
functions we call `middleware` functions until eventually, a middleware function tells Express to respond to the request. <br>

The order in which routes are specified within the app matter, and typically, route names should not be repeated across 
the same entry points exceptn when the request types are different e.g. /todos/{id} GET vs PUT. <br>

express servers can send different types of responses including binaries, json, html, and even text files using `res.sendFile()` 
whenever absolute file paths are provided. sendFile is great because it can return html files directly without needing the 
fs module to read the content first. e.g. the long syntax for the httpServer info project can be shortened in express to 

```JS
// mount the static public folder on the root endpoint with middleware
app.use("/", express.static("public"));

app.get("/", (req,res) => {
    res.sendFile("index.html");
})

// Handle errors - should come last to prevent intercepting valid requests
app.get("*", (req,res) => {
    let filePath = path.join(__dirname,"public", "404.html");
    res.sendFile(filePath);
})
```
Once the public directory is mounted, all files in the directoy can be accessed from the `/` path prefix (endpoint). If it was 
an actual site like a blog,  `app.use("/blog", express.static("public"));` will allow loading of all the blog files from the 
`/blog` endpoint. The content type and styling files are automatically resolved by express, and not found errors can be caught 
using the `*` route for default behaviours. 
> [!Important]
> Make sure the static middleware comes before your routes if you want Express to handle serving CSS and other static files 
    automatically.
<br>

For interactive development, you can start your servers with `node --watch app.js` just like the simple server project. 
[Nodemon](https://www.npmjs.com/package//nodemon) also provides the watch compatibility but Odin prefers sticking to in-built 
packages/modules.

### Modular servers
Express also allows different parts of large application to be built separately and merged in a master file like flask 
blueprints 
```JS
const express = require('express')

const app = express()         // the main app
const admin = express()       // the sub app

admin.get('/', function (req, res) {
  console.log(admin.mountpath) // /admin
  res.send('Admin Homepage')
})

app.use('/admin', admin)       // mount the sub app
```