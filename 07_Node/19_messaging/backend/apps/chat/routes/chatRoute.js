import { Router } from "express";
import { sendPrivateMessage } from "../controller/chatController.js";


const router = Router();


router.post('/pchat/:userId', sendPrivateMessage)

export { router }