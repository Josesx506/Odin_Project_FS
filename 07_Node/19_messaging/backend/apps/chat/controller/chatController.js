import { getIO } from '../../../servers/socket.js';
import { getAllUsers } from '../../../shared/controller/prismadb.js';

async function getRegisteredMembers(req,res) {
    const userId = req.user?.id;
    console.log(userId)
    const users = await getAllUsers(userId);
    res.json(users)
}

function pushMessage(req,res) {
    const { conversationId } = req.params;
    const { message } = req.body;
    const io = getIO();
    const user = req.user;
    const userId = req.user?.id;

    // Save the message to db

    io.to(`chat:${conversationId}`).emit('newMessage', { 
        sender: user.name,
        message, 
        timestamp: '2024'//savedMessage.createdAt
    });

    res.json({ status: 'Message sent!' });
}

export { pushMessage, getRegisteredMembers }