### Views
Views are the user-facing part of the application, in this case, HTML files. This is similar to using Jinja2 in flask but here we 
use [ejs](https://ejs.co/). To get started, `npm install ejs`.
- create a subfolder called `views`
- In your `app.js` file, set the following application properties:
    ```JS
    const path = require("node:path");

    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");
    ```
- This enables EJS as the view engine, and that our app should look for templates in the `/views` subdirectory.
- All views templates must be saved with the `.ejs` extension e.g. *index.ejs*

### Syntax
Just like react uses `{}` for JS inside html, ejs uses `<% ... %>` to allow us to embed JS into html files. This enables 
conditional statements, for loops etc. <br>
In order to output a variable as a value, we use the `<%=` tag and close it with `%>`. This start tag `<%=` is called the “escape 
output” tag because if the string in the content has forbidden characters like `>` and `&`, the characters will be escaped 
(replaced by HTML codes) in the output string.
```html
<% const animals = ["Cat", "Dog", "Lemur", "Hawk"] %>

<ul>
  <% animals.map((animal) => { %>
    <li><%= animal %>s are cute</li>
  <% }) %>
</ul>
```

### Using EJS in express
Within app routes, we can pass key-value objects with the `res.render()` method. This allows us to create local variables that 
can be accessed inside our view templates. We don’t need to provide the file extension because Express resolves it automatically.
```JS
// app.js
app.get("/", (req, res) => {
  res.render("index", { message: "EJS rocks!" });
});

// index.ejs
<html>
  <body>
    <%= message %>
  </body>
</html>
```
In the example, the message object can be rendered from the route and displayed in the body of the template. Since we’ve already 
defined the views and view engine app properties, the first argument of res.render is programmed to look for “a template called 
`index` in the specified folder”, while the second argument is an `object of variables` that are to be made available to that 
specific template. <br>
Apart from object variables that we render in the response, ejs also has access to any properties in the express's `res.locals` 
[method](https://expressjs.com/en/api.html#res.locals). This can be useful if you need to pass values to the view in one 
middleware function, but won’t call `res.render` until later in the middleware chain. EJS will store these properties in an object 
called `locals`, which you can access in the view. Any variable that is called in a view template, but not defined in the render 
params or local property will throw a reference error. We can add variables to our locals object with
```JS
// app.js
app.use(function (req, res, next) {
  // Make `user` and `authenticated` available in templates
  res.locals.user = req.user
  res.locals.authenticated = !req.user.anonymous
  next()
})

// index.ejs
<div><%= locals.user %></div>
```

### Reusable templates
Like react components, views allow us to reuse templates like sidebars, header, footer, navbar etc. This allows these templates 
to be shared across different pages. To insert such components into your pages, we make use of the `include` command. <br>
Within the views directory, I put the reusable view templates inside a `partials` subdirectory, then I can access the reuseable 
template in any view. e.g if I had a resuable header that has my navbar, styles etc, we can load it with 
```html
<!DOCTYPE html>
<html lang="en">
<%- include('partials/header', {title: title, links: links}) %>
<body>
    <%= message %>
</body>
</html>
```
The title, links, and message variable will have to be supplied by the express router/app.
```JS
// app.js
const links = [
    { href: "/", text: "Home" },
    { href: "about", text: "About" },
];

app.get("/", (req, res) => {
    // Get the baseUrl from the router name if it exists
    const baseUrl = req.baseUrl;
    res.render("index", { 
        title: baseUrl,
        links: links,
        message: "EJS rocks 2!" });
});
```
> [!Note]
> the use of the raw output tag `<%-` with the `include` which is used to avoid double-escaping the HTML output.


### Serving Static Assets
Specify the `express.static` middleware at the top of your server file in a public folder.
```JS
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
```
This can be used to serve css files within the view templates or even other fixed html pages

### Caching and layouts
You can cache ejs functions used to render templates. It's easy to plug in LRU caching using Node's `lru-cache` library:
```JS
let ejs = require('ejs')
LRU = require('lru-cache');

app = express();
ejs.cache = new LRU(100); // LRU cache with 100-item limit
```
If you want to clear the EJS cache, call ejs.clearCache. If you're using the LRU cache and need a different limit, simple reset 
`ejs.cache` to a new instance of the LRU. <br> 
Header footer layouts can be defined  like
```JS
<%- include('header'); -%>
<h1>
  Title
</h1>
<p>
  My page
</p>
<%- include('footer'); -%>
```
The rest of the ejs functions can be found in their [documentation](https://ejs.co/#docs).