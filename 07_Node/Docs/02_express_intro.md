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

app.get("/about-me", (req,res) => {
    res.redirect("/about.html");
})

// Handle errors - should come last to prevent intercepting valid requests
app.get("*", (req,res) => {
    let filePath = path.join(__dirname,"public", "404.html");
    res.sendFile(filePath);
    // OR
    // res.sendFile("./public/404.html", { root: __dirname })
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

### Views
Express also allows rendering of html files with view templates like flask and the netNinja tutorial used the `.ejs` views template. 
I never liked *views* in flask and I still don't like them in express. I'll be using react for frontend rendering and stick to using 
node for transmitting backend data and not html.


### Middleware
We can access middleware or create middleware for different things in an express server. Middleware is used for different things like 
- Authentication
- Logging
- Modularity etc.
To log some request details we can use the catch all middleware `app.use`, 
```JS
// If included at the top of all endpoints, it runs before any endpoint is accessed
app.use((req,res,next) => {
    console.log('new request made');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method); // GET, POST etc
    next()
})
```
Including this middleware at the top of our server ensures that the request details are logged into the browser. The `next` function 
in express is a default function and is similar to *continue* in python. It essentially tells express to execute the middleware and 
continue down the list of endpoints to send a response back to the server. If the next function is not called, the server gets 
stuck inside the middleware and will not send a response back to the browser. <br>
The are many middleware functions on the npm site that can be installed to improve express server functionality, install them in 
your project to get started.