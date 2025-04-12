import jwt from "jsonwebtoken";
import { retrieveUserById } from "../controller/dbController.js";
import { ROLES } from "../config/roles.js";


async function authJWT(req,res,next) {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Forbidden route, No token provided" })
        } 
        
        try {
            const decode = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
            const user = await retrieveUserById(decode.id);
            req.user = user;
            return next();
        } catch(err) {
            return res.status(400).json({ message: "Expired / invalid token, please sign in" })
        }
    } else {
        return res.status(403).json({ message: "Forbidden route" })
    }
}

function authRole(permissions) {
    
    return (req, res, next) => {
        const userPermissions = ROLES[req.user?.role] || [];
        
        const hasPermission = permissions.some((permission) => {
            if (permission.includes("own")) {
                const ownerId = Number(req.query.authorId);
                return (userPermissions.includes(permission) && req.user.id===ownerId)
            } else {
                return userPermissions.includes(permission)
            }
        });
        if (!hasPermission) {
            return res.status(401).json({ message: "Forbidden: Insufficient permissions" });
        }
        next();
    };
}


export { authJWT, authRole };
