import { Router } from "express";
import { authJWT } from "../middleware/auth.js";

const router = Router();

router.use(authJWT);

router.get('/', (req,res)=>{
    res.status(200).json({message: 'you accessed a secure route'});
})

export { router }
