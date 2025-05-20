import { getIO } from '../../../servers/socket.js';
import {
    addNewFriend, createGroupConversation,
    createNewMessage,
    createSingleConversation,
    findGroupConvoByName, getAllGroupConversations, getAllUserConversations,
    getAllUserFriends,
    getAllUsers, getConversationMessages, joinGroupConversation, removeExistingFriend,
    updateUserProfile
} from '../../../shared/controller/prismadb.js';

async function getRegisteredMembers(req,res) {
    const userId = req.user?.id;
    try {
        const users = await getAllUsers(userId);
        res.json(users)
    } catch(err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
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

async function createGroupChat(req,res) {
    const userId = req.user?.id;
    const { groupname } = req.body;
    try {
        const exists = await findGroupConvoByName(groupname.toLowerCase())
        if (exists) {
            return res.status(409).json({ message: 'Group name already exists' });
        }
        else {
            const convo = await createGroupConversation(userId, groupname.toLowerCase());
            return res.status(200).json( convo );
        }
    } catch(err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
}

async function getAllGroups(req,res) {
    try {
        const convos = await getAllGroupConversations();
        res.status(200).json(convos)
    } catch(err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
}

async function getAllConversations(req,res) {
    const userId = req.user?.id;
    try {
        const friends = await getAllUserFriends(userId);
        const conversations = await getAllUserConversations(userId);
        res.status(200).json({ conversations, friends })
    } catch(err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
}

async function getPrivateConversation(req,res) {
    const userId = req.user?.id;
    const { targetId } = req.query;

    try {
        const convoId = await createSingleConversation(userId, Number(targetId))
        const url = `/chat/${convoId}?targetId=${targetId}`;
        res.status(200).json({ url })
    } catch(err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
}


async function getAnyConvMessages(req,res) {
    const userId = req.user?.id;
    const { conversationId } = req.params;

    try {
        const data = await getConversationMessages(Number(conversationId), userId);
        res.status(200).json(data)
    } catch(err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
}

async function newGroupJoinRequest(req,res) {
    const userId = req.user?.id;
    const { conversationId } = req.params;

    try {
        const grpSize = await joinGroupConversation(Number(conversationId), userId);
        res.status(200).json({ grpSize })
    } catch(err) {
        if (err.code === 'P2025') {
            return res.status(403).json({ message: "Denied rejoin request"});
        }
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
    
}

async function pushMessageEvent(req,res) {
    const { conversationId } = req.params;
    const { message, uploadurl } = req.body;
    const io = getIO();
    const user = req.user;
    const userId = req.user?.id;

    try {
        // Save the message to db
        const newMsg = await createNewMessage(Number(conversationId), userId, message, uploadurl)
        
        // Broadcast the message to the room
        io.to(`chat:${conversationId}`).emit('newMessage', { 
            id: newMsg.id,
            authorId: userId,
            name: user.name,
            authorimage: user.image,
            body: newMsg.body, 
            msgimage: newMsg.imageurl,
            createdAt: newMsg.createdAt
        });
    
        res.status(200).json({ message: 'Message sent!' });
    
    } catch(err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
}

async function getUserProfile(req,res) {
    const user = req.user;
    const filtUser = {
        name: user.name,
        email: user.email,
        image: user.image,
        bio: user.bio,
    }
    try {
        res.status(200).json({ user: filtUser })
    } catch(err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
}

async function updateProfile(req,res) {
    const userId = req.user?.id;
    const { id, name, image, bio } = req.body;

    if (Number(id) !== userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const updt = await updateUserProfile(userId, name, image, bio )
        res.status(200).json({ message: 'Profile updated' });
    } catch(err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    } 
}

export {
    createGroupChat, getAllConversations, getAllGroups, getAnyConvMessages, 
    getPrivateConversation, getRegisteredMembers, getUserProfile, 
    newGroupJoinRequest, processFriendDelete, processFriendRequest, 
    pushMessageEvent, updateProfile
};
