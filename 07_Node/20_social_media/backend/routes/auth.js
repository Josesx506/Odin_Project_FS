import { Router } from "express";
import { generateLoginJWT, logout, register, refreshJWT } from "../controller/auth.js";
import { authEmail, authOAuth } from '../middleware/auth.js';

const router = Router();

router.post('/signup', register);
router.post('/signin', authEmail, generateLoginJWT);
router.get('/github', authOAuth); 
router.get('/github/callback', authOAuth, generateLoginJWT )
router.get('/refresh', refreshJWT);
router.get('/signout', logout);

export { router };
