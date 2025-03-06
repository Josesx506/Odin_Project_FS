const express = require('express');
const fileController = require('../controller/fileController');
const dbController = require('../controller/dbController')

const router = express.Router();

// Middleware for post requests
router.use(express.urlencoded({ extended: true }));

router.use((req,res,next)=>{
    res.locals.baseUrl = req.baseUrl;
    next();
})

// Using the postgres db to store data (railway prod deployment only)
// router.get('/',dbController.getMessages)
// router.post('/new', dbController.postNewMessage)
// router.get('/new/:id', dbController.getMessageId)


// Using the ../model/data.js file to store data (local deployment)
router.get('/',fileController.getMessages)
router.post('/new', fileController.postNewMessage)
router.get('/new/:id', fileController.getMessageId)


router.use((err, req, res, next) => {
    res.status(404).render('404', { 
        title: '404 Not Found', 
        id : err.id, 
        error: err.message });
});

module.exports = router;