const data = require('../model/data');

function getMessages(req,res) {
    res.render('index', { 
            title: "Mini Messageboard",
            messages: data.messages,
            timeOpt: data.timeOptions,
            dateOpt: data.dateOptions
    });
}

function postNewMessage(req,res) {
    const newMsg = req.body;
    data.messages.push({ 
        text: newMsg.message, 
        username: newMsg.author, 
        added: new Date(),
        id: crypto.randomUUID() });
    res.redirect("/");
}

function getMessageId(req,res,next) {
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
}

module.exports = { 
    getMessages,
    postNewMessage,
    getMessageId 
}