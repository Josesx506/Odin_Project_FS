import { Router } from "express";
import { register, login, logout } from "../controller/authController.js";


const router = Router();


router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)


export { router }