### SQL + Node Express
This project involves creating a db manually in postgres, populating the db with some values and accessing those values with 
a node express server
1. Create the db - run `createdb top_users` in terminal or login to postgres with `psql` and execute
    ```psql
    # Create the db
    CREATE DATABASE top_users;
    # Connect to the db
    \c top_users
    ```
    You can use `\l` to list the dbs on the server
2. Create a usernames table and insert some values into it. Check that the table was create with `\d` or `\dt`
    ```psql
    # Create table
    CREATE TABLE usernames (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR ( 255 ) 
    );
    # Insert 3 new rows
    INSERT INTO usernames (username)
        VALUES ('Mao'), ('nevz'), ('Lofty');
    # View the data with 
    SELECT * FROM usernames;
    ```

> [!NOTE]
> In postgres, you can run terminal commands like clear with `\! clear`. The `\! ` lets it know it's a terminal command instead of 
    exiting psql to clear terminal.

> [!IMPORTANT]
> Two ways of connecting with `pg`. pg has two ways to connect to a db: a `client` and a `pool`.
> `Client` is an individual connection to the DB, which you manually manage. You open a connection, do your query, then close it. 
    This is fine for one-off queries, but can become expensive if you’re dealing with a lot of queries. Wouldn’t this problem be 
    alleviated if we could somehow hold onto a client? Yes!
> Enter `Pool`. As the name suggests, it’s a pool of clients. A pool holds onto connections. And when you query, it’ll 
    programmatically open a new connection unless there’s an existing spare one. Perfect for web servers.


### Accessing the data in node
Install the [node postgres](https://github.com/brianc/node-postgres), express, and dotenv libraries `npm install pg express dotenv` 
to support compatibility with older node versions. 
- Create a new pg `Pool()` object inside `db/pool.js` that can connect with our db via a URI like
    `"postgresql://<dbUser_name>:<dbUser_password>@<db_host>:<db_port>/<db_name>"`
- Create a new script `db/queries.js` where `async functions` can be written to `select`, `insert`, `update`, or `delete` data 
    from the db with raw sql using the pool object. These functions can then be imported into **controllers**. 
- The sql queries return the data as an array of objects where each row is an object, and each key within a row is a column, 
    while the value is the actual data.

> [!Important]
> Because the db queries are asynchronous functions, any controller function must also be asynchronous with logical error handling.

- Within your controllers, the `map` and `filter` JS operations are replaced with sql `SELECT` and `WHERE`.


### Accessing the Railway Deploy Postgres DB
Create a new railway project and provision a postgress db into it. Connect the node github repo to the same project, so 
that tehy can share the same variables locally as if it's on local host.
1. Create a new variable/secret in the service (*node express service*) you want to connect to this database.
2. Assign it the following value: `${{ Postgres.DATABASE_URL }}`. It'll need a name e.g `DBURI` 
3. Use the variable in your application code e.g. `const DBURI = process.env.DBURI`.
4.  Ensure none of your sql column names clash with in-built names like `user`.


### Routes
This project had a database `top_users` with a single table named `usernames`. I only tested it locally and won't be deploying it.
-  Create your `.env` file and `source` the environment variables to make them visible in your current terminal session
- Ensure postgres is installed locally and run `node db/populatedb.js` to create the table and a few entries if it doesn't exist.
- Launch the server with `node --watch --env-file=.env app.js`. Everything is run in terminal and I didn't create any views or 
    UI. There's a major project after this module to explore.
- The app has 3 main routes 
    ```bash
    ├── GET - "/" - show all the users in the db
    ├── GET - "/?search=..."  - show only the db users that match the search query in your get request
    ├── GET - "/create" - Navigate to a form where you can add a new user
    └── POST - "/create" - Submit the form to insert data into the db
    ```
- In production with railway, all the environment files are specified as railway "variables". Environment variables are essential 
    to ensure that the app easily works across dev and prod environments.