const path = require('path');
const express = require('express');
const passport = require('./config/passport').passport;
const expressSessConf = require('./config/express-session');
const passportStrategy = require('./config/passport').localStrategy;
const authRoute = require('./routes/auth');
const flash = require("connect-flash");

app = express();

// Middleware for views and body parsing
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));

// Middleware for authentication
app.use(expressSessConf)              // express-session
app.use(passport.session());          // passportjs
passport.use(passportStrategy);       // local strategy

app.use(flash());
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Middleware for routes
app.use('/auth',authRoute)


app.get("/", (req, res) => {
    console.log(req.session, res.locals)
    res.render("index",{title: "Home Page"})
})


app.listen(3000, ()=>{
    console.log('Express app started on port 3000')
})