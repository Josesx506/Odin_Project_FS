### The ".use()" method
The `.use()` method is 
- used for registering **Routers**, **Middlewares**, **Routes** & **Error handlers**.
- used with or without a path as the first param/argument
- Both an App and a Router have a .use() method

### Middleware
Middleware functions are a core concept in Express and play a crucial role in handling requests and responses. They can 
typically be mounted with the `.use()` method. A middleware function typically takes three arguments (however, there is one 
that we will get into later that has four):
- `req` - The request object, representing the incoming HTTP request.
- `res` - The response object, representing the HTTP response that will be sent back to the client.
- `next` - The function that passes control to the next middleware function in the chain. This is optional.

A middleware function can perform various tasks, such as:
- Modifying the request or response objects (some packages for example will do this, like adding a new property in the request 
    object, or setting the res.locals that is used in templates rendered with res.render).
- Executing additional code (validation middleware functions to validate the request before going to our main logic, 
    authentication middleware functions, and so on).
- Calling the next middleware function in the chain.
- Ending the request-response cycle (meaning no further middleware functions are called, even if there are more in the chain).
For example, some packages provide middleware functions to handle authentication, CORS, rate limiting, sessions, logging, 
validation, and more! <br><br>

Middleware can be related to the application object or the router obect
- ***Application-level middleware*** are bound to an instance of Express using `app.use` or using `app.METHOD` (e.g. 
    `app.get`, `app.post`) functions. 
    - Express executes these middleware functions for **every incoming request** that matches the specified path.
    - They don't run if the request-response cycle ends before reaching them.
    - Typically, these middleware functions are placed on top of our application code to ensure they always run first.
    - Useful examples are body parsers `express.json`, `express.urlencoded` which allow us to parse arguments in post requests,
        and access them via `req.body`. When `extended` is `false`, our server will only accept a string or an array of data, so 
        we set it to `true` for some added flexibility.
    - Another example is `express.static` which we've used for parsing static files in the info_site project.
- ***Router-level middleware*** works similarly to an application-level middleware, but it’s bound to an instance of Express 
    router using `router.use` or `router.METHOD` (e.g. router.get) functions
    - Express only executes these middleware when **the request matches and goes through that router**.
    - Express executes middleware functions in the order we define or register them in our application.
    - Middleware functions that changes the `Request` object, should be placed at the very top of our application.
```JS
function myMiddleware(req, res, next) {
  // Perform some operations
  console.log("Middleware function called");

  // Modify the request object
  req.customProperty = "Hello from myMiddleware";

  // Call the next middleware/route handler
  next();
}

app.use(myMiddleware);
```
In this example, the middleware function logs a message, adds a custom property to the request object, and then calls the `next()` 
function. Any route that utilizes the middleware function can now access `req.customProperty`, which contains the value 
`"Hello from myMiddleware".`