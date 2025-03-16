const utils = require('../utils');
const bcrypt = require("bcryptjs");
const passport = require('passport');
const pool = require('../config/pool');
const router = require('express').Router();

router.get("/register", (req, res) => res.render("sign-up-form"));

router.post("/register", async (req, res, next) => {
    try {
      // insert a new row into the db and return the id column only
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const { rows } = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id", [
        req.body.username,
        hashedPassword,
      ]);

      // Use the user data to generate a jwt. 
      // This JWT is redundant because jwt's are required after login
      const jwt = utils.issueJWT(rows[0]);

      // JSON output if working with a frontend server
      // res.json({ success: true, token: jwt.token, expiresIn: jwt.expires }); 

      // EJS views template
      return res.render('index', { 
        user: {username: req.body.username}, 
        token: jwt.token 
      });
    } catch(err) {
      return next(err);
    }
});

router.post(
    "/login", (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      
      if (!user) {
        return res.status(401).render('404', {
          id : 401, 
          error: info.message || "Login failed"
        });
      }
      
      // User authenticated, generate JWT
      const jwt = utils.issueJWT(user);
      
      // Return the token to the json
      return res.render('index', { 
        user: user, 
        token: jwt.token
      });
    })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get('/protected', 
  passport.authenticate('jwt', 
    {session: false}),
  (req,res,next) => {
    res.status(200).json({ success: true, msg: 'You are authorized to access this protected route' });
  }
);

router.use((err, req, res, next) => {
  res.status(404).render('404', {
      id : err.id, 
      error: err.message 
  });
});

module.exports = router;