const db = require("../model/queries");

async function getMessages(req, res) {
    const messages = await db.getAllMessages();
    res.render('index', { 
            title: "Mini Messageboard",
            messages: messages,
            timeOpt: db.timeOptions,
            dateOpt: db.dateOptions
    });
}

async function postNewMessage(req,res) {
    const newMsg = req.body;
    await db.insertMessage(newMsg.author,newMsg.message);
    res.redirect("/");
}

async function getMessageId(req,res,next) {
    const id = req.params.id;
    const msg = await db.findMessage(id);
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