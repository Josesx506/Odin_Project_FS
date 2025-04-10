### Intro to Jamstack
- Save the frontend on Netlify/Vercel/Github pages etc.
- Save the backend on Heroku, Railway, Digital Ocean, AWS etc

Organizing your project this way can be beneficial because it allows your project to be more modular instead of combining business 
logic with view logic. This also allows you to use a single backend source for multiple frontend applications, such as a website, a 
desktop app, or a mobile app.

### REST APIs
Representational State Transfer (REST)is a software architectural style that was created to describe the design and guide the 
development of the architecture for the World Wide Web. Its style conforms to specific architectural constraints, like stateless 
communication and cacheable data. It is not a protocol or standard. While REST APIs can be accessed through a number of 
communication protocols, most commonly, they are called over HTTPS. The piece that we specifically want to think about is how to organize our endpoint ***URI***s (Uniform Resource Identifier). <br>
With REST APIs, we refer directly to the resource e.g.
- `/posts/:postid`: get a specific post
- `/posts/:postid/comments`: get the list of comments on a single post
- `/posts/:postid/comments/:commentid`: get a single comment

| Verb | Action | Example |
| :--- | :--- | :--- |
| POST | Create | POST `/posts` Creates a new blog post |
| GET | Read | GET `/posts/:postid` Fetches a single post |
| PUT | Update | PUT `/posts/:postid` Updates a single post |
| DELETE | Delete | DELETE `/posts/:postid` Deletes a single post |

Simple rules for REST APIs
- Accept and respond with JSON
- Use nouns instead of verbs in endpoint paths
- Name collections with **plural** nouns
- Nesting resources for hierarchical objects
- Handle errors gracefully and return standard error codes
- Allow filtering, sorting, and pagination
- Maintain Good Security Practices
- Cache data to improve performance
- Versioning our APIs

### Standard REST API error codes
Common error HTTP status codes include:
- `400 Bad Request` - This means that client-side input fails validation.
- `401 Unauthorized` - This means the user isn't not authorized to access a resource. It usually returns when the user 
    isn't authenticated.
- `403 Forbidden` - This means the user is authenticated, but it's not allowed to access a resource.
- `404 Not Found` - This indicates that a resource is not found.
- `500 Internal server error` - This is a generic server error. It probably shouldn't be thrown explicitly.
- `502 Bad Gateway` - This indicates an invalid response from an upstream server.
- `503 Service Unavailable` - This indicates that something unexpected happened on server side (It can be anything like 
    server overload, some parts of the system failed, etc.).


### Example API requests
- GET `/employees?lastName=Smith&age=30` - retrieve the employee that matches the last name and age params requested
- GET `/articles?sort=+author,-datepublished` - articles from a blog repo and sort them. Where **`+`** means ascending and 
    **`-`** means descending. So we sort by author’s name in alphabetical order and datepublished from most recent to least recent.


### CORS
Cross-Origin Resource Sharing (CORS) is a browser security mechanism that restricts cross-origin HTTP requests, preventing a webpage 
from making requests to a different domain than the one serving the webpage. The Same Origin Policy is an important security measure 
that basically says “Only requests from the same origin (the same IP address or URL) should be allowed to access this API”. Two URLs 
have the same origin if the protocol, port (if specified), and host are the same for both. e.g. compared to `http://store.company.com/dir/page.html`,
- `http://store.company.com/dir2/other.html` shares the same origin, with only a different path.
- `https://store.company.com/page.html` has a different protocol, _http_ vs **https**, hence it'll fail the CORS check.
- `http://store.company.com:81/dir/page.html` would fail because of a different port.

CORS can be easily integrated into express using [preflight](https://expressjs.com/en/resources/middleware/cors.html#enabling-cors-pre-flight). 
This allows users to specify cors for specific routes or a single point of failure middleware that confirms CORS adherence before 
processing any requests.
```JS
const corsOptions = {origin: 'http://example.com'};
app.use('/products/:id', cors(corsOptions))

// Or use it at the top before any other routes for the whole app
app.use(cors(corsOptions)) // include before other routes
```

### CORS Network Access
The same-origin policy controls interactions between two different origins, such as when you use fetch() or an <img> element. 
These interactions are typically placed into three categories:
- Cross-origin writes are *typically allowed*. Examples are links, redirects, and form submissions. Some HTTP requests 
    require preflight.
- Cross-origin embedding is *typically allowed*. e.g. including a `src` value for a JS `<script>`/`<img>` element that pulls 
    data from another website. Or loading a remote css script, anything embedded by `<iframe>`. Sites can use the `X-Frame-Options` 
    header to prevent cross-origin framing etc.
- Cross-origin reads are ***typically disallowed***, but read access is often leaked by embedding.


### Preflighted requests
Unlike simple requests, for "preflighted" requests the browser first sends an HTTP request using the OPTIONS method to the resource 
on the other origin, in order to determine if the actual request is safe to send. Such cross-origin requests are preflighted since 
they may have implications for user data.
```JS
const fetchPromise = fetch("https://bar.other/doc", {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "text/xml",
    "X-PINGOTHER": "pingpong",
  },
  body: "<person><name>Arun</name></person>",
});

fetchPromise.then((response) => {
  console.log(response.status);
});
```

### Good Practices
1. Most communication between client and server should be private since we often send and receive private information. Therefore, 
    using SSL/TLS for security is a must. A SSL certificate isn't too difficult to load onto a server and the cost is free or very 
    low. There's no reason not to make our REST APIs communicate over secure channels instead of in the open. <br>
2. Simple in-memory caching can be done with express middleware
    ```JS
    const apicache = require('apicache');
    let cache = apicache.middleware;
    app.use(cache('5 minutes'));
    ```
3. It's a good idea to version your apis. Versioning is usually done with `/v1/`, `/v2/`, etc. added at the start of the API path.
    `/v1/employees`,`/v2/employees`. This is a good way to handle updates while allowing users to revert to old api routes.