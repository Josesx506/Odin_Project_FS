const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const strategy = require('./config/passport');
const expSessConf = require('./config/exp_session');
const authRoute = require('./routes/auth');
require('dotenv').config();

const app = express();

// View template
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(expSessConf)                  // express-session
app.use(passport.session());          // passportjs
passport.use(strategy.localStrategy); // local strategy for login
passport.use(strategy.jwtStrategy);   // jwt strategy
app.use(cors());                      // cors for communicating with frontend


// Routes
app.use('/auth',authRoute);    // Auth Route

app.get("/", (req, res) => {
    res.render("index", { 
      user: null,
      token: null
    });
});

app.listen(3000, () => console.log("app listening on port 3000!"));