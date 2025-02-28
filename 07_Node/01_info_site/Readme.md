### Summary
Create a simple node httpServer with 4 pages
- `index.html`
- `about.html`
- `contact-me.html`
- `404.html` - for error handling

Launch the server with `npm run start` or `npm run watch` for dynamic updates while editing files. <br> 

Host the app on https://replit.com and import the files from github. <br>
Host Link - https://replit.com/@josesomojola/odin-httpServer

### v1
After building the app with httpServer in `index.js`, I rebuilt it with ***express*** inside `app.js` as the first 
assignment of the express learning. Express uses middleware to shorten the code and make its easier to handle static 
html and css files with middleware, and `res.sendFile()`. Launch the express server with `npm run prod`