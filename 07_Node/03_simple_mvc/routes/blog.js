const express = require('express');
const blogController = require('../controller/blogController');


const router = express.Router();

// Define a middleware to get the baseUrl from the router name if it exists
router.use((req,res,next)=>{
    res.locals.title = req.baseUrl;
    next();
})

router.get('/', blogController.getBlogs);
router.get('/about', blogController.getBlogAbout);
router.get('/articles', blogController.getBlogArticles);

module.exports = router;