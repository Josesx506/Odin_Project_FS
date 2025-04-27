import { Router } from "express";
import { authEmail } from "../../../shared/middleware/auth.js";
import { generateLoginJWT, logout, register, refreshJWT } from "../controller/authController.js";

const router = Router();

router.post('/signup', register);
router.post('/signin', authEmail, generateLoginJWT);
router.get('/signout', logout);
router.get('/refresh', refreshJWT); // Refresh Access token using http only cookies


export { router }