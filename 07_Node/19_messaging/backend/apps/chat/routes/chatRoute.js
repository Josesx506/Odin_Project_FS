import { Router } from "express";
import { authJWT } from "../../../shared/middleware/auth.js";
import {
    getRegisteredMembers, processFriendDelete,
    processFriendRequest, pushMessage, createGroupChat,
    getAllGroups
} from "../controller/chatController.js";


const router = Router();


router.post('/conversation/:conversationId', authJWT, pushMessage)
router.get('/community', authJWT, getRegisteredMembers)
router.get('/add-friend', authJWT, processFriendRequest)
router.get('/remove-friend', authJWT, processFriendDelete)
router.post('/create-group', authJWT, createGroupChat)
router.get('/groups', authJWT, getAllGroups)

export { router };
