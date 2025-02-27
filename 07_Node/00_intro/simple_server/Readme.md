### Summary
Create a simple node js http server and serve static html/css/json files.
- Dependencies: [`http.createServer`, `fs.readFile`, `path.join`]
Static files are manually created and styled in the public directory. When a new request is made, the server checks the request 
url to determine which fileType and content should be loaded. The file content is loaded with the `fs` module, and the server 
renders a response and status code to the browser. <br>
`html`, `css`, and `js` files in a static file are all passed to the url. The `path` module is used to resolve relative file 
paths to each input file in the request url, and the server endpoint should be robust enough to handle access each file and 
render them dynamically.

> Follows the youtube tutorial from Brad Traversy - https://www.youtube.com/watch?v=fBNz5xF-Kx4

### Setup
1. Create a *package.json* with `npm init` so that the folder is like a js module
2. Add start and watch scripts to launch the node server with npm run
    ```json
    "scripts": {
        "start": "node index",
        "watch": "node --watch index"
    },
    ```
    - Track changes dynamically with `npm run watch` from the project folder instead of using nodemon
    - Run a fixed server instance with `npm run start`
3. Navigate to http://localhost:8080 to access the app

> [!Note]
> The app server also works without using npm init and you can watch files manually by running `node --watch index` in terminal.
