import { Router } from "express";
import { authJWT } from "../../../shared/middleware/auth.js";
import {
    createGroupChat, getAllConversations, getAllGroups,
    getAnyConvMessages, getPrivateConversation, getRegisteredMembers,
    getUserProfile, newGroupJoinRequest, processFriendDelete,
    processFriendRequest, pushMessageEvent, updateProfile
} from "../controller/chatController.js";


const router = Router();


router.get('/community', authJWT, getRegisteredMembers)
router.get('/add-friend', authJWT, processFriendRequest)
router.get('/remove-friend', authJWT, processFriendDelete)
router.post('/create-group', authJWT, createGroupChat)
router.get('/groups', authJWT, getAllGroups)
router.get('/user-chats', authJWT, getAllConversations)
router.get('/create-convo', authJWT, getPrivateConversation)
router.get('/conv-hist/:conversationId', authJWT, getAnyConvMessages)
router.get('/join-group/:conversationId', authJWT, newGroupJoinRequest)
router.post('/conversation/:conversationId', authJWT, pushMessageEvent)
router.get('/get-user-profile', authJWT, getUserProfile)
router.post('/update-user-profile', authJWT, updateProfile)


export { router };
