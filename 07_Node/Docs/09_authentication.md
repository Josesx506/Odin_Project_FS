### Authentication
**Authentication** is all about knowing who a user is and whether that user exists in like a db. **Authorization** on the 
other hand is knowing whether a user can access resources on a web application. This can happen if the user uses other 
verification info like github, gmail, microsoft etc. It restricts/allows the user access to pprotected endpoints in an 
application. If a user doesn't have permission, 401 unauthorized error is thrown <br> 
Authentication can be implemented in NodeJS using a data and [passport.js](https://www.passportjs.org/). We also use 
`express-session` indirectly, as a dependency that is used in the background by `passport.js`.

To get started with **sign up** and authentication
- Create a database that can store your user's usernames and passwords
- Create a form that accepts sign-up information and use form validation to sanitize input and handle errors
- Create a POST route that processes valid sign up data submitted through the form, and inserts it into the DB.

Passport.js uses what they call Strategies to authenticate users. They have over 500 of these strategies, but we’re going 
to focus on the most basic (and most common), the username-and-password, or what they call the `LocalStrategy`. <br>

First we setup a LocalStrategy object and add it as a middleware to our app. This function is what will be called when we 
use the `passport.authenticate()` function later. Basically, it takes a username and password, tries to find the user in our 
DB, and then makes sure that the user’s password matches the given password. If all of that works out (there’s a user in the 
DB, and the passwords match) then it authenticates our user and moves on! This function acts a bit like a middleware and 
will be called for us when we ask passport to do the authentication later.

### Sessions and Serialization
To make sure our user is logged in, and to allow them to stay logged in as they move around our app, passport internally 
calls a function from `express-session` that uses some data to create a **cookie** called `connect.sid` which is stored 
in the user’s browser. `passport.serializeUser` takes a callback which contains the information we wish to store in the 
session data. `passport.deserializeUser` is called when retrieving a session, where it will extract the data we 
“serialized” in it then ultimately attach something to the `.user` property of the request object (`req.user`) for use 
in the rest of the request.

- When a session is created, `passport.serializeUser` will receive the user object found from a successful login and store 
    its `id` property in the session data. 
- Upon some other request, if it finds a matching session for that request, `passport.deserializeUser` will retrieve the id 
    we stored in the session data. 
- We then use that id to query our database for the specified user, then `done(null, user)` attaches that user object to 
    `req.user`. 
- Now in the rest of the request, we have access to that user object via req.user.

Again, we aren’t going to be calling these functions on our own and we just need to define them, they’re used in the 
background by passport.

### Storing Sessions
Sessions can be stored in memory, or on databases like MongoDB or postgres. In mongoDB, we can use the `connect-mongo` 
library, while on postgres, we can use the `connect-pg-simple` library. The db table that stores the session is not 
created by default, and we need to create it manually as a session store, using scripts like populateDB in prior projects.
I created a dev script in my `package.json` to run this file with `"dev": node populateDB.js && node --watch index.js`. <br>
```JS
const session = require("express-session");
const pgStore = require("connect-pg-simple")(session);
require("dotenv").config();

// pg connection
const pool = new Pool({connectionString: process.env.DBURI});

// pg store for saving session info instead of saving it in memory
const sessionStore = new pgStore({
    pool : pool,
    tableName : 'user_sessions', // this table is not created by default
})
```
Cookies are stored in a browser, while sessions are stored serverside. An example of a session store entry which has a 
session id (sid) and some user data is
| sid | sess | expire |
| :-- | :--- | :----- |
| TpdpF2ZiAYdcheqWJUchN71-9ZTTvlor | {"cookie":{"originalMaxAge":21600000,"expires":"2025-03-16T04:53:14.153Z","httpOnly":true,"path":"/"},"passport":{"user":2}} | 2025-03-15 21:53:15 |

**Cookies** can only store minimal data like the user session id and expiration time. It *should not* contain sensitive user 
data like emails or passwords. **Sessions** on the serverside are not rendered on the client side and we can authenticate 
them each time a request is made using the session id extracted from a cookie.
```
cookie (session id) -> session (has user info for route authorization on server) -> authorize/deny access
```
Within our sessions, we can also store info like how many times a user has visited a route/endpoint like
```JS
if (req.session,viewCount) {
    req.session,viewCount++;
}
```

### Sign In and Sign Out
Using a form, the POST route for login/sign-in calls the LocalStrategy which we defined on the backed and uses it to 
authenticate whether a user exists in our database or not. Among other things, it looks at the request body for parameters 
named `username` and `password` then runs the LocalStrategy function that we defined earlier to see if the username and 
password are in the database. <br>
It then creates a **session cookie** that gets stored in the user’s browser and used in all future requests to see whether 
or not that user is logged in. It can also redirect you to different routes based on whether the login is a success or a 
failure. If we had a separate login page we might want to go back to that if the login failed, or we might want to take the 
user to their user dashboard if the login is successful. <br>
The user is stored in our **`locals`** middleware object on the server and can be accessed within our views object by 
passing it as a variable from `req.user`. <br>
The passport middleware adds a `logout` function to the `req` object, so logging out is as easy as `req.logout(<callback>)`.

> [!Tip]
> In express, you can set and access various local variables throughout your entire app (even in views) with the `locals`
    object. We can use this knowledge to write ourselves a custom middleware that will simplify how we access our current user in our views. <br>
    Middleware functions are functions that take the req and res objects, manipulate them, and pass them on through the rest of the app.

```JS
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
```
If you insert this code somewhere between where you instantiate the passport middleware and before you render your views, 
you will have access to the `currentUser` variable in all of your views, and you won’t have to manually pass it into all of 
the controllers in which you need it.

### Securing passwords with bcrypt
First `npm install bcryptjs`. There is another module called `bcrypt` that does the same thing, but it is written in C++ 
and is sometimes a pain to get installed. The C++ bcrypt is technically faster, so in the future it might be worth getting 
it running, but for now, the modules work the same so we can just use bcryptjs. <br>

Require/Import it at the top of your app, then put it to use where we save our passwords to the DB, and where we compare 
them inside the LocalStrategy. The `bcrypt.hash()` function accepts 2 arguments and returns a promise. The first function 
is the string that should be hashed, and the second function is the length of the salt for hashing. <br>

Salting a password means adding extra random characters to it, the password plus the extra random characters are then fed 
into the hashing function. Salting is used to make a password hash output unique, even for users who use the same password, 
and to protect against [rainbow tables](https://en.wikipedia.org/wiki/Rainbow_table) and 
[dictionary attacks](https://en.wikipedia.org/wiki/Dictionary_attack). Usually, the salt is stored in the database alongside 
the hashed value. However, in our case, there is no need to store the salt separately because the `bcryptjs` hashing 
algorithm automatically incorporates the salt within the hash itself. The hash function is somewhat slow, so all of the DB 
storage stuff needs to go inside the callback. <br>

### Comparing hashed passwords
We will use the bcrypt.compare() function to validate the password input. The function compares the plain-text password in 
the request object to the hashed password. Inside your `LocalStrategy` function we need to replace the 
`user.password !== password` expression with the `bcrypt.compare()` function.

### Authentication Strategies
Authentication Strategies are ways we authenticate users in an application. The strategy we just implemented above is the 
local strategy `passport-local`. Other strategies can use techniques like google sign-in, github, facebook etc. There 
are over 500 [strategies](https://www.passportjs.org/packages/) on the passport-js website. Each strategy can be 
installed as an independent library in an application, and then called within an authentication route.

### Passport custom fields
When working with passport LocalStrategy, our callback function requires standard names like username/password. 
```JS
passport.use(
    new LocalStrategy(async (username, password, done) => {
      ...
    })
);
```
If we want to use custom names, we can pass a `customFields` object and our callback to passport
```JS
const customFields = {
    usernameField: 'uname',
    passwordField: 'pw'
};
const strategy = new LocalStrategy(customFields, verfiyCallback)l
passport.use(strategy);
```

### Directory nomenclature
Now that we're using dbs and multiple middleware for authentication, we can create a `configure` directory, which helps 
us set up our db and authentication strategies. The objects can then be imported as middleware into other parts of our 
application to make things simplerr to manage.

### Protected Routes
Protected routes are similar to regular routes with the exception that we can include middleware to verify the user data 
from the session
```JS
function isAuth(req,res,next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource.' })
    }
}

router.get('/protected-route',isAuth,(req,res,next)=>{
    ....
})
```
If the user roles like `admin` are saved in the db, we can verify their roles with by updated the auth middleware to check 
`(req.isAuthenticated() && req.user.admin)` before giving access to the route.

> [!Note]
> `app.use(passport.initialize())` is no longer required to include in current versions of **Passport**.