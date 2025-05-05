import { Router } from "express";
import { authJWT } from "../../../shared/middleware/auth.js";
import {
    createGroupChat, getAllConversations, getAllGroups,
    getAnyConvMessages, getPrivateConversation, getRegisteredMembers,
    newGroupJoinRequest, processFriendDelete, processFriendRequest, pushMessage
} from "../controller/chatController.js";


const router = Router();


router.post('/conversation/:conversationId', authJWT, pushMessage)
router.get('/community', authJWT, getRegisteredMembers)
router.get('/add-friend', authJWT, processFriendRequest)
router.get('/remove-friend', authJWT, processFriendDelete)
router.post('/create-group', authJWT, createGroupChat)
router.get('/groups', authJWT, getAllGroups)
router.get('/user-chats', authJWT, getAllConversations)
router.get('/create-convo', authJWT, getPrivateConversation)
router.get('/conv-hist/:conversationId', authJWT, getAnyConvMessages)
router.get('/join-group/:conversationId', authJWT, newGroupJoinRequest)


export { router };
