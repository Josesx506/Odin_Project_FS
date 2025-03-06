### Mini Message Board
This project creates a mini message board where a user can post new messages by specifying a name or as an anonymous guest. <br> 
- The server is designed with node express and a single router. 
- Pages are rendered using view templates with `ejs`.
- Controller logic is not separated since it's pretty simple within the router.
- Data is saved as a simple list of objects. Because the data is saved server-side, it persists after refreshing the page.
- Launch the app with `npm run start` or use `node --watch app` to run the app in debug mode.
- Access the app at `http://localhost:3000/mini`


### v2 update
- installed the `pg` and `dotenv` libraries for using a postgres db
- Seeparated controller logic to make roll-back between db support and simple storage file efficient
- Provisioned a railway postgres db. Make sure the db and express server are within the same project
    1. Create a new variable/secret in the express service you want to connect to this database.
    2. Assign it the following value: `${{ Postgres.DATABASE_URL }}`
    3. Use the variable in your application code.
- Created a js script `model/populateDB.js` to create the table and insert dummy values once the server is start.
- Updated the `package.json` start command to use `"start": "node model/populateDB && node index"` only in production
- The dev sever is now launched with `npm run dev` which has a *package.json* entry of 
    `"dev": "node model/populateDB.js && node --watch --env-file=.env app.js"`. 
    - The `.env` file will have a `DBURI` value like `"postgresql://<dbUser_name>:<dbUser_password>@<db_host>:<db_port>/<db_name>"` 
        and points to a local postgres db.
- If setting up the local server is to complex, the file will still work with the original `fileController` inside the 
    `routes/miniMessage.js` file.
