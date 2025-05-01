import { Router } from "express";
import { pushMessage } from "../controller/chatController.js";
import { authJWT } from "../../../shared/middleware/auth.js";


const router = Router();


router.post('/:conversationId', authJWT, pushMessage)

export { router }