### Form validation
FOrm validation in node is done to ensure inputs are standardized and sanitize/remove malicious code from our repositories. 
To do this, we can use a library `express-validator`. Install it with `npm -i express-validator`. For this section, we'll be 
sticking with the `body` and `validationResult` functions. The `body()` function allows you to specify which fields in the request 
body should be validated and sanitized, as well as how to handle it.
```JS
const { body, validationResult } = require("express-validator");
[
  body("birthdate", "Must be a valid date.")
    .optional({ values: "falsy" })
    .isISO8601() // Enforce a YYYY-MM-DD format.
];
```
This example marks `birthdate` field as optional, but still enforces the `ISO8601` date format on inputs. This is because 
`{ values: "falsy" }` means values that aren’t `undefined`, `null`, `false`, or `0` will still be validated. <br>
Validation methods can be chained together with unique error messages at different points too
```JS
[
  body("name")
    .trim()
    .notEmpty().withMessage("Name can not be empty.")
    .isAlpha().withMessage("Name must only contain alphabet letters."),  
];
```
This ensures that `name` is not only present and trimmed, but also only contains alphabet letters. <br>
The `body()` function only works for POST requests. To validate get request queries such as from a search form, you need to use 
the `query()` function in express validator.
```JS
const { query, body, validationResult } = require("express-validator");
[
  query("name")
    .trim()
    .isAlpha().withMessage(`Name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Name ${lengthErr}`),
]
```


### Escaping user input to minimize XSS attacks
Coross-site-scripting (XSS) is when hacker inject JS into user input forms or endpoints with malicious intent to take over 
websites. To prevent this, we can escape special characters for form inputs to convert them back into raw html. e.g. convert 
`<script>` to become `&lt;script&gt;` where the special characters are replaced to ensure the scripts cannot be run on our 
servers.


### Validation results
Once the validation rules are applied, you can use `validationResult` to handle any validation errors
```JS
const controller = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("index", {
      errors: errors.array(),
    });
  }

  // do stuff if successful
  res.redirect("/success");
};
```
This setup checks for any failed validation checks, and if there are any (the errors array is NOT empty), then the server sends a 
400 status code, along with any errors that may be present, to our `index` view. Otherwise, we’re redirected to the `/success` 
route in our router. <br>
If we had to pass a dynamic route for a user to the form e.g. `/users/:id/update`, we can do it with ejs using
```html
<!-- Example using EJS with POST to submit an update to our Express server. -->
<form action="/users/<%= user.userId %>/update" method="POST"></form>
```