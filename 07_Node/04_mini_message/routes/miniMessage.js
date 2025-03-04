const express = require('express');
const data = require('../model/data');

const router = express.Router();

// Middleware for post requests
router.use(express.urlencoded({ extended: true }));

router.use((req,res,next)=>{
    res.locals.baseUrl = req.baseUrl;
    next();
})


router.get('/',(req,res)=>{
    res.render('index', { 
            title: "Mini Messageboard",
            messages: data.messages,
            timeOpt: data.timeOptions,
            dateOpt: data.dateOptions
    });
})

router.post('/new', (req,res) => {
    const newMsg = req.body;
    data.messages.push({ 
        text: newMsg.message, 
        user: newMsg.author, 
        added: new Date(),
        id: crypto.randomUUID() });
    res.redirect("/");
})

router.get('/new/:id', (req,res,next) => {
    const id = req.params.id;
    const msg = data.messages.filter((msg)=>msg.id===id);
    if (msg.length===0) {
        const error = new Error("Post not found");
        error.statusCode = 404;
        error.id = id;
        next(error);
    } else {
        res.render('post', { 
            title: "Message Page",
            message: msg[0],
    });
    }
})

router.use((err, req, res, next) => {
    res.status(404).render('404', { 
        title: '404 Not Found', 
        id : err.id, 
        error: err.message });
});

module.exports = router;