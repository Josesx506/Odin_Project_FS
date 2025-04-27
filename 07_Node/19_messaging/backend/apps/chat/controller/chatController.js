import { getIO } from '../../../servers/socket.js';

function sendPrivateMessage(req,res) {
    const { userId } = req.params;
    const { message } = req.body;
    const io = getIO();
    console.log(userId)

    io.to(`privateChat:${userId}`).emit('privateMessage', { 
        // sender: "joerogan@odin.com",//req.user.email
        message, 
        userId
    });

    res.json({ status: 'Message sent!' });
}

export { sendPrivateMessage }