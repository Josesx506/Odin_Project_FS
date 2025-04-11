import { Router } from "express";
import { authJWT, authRole } from "../middleware/auth.js";


const messages = {
    id: 1,
    body: "A fast fox jumped over a house"
}

const router = Router();

router.get("/guest", (req, res) => {
    res.json({title: "Welcome guest"})
})

router.get("/messages", 
    authJWT, authRole(["view:messages"]), 
    (req, res) => {
    res.json({ title: "Welcome admin", messages,});
    }
);


router.delete("/message/:messageId", authJWT, 
    authRole(["delete:messages","delete:ownMessage"]), 
    (req, res) => {
    res.json({
        title: "Welcome admin",
        messages,
    });
});



export { router }