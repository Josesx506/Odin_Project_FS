// controllers/usersController.js
const usersStorage = require("../model/usersStorage");
const { body, query, validationResult } = require("express-validator");
// This just shows the new stuff we're adding to the existing contents

// insert 2 empty entries at the beginning
usersStorage.addUser({ 
  firstName: "John", 
  lastName: "Doe", 
  email: "johndoe@odin.com", 
  age: "25", 
  bio: "Bio shall not be known" 
});

usersStorage.addUser({ 
  firstName: "Jane", 
  lastName: "Doe", 
  email: "janedoe@odin.com", 
  age: "22", 
  bio: "I'm learning node js" 
});

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
  body("email")
    .trim()
    .isEmail(),
  body("age")
    .optional({ checkFalsy: true })
    .trim()
    .isInt().withMessage(`Age must be a number`)
    .isInt({ min: 18, max: 120 }).withMessage('Age must be between 18 and 120'),
  body("bio")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 }).withMessage('Bio length should not exceed 200 characters')
    .escape(),
];

const validateSearch = [
    query("name")
      .optional({ checkFalsy: true })
      .trim()
      .isAlpha().withMessage(`Name ${alphaErr}`)
      .isLength({ min: 1, max: 10 }).withMessage(`Name ${lengthErr}`),
    query("email")
      .optional({ checkFalsy: true })
      .trim()
      .isEmail(),
];

function usersListGet(req, res) {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

function usersCreateGet(req, res) {
  res.render("createUser", {
    title: "Create User",
  });
};


// We can pass an entire array of middleware validations to our controller.
const usersCreatePost = [
  // Pass in form validation checks and an anonymous function to create middleware
  validateUser, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create User",
        errors: errors.array(),
      });
    }

    // Extract the form body only after it has been validated
    const { firstName, lastName, email, age, bio } = req.body;

    // Write the results to a js class representative of a db
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  }
];


function usersUpdateGet(req, res) {
    const user = usersStorage.getUser(req.params.id);
    res.render("updateUser", {
      title: "Update user",
      user: user,
    });
};
  
const usersUpdatePost = [
    validateUser,
    (req, res) => {
      const user = usersStorage.getUser(req.params.id);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("updateUser", {
          title: "Update user",
          user: user,
          errors: errors.array(),
        });
      }
      const { firstName, lastName, email, age, bio } = req.body;
      usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
      res.redirect("/");
    }
];


// Tell the server to delete a matching user, if any. Otherwise, respond with an error.
function usersDeletePost(req, res) {
    usersStorage.deleteUser(req.params.id);
    res.redirect("/");
};

// Validate get params inside req.query with express validator query()
const usersSearchGet = [ 
    validateSearch,(req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
          return res.status(400).render("search", {
            title: "Find user",
            errors: errors.array(),
            users: [],
          });
        }
        
        const name = req.query.name || "";
        const email = req.query.email || "";
        const users = usersStorage.findUser(name,email);
        
        res.render("search", {
        title: "User Search",
        users: users,
        });
}]



module.exports = { 
    usersListGet,usersCreateGet,usersCreatePost,
    usersUpdateGet,usersUpdatePost,usersDeletePost,
    usersSearchGet 
}