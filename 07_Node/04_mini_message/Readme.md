### Mini Message Board
This project creates a mini message board where a user can post new messages by specifying a name or as an anonymous guest. <br> 
- The server is designed with node express and a single router. 
- Pages are rendered using view templates with `ejs`.
- Controller logic is not separated since it's pretty simple within the router.
- Data is saved as a simple list of objects. Because the data is saved server-side, it persists after refreshing the page.
- Launch the app with `npm run start` or use `node --watch app` to run the app in debug mode.
- Access the app at `http://localhost:3000/mini`