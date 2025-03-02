### Controllers
Controllers are essentially functions that help you execute requests in your app. e.g. If you have a route that gets all the 
blogs in a db model and renders it as a json, you can wrap all the logic to access the db and render the json into a named 
function, then pass this function into your route
```JS
// controller/blogs.js
function getAllBlogs(req,res) {
    Blog.find()
        .then((results)=>res.json(results))
        .catch((err)=>console.log(err))
}
module.export = { getAllBlogs };
```
Then we can import the controller function into our router file
```JS
// routes/blogs
const getAllBlogs = require('../controller/blogs.js')

const router = express.Router();

router.get("/", getAllBlogs);
```
The controller is the brains of the operation ensuring that each component plays its part in delivering the final result and is 
really just a function with well-defined responsibilities as part of the ***MVC*** pattern.

### Handling responses
Express has different methods that can be used to handle responses
- [`res.send`](https://expressjs.com/en/api.html#res.send) - A general-purpose method for sending a response, it is flexible with 
    what data we can send since it will automatically set the `Content-Type` header based on what data you pass it. For example, 
    if we pass in an object, it will stringify it as JSON and set the `Content-Type` header to `application/json`.
- [`res.json`](https://expressjs.com/en/api.html#res.json) - This is a more explicit way to respond to a request with JSON. This 
    always sets the `Content-Type` header to `application/json` and sends the data as JSON. res.json enforces JSON and will 
    automatically convert non-object values to JSON, but res.send will not.
- [`res.redirect`](https://expressjs.com/en/api.html#res.redirect) - When we want to redirect the client to a different URL, this
     method allows for that capability.
- [`res.render`](https://expressjs.com/en/api.html#res.render) - res.render lets you render a view template and send the resulting 
    HTML as the response. We’ll cover this in a later lesson.
- [`res.status`](https://expressjs.com/en/api.html#res.status) - This sets the response’s status code 
    ***but does not end the request-response cycle by itself.*** We can chain other methods through this (e.g. 
    `res.status(404).send(...)` but note that we can’t do `res.send(...).status(404)`). We can omit this if we wish to use 
    the default status code of 200.

These response methods only end the request-response cycle but not the function execution. Multiple methods can be chained 
within a single function e.g., for logging purposes or modifying the db e.g.
```JS
app.use((req, res) => {
  // This works and this ends the request-response cycle
  res.send("Hello");

  // However, it does not exit the function so this will still run
  console.log('will still run!!');

  // This will then throw an error that we cannot send again after sending to the client already
  res.send("Bye");
});
```

### Controller Naming Conventions
The naming conventions for these controllers are usually based on the route they will be attached to e.g. 
`GET` route -> `getSomething`, `POST` route -> `createSomething`, `DELETE` route -> `deleteSomething`, etc. Nonetheless, 
**there is no fixed rule** since Express is not opinionated. It will always be based on you or someone else’s conventions, and 
the requirements of the function.

### The next() function
The `next()` function is used to pass control to the next middleware function in the application’s request-response cycle.
Optional arguments that can be used to modify `next()` behaviour are
1. No argument `next()` - Will pass control to the next middleware function. Very simple and straightforward.
2. With an error argument `next(new Error(...))` - Will pass control **directly** to the error middleware function.
3. With the string `next('route')` - Will pass control to the next route handler with the same matching path (if there is one).
    This only works for app.METHOD or router.METHOD. Potentially, it can also be the same as just calling next with no argument.
4. With the string `next('router')` - Will skip all middleware functions attached to the specific router instance and pass control 
    back out of the router instance. Basically, we exit the router and go back to the parent router, e.g. app (yes, the Express 
    app is also just a router under the hood).
Out of the four, we will likely only use the first two, unless we have a very specific need that requires the other two.

> If the current middleware function does not end the request-response cycle, it must call next() to pass control. Otherwise, 
    the request will be left hanging and the client would keep spinning as if its waiting for data.
Calling the `next()` function is the only way of telling Router that I am done and you can pass Request to next Layer.

An example project folder structure is 
```bash
express-app/
├─ errors/
│  ├─ CustomNotFoundError.js
├─ controllers/
│  ├─ authorController.js
├─ routes/
│  ├─ authorRouter.js
│  ├─ ... other routers
├─ app.js
└─ db.js
```

> [!Important]
> Also view the section on [middleware](./05_middleware.md) and [handling errors](06_handling_errors.md).