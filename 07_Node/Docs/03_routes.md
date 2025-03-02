### Routes 
This relates to how we access http methods like GET, POST etc. The methods on the response object (res) in the following table 
can send a response to the client, and terminate the request-response cycle.
| Method | Description |
| :---- | :----- |
| `res.download()` | Prompt a file to be downloaded. |
| `res.end()` | End the response process. |
| `res.json()` | Send a JSON response. |
| `res.jsonp()` | Send a JSON response with JSONP support. |
| `res.redirect()` | Redirect a request. |
| `res.render()` | Render a view template. |
| `res.send()` | Send a response of various types. |
| `res.sendFile()` | Send a file as an octet stream. |
| `res.sendStatus()` | Set the response status code and send its string representation as the response body. |

Documentation for express [app methods](https://expressjs.com/en/api.html#app.methods) and 
[middleware methods](https://expressjs.com/en/api.html#express.methods) is embedded in the links. <br>

A route usually has a method, and a path/endpoint. The first argument we pass a route is the path to match, which can either be 
a string or a ***regular expression***. With string paths, we can also use certain symbols like `?`, `+`, `*` and `()` to provide 
some pattern-matching functionality, similar to regular expressions.
```JS
// ? makes a character optional
// The following path matches both /message and /messages
"/messages?"

// () groups characters together, allowing symbols to act on the group
// The following path matches both / and /messages
"/(messages)?"

// * is a wildcard matching any number of any characters
// The following path can match /foo/barbar and even /foo-FOO/bar3sdjsdfbar
"/foo*/bar*bar"
```

### Route Parameters
In express, we start a dynamic segment with a `:` followed by the name of the parameter (which can only consist of case-sensitive 
alphanumeric characters, or `_`). Express will automatically populate the `req.params` object in any of the following middleware 
functions with whatever value the path passed into the parameter, using the parameter name as its key.
```JS
app.get("/:username/messages", (req, res) => {
  console.log(req.params);
  res.end();
});
```
In the example above, `username` is a parameter that allows the route to be dynamic because it's different for each user.

### Query parameters
Query parameters are a unique and optional part of a URL that appear at the end. A ? denotes the start of the query parameters, 
with each query being a key-value pair with the format `key=value`, and each query separated by an `&`. In this example 
`/odin/messages?sort=date&direction=ascending`, we can access the `sort=date` and `direction=ascending` key-value pairs inside 
the middleware chain because express parses query parameters into `req.query`. If any keys are repeated, Express will put all 
values for that key into an array.
```JS
app.get("/:username/messages", (req, res) => {
  console.log("Params:", req.params);
  console.log("Query:", req.query);
  res.end();
});
```
You may have already seen this with websites like YouTube. Every YouTube video is given a code and to watch that video, you 
navigate to `https://www.youtube.com/watch`, passing that video code as a query parameter with the `v` key. You could even specify 
at what timestamp in seconds the video should start at via the `t` key. So appending `?v=xm3YgoEiEDc&t=424s` will request `/watch` from YouTube for the `xm3YgoEiEDc` video starting `424` seconds in.


### Routers [Blueprint equivalent]
In a real application with lots of routes, we’d probably want to organize our routes into groups and extract each group out to 
their own file. Say we were making a library app, we might want our server to handle the following routes:
```bash
GET /
GET /about
GET /contact
POST /contact

GET /books
GET /books/:bookId
GET /books/:bookId/reserve
POST /books/:bookId/reserve

GET /authors
GET /authors/:authorId
```
We’ll need a router first, which we can place in a new `routes` directory. For example, `routes/authorRouter.js`:
```JS
// routes/authorRouter.js
const { Router } = require("express");

const authorRouter = Router();

authorRouter.get("/", (req, res) => res.send("All authors"));
authorRouter.get("/:authorId", (req, res) => {
  const { authorId } = req.params;
  res.send(`Author ID: ${authorId}`);
});

module.exports = authorRouter;
```
You can create two other routers for the other route groups - `routes/bookRouter.js` and `routes/indexRouter.js` and add them to 
the server in `app.js`
```JS
// app.js
const express = require("express");
const app = express();
const authorRouter = require("./routes/authorRouter");
const bookRouter = require("./routes/bookRouter");
const indexRouter = require("./routes/indexRouter");

app.use("/authors", authorRouter);
app.use("/books", bookRouter);
app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
```
The routes can be tested using [Postman](https://www.postman.com/downloads/). In expressl, an array of callback functions or a 
combination of independent functions can handle a route.

> [!Important]
> If the parent route of a router has path parameters, it will not be accessible by default from the sub-routes. To make it 
    accessible, you will need to pass the `mergeParams` option to the Router constructor
```JS
const router = express.Router({ mergeParams: true })
```