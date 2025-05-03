import { getIO } from '../../../servers/socket.js';
import { addNewFriend, getAllUsers, removeExistingFriend } from '../../../shared/controller/prismadb.js';

async function getRegisteredMembers(req,res) {
    const userId = req.user?.id;
    const users = await getAllUsers(userId);
    res.json(users)
}

async function processFriendRequest(req,res) {
    const userId = req.user?.id;
    const { targetId } = req.query;
    try {
        const added = await addNewFriend(userId, Number(targetId));
        return res.status(200).json( added );
    } catch(err) {
        return res.status(404).json({ message: `You're already connected to this user` });
    }
}

async function processFriendDelete(req,res) {
    const userId = req.user?.id;
    const { targetId } = req.query;
    try {
        const added = await removeExistingFriend(userId, Number(targetId));
        return res.status(200).json( added );
    } catch(err) {
        return res.status(404).json({ message: `You're not friends with this user` });
    }
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

export { getRegisteredMembers, processFriendRequest, pushMessage, processFriendDelete };
