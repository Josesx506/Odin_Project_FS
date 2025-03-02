### Handling errors
When building robust applications, it’s crucial to handle errors gracefully within our application. Implementing proper error 
handling allows you to provide meaningful error responses to the client and prevent your application from crashing 
unexpectedly. <br>
You can wrap promises with `try/catch` blocks to render errors properly or install middleware like 
[express-async-handler](https://www.npmjs.com/package/express-async-handler) to create robust controllers e.g.
```JS
const asyncHandler = require("express-async-handler");

// The function will automatically catch any errors thrown and call the next function
const getAuthorById = asyncHandler(async (req, res) => {
  const { authorId } = req.params;

  const author = await db.getAuthorById(Number(authorId));

  if (!author) {
    res.status(404).send("Author not found");
    return;
  }

  res.send(`Author Name: ${author.name}`);
});
```

### Error Middleware
An error middleware function is a "special type of middleware" that handles all errors in our application that come down from 
other middleware functions. We want to place this error middleware function at the very end of the application code to ensure it’s 
the last middleware function executed and only handles errors bubbling down from preceding middleware functions. <br>
Add the following code in `app.js` **at the end of all middleware functions in our application**:
```JS
// Every thrown error in the application or the previous middleware function calling 
// `next` with an error as an argument will eventually go to this middleware function
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});
```
This is a middleware function that requires four parameters that we will need to provide even if they are not used. If for example 
we exclude one of the parameters, it will not be recognized as an error middleware function.


### Handling Custom errors
We can create our own custom error by extending the `Error` object.
```JS
// errors/CustomNotFoundError.js
class CustomNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    // So the error is neat when stringified. NotFoundError: message instead of Error: message
    this.name = "NotFoundError";
  }
}

module.exports = CustomNotFoundError;
```
We can then use this custom error class and refactor the earlier version of `getAuthorById` like so:
```JS
const CustomNotFoundError = require("../errors/CustomNotFoundError");

const getAuthorById = asyncHandler(async (req, res) => {
  // ...
  if (!author) {
    throw new CustomNotFoundError("Author not found");
  }
  // ...
});
```
Since we are using `express-async-handler`, we don’t need to send an error response inside of this function but instead just 
throw an error. `asyncHandler` automatically catches the thrown error and calls `next()`, passing in the caught error as an 
argument, which passes control to our custom error handler! <br>
It will eventually end up in the error middleware function where we can also modify:
```JS
app.use((err, req, res, next) => {
  console.error(err);
  // We can now specify the `err.statusCode` that exists in our custom error 
  // class and if it does not exist it's probably an internal server error
  res.status(err.statusCode || 500).send(err.message);
});
```
This is a useful pattern and we can create more custom error classes for different use cases if needed.