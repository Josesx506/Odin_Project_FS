import { Router } from "express";
import { authLocalEmail } from "../middleware/auth.js";
import { generateLoginJWT, logout, register, refreshJWT } from "../controller/auth.js";

const router = Router();

router.post('/signup', register);
router.post('/signin', authLocalEmail, generateLoginJWT);
router.get('/signout', logout);
router.get('/refresh', refreshJWT); // Refresh Access token using http only cookies


export { router }