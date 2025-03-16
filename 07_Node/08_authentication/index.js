/////// app.js
const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const pgStore = require("connect-pg-simple")(session);
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
require("dotenv").config();

const pool = new Pool({connectionString: process.env.DBURI});

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware function for saving user session

// expression session middleware
app.use(session({ 
  store: new pgStore({
    pool : pool,
    tableName : 'user_sessions', // this table is not created by default
  }),
  secret: "cats", // should be stored as an env variable
  resave: false, 
  saveUninitialized: false,
  cookie: { maxAge: 6 * 60 * 60 * 1000 } // 6 hours
}));

// Passport middleware
app.use(passport.session());

// Static and json encoding middleware
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }));

// Local Strategy
async function verifyCallback(username, password, done) {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = rows[0];

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  } catch(err) {
    return done(err);
  }
}
const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);

// Passport Serializer
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      const user = rows[0];
  
      done(null, user);
    } catch(err) {
      done(err);
    }
});


// ROUTES
app.get("/", (req, res) => {
    // Monitor route view count for a logged in user
    if (req.session.viewCount) {
      req.session.viewCount++;
    } else {
      req.session.viewCount = 1;
    }

    res.render("index", { 
      user: req.user, 
      visits: req.session.viewCount,
    });
});
app.get("/sign-up", (req, res) => res.render("sign-up-form"));
app.post("/sign-up", async (req, res, next) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
        req.body.username,
        hashedPassword,
      ]);
      res.redirect("/");
    } catch(err) {
      return next(err);
    }
});
app.post(
    "/log-in",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/"
    })
);

app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
});
  


app.listen(3000, () => console.log("app listening on port 3000!"));
