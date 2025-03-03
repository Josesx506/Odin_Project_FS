### Simple MVC
Create a simple Model-Views-Controller (MVC) app with node express. 
- Use simple static js files with constant variables for data models
- Use simple controllers to assign data for route handlers
- Use different route handlers to modularize the app
- Use **router** middleware to extract the baseurl for each route and update the html links in each view
    ```JS
    router.use((req,res,next) => {
        res.locals.title = req.baseUrl;
        next();
    })
    ```
- Updated `package.json` file
    ```JSON
    "scripts": {
        "test": "...",
        "start": "node app"
    }
    ```
- Launch the app with `npm run start` or use `node --watch app` to run the app in debug mode.
- Access the app at `http://localhost:3000/blog`