const bcrypt = require("bcryptjs");
const passport = require('passport');
const dbController = require('./dbController');
const { validationResult } = require('express-validator');


function getRegisterUser(req, res) {
    res.render("auth/signUp", {
        title: "sign up"
    });
}

async function postRegisterUser (req, res, next) {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).render("auth/signUp", {
        title: "Sign up",
        errors: errors.array(),
      });
    
    } else {
      
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await dbController.registerUser(req.body.username,req.body.email,hashedPassword);
        
        return res.render('index', { 
          title: 'Home page',
          user: {username: req.body.username}
        });
      
      } catch(err) {
        return next(err);
      }
    }
}


function getSignUserIn(req, res) {
    res.render("auth/signIn", {
        title: "sign in"
    });
}

async function postSignUserIn (req, res, next) {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render("auth/signIn", { 
                title: "sign in",
                errors: [ {msg: info.message} ]
            });
        }
        // Successful login
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect("/");
        });
    })(req, res, next);
}

function getSignUserOut(req, res, next) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
}

function getAdmin(req, res, next) {
    console.log(req.query)
    res.render('auth/admin', {
        title: "update membership",
    })
}

async function postAdmin (req, res, next) {
    await dbController.updateUserStatus(req.user.id,req.body.status);
    res.redirect('/auth/admin?err=' + encodeURIComponent(`User Role is now: ${req.body.status}`));
}

module.exports = { 
    getRegisterUser,postRegisterUser,
    getSignUserIn,postSignUserIn,
    getSignUserOut,getAdmin,postAdmin
}