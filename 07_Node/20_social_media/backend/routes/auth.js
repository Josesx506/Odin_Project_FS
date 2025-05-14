import { Router } from "express";
import { generateLoginJWT, logout, register, refreshJWT, OAuthRedirect, validateOTP } from "../controller/auth.js";
import { authEmail, authOAuth } from '../middleware/auth.js';

const router = Router();

router.post('/signup', register);
router.post('/signin', authEmail, generateLoginJWT);
router.get('/github', authOAuth); 
router.get('/github/callback', authOAuth, OAuthRedirect )
router.get('/github/exchange-otp-for-token', validateOTP, generateLoginJWT )
router.get('/refresh', refreshJWT);
router.get('/signout', logout);

export { router };
