### Authentication
This app shows how to implement a simple authentication login page with `express`, `express-session`, `passportjs`, and 
`postgres`. Simple views are rendered with `ejs` that display a signup and login page.

### Workflow
- User signs up and the password is hashed with `bcrypt` and saved into the db.
- User can now sign in, and a new browser session is created with a cookie expiry data. The session info is 
    stored in the db, and user info can be added on login or removed on logout till the session expires.
- Subsequent requests verify the user details by validating user data in the session on the server. Only session ids are
    transmitted to the client to persist non-sensitive user info
- Secure routes can be viewed by verifying user data in the session
- User details are removed from the session. Session is only deleted from the db when it expires.


| Routes | Methods | Use case |
| :----- | :------ | :------- |
| `/` | GET | Navigate to homepage |
| `/sign-up` | GET | Navigate to sign up form |
| `/sign-up` | POST | Submit details to the server and redirect to home page |
| `/log-in` | POST | Submit details to the server and redirect to home page showing protected section |
| `/log-out` | GET | Remove user details from session and redirect to home page |


A _dev_ key is added to our package.json file as `"dev": node populateDB.js && node --watch index.js`, and the server can 
be started with `npm run dev`. This allows us to create our session db table and launch the server simultaneously. The 
app can be accessed at http://localhost:3000/.

>[!Note]
> This app is very simple and does not throw errors when the wrong username / password is inserted. It just redirects you 
    to the homepage.