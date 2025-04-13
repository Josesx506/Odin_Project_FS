import { Router } from "express";
import { authLocalEmail } from "../middleware/auth.js";
import { generateLoginJWT, logout, register } from "../controller/auth.js";

const router = Router();

router.post('/signup', register);
router.post('/signin', authLocalEmail, generateLoginJWT);
router.get('/signout', logout);


export { router }