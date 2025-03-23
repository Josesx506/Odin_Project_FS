const router = require('express').Router();
const validate = require('../config/validator');
// const authCntlr = require('../controller/authController');

// Middleware to add the baseUrl to response.locals
router.use((req,res,next)=>{
  res.locals.baseUrl = req.baseUrl;
  next();
})

router.get("/", (req,res)=>{
    res.render("drive", {
        title: "Media Drive"
    })
});


module.exports = router;