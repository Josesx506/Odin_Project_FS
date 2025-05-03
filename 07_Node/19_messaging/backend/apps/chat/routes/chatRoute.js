import { Router } from "express";
import { pushMessage, getRegisteredMembers } from "../controller/chatController.js";
import { authJWT } from "../../../shared/middleware/auth.js";


const router = Router();


router.post('/conversation/:conversationId', authJWT, pushMessage)
router.get('/community', authJWT, getRegisteredMembers)

export { router }