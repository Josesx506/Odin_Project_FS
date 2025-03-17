const bcrypt = require("bcryptjs");
const passport = require('passport');
const dbController = require('./dbController');
const { validationResult } = require('express-validator');


function getRegisterUser(req, res) {
    if(req.user){
        res.redirect('/');
    } else {
        res.render("auth/signUp", {
            title: "sign up"
        })
    };
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
        
        // Log the user in after registration
        req.login(user[0], (err) => {
          if (err) {
            return next(err);
          }
            return res.redirect('/');
        });
      
      } catch(err) {
        return next(err);
      }
    }
}


function getSignUserIn(req, res) {
    if(req.user){
        res.redirect('/');
    } else {
        res.render("auth/signIn", {
        title: "sign in"
    })};
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
    res.render('auth/admin', {
        title: "update membership",
        alert: req.flash('alert'),
    })
}

async function postAdmin (req, res, next) {
    const status = req.user.admin ? 'admin' : 'basic';
    if (status !== req.body.status) {
        await dbController.updateUserStatus(req.user.id,req.body.status);
        req.flash('alert',`User Role: ${req.body.status}`);
    } else {
        req.flash('alert',"No changes detected!");
    }
    res.redirect('/auth/admin');
}

module.exports = { 
    getRegisterUser,postRegisterUser,
    getSignUserIn,postSignUserIn,
    getSignUserOut,getAdmin,postAdmin
}