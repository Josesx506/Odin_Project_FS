const express = require('express');
const sessionMdlwr = require('./config/session');

const cloudinary = require('./config/cloudinary');
const flash = require("connect-flash");
const passport = require('./config/passport').passport;
const utils = require('./utils');

// Routes
const authRoute = require('./routes/auth');
const driveRoute = require('./routes/drive');

const app = express();

// Middleware for views, json, and form body
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Middleware for auth
app.use(sessionMdlwr);
app.use(passport.session());
app.use(flash());               
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Middleware for routes
app.use('/auth',authRoute);
app.use('/drive',driveRoute);


// INCOMPLETE
app.get("/",(req,res)=>{
    res.render("index",{
        title: "Odin Drive"
    })
})

// Error Handlers
app.use((req, res, next)=>{
    const err = new Error("Page not found");
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).render('404', {
        title: 'error page',
        id : err.status || 500, 
        error: err.message 
    });
})


app.listen(3000, ()=>{
    console.log("Express app is listening on port 3000");
})