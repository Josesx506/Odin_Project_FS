import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../config/options.js";
import { ROLES } from "../config/roles.js";
import {
    createGenericUser, createUserWithRole,
    retrieveUserByEmail, retrieveUserByToken,
    updateRefreshToken
} from "../controller/prismadb.js";


async function register(req, res, next) {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    if (role && !Object.keys(ROLES).includes(role)) {
        return res.status(404).json({message: "Invalid signup designation"})
    }
    
    try {
        const avail = await retrieveUserByEmail(email);
        if (avail) {
            return res.status(404).json({message: `Selected email is unavailable`})
        }
        let newUser;
        if (role) {
            newUser = await createUserWithRole(username, email, hashedPassword, role);
        } else {
            newUser = await createGenericUser(username, email, hashedPassword);
        }
        return res.status(201).json({message: `New user registered with ${newUser.email}`})
    } catch(err) {
        return res.status(500).json({message: "Incorrect form structure"})
    }
}


async function generateLoginJWT(req,res,next) {
    try {
      const user = req.user;
  
      // Generate the access and referesh tokens
      const accessToken = jwt.sign(
        { id: user.id, role: user.role }, 
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "5m" }
      )
      const refreshToken = jwt.sign(
        { id: user.id }, 
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "1d" }
      )
  
      // Save the refresh token to the db. Will be removed on logout
      await updateRefreshToken(user.id,refreshToken);
      
      // Send the refresh token as a httpOnly cookie that's unavailable to JS
      res.cookie('jwt', refreshToken, cookieOptions);
  
      // Send the accessToken that expires quickly as JSON
      return res.status(200).json({
          message: "successfully signed in",
          token_type: "Bearer",
          token: accessToken
      })
    } catch(err) {
      next(err);
    }
}

async function refreshJWT(req,res,next) {
    const cookies = req.cookies;

    if (!cookies?.jwt || cookies?.jwt === ' ') {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    // Get the user from db using the refresh token
    const refreshToken = cookies.jwt;
    const user = await retrieveUserByToken(refreshToken);
    if (!user) {
        return res.status(403).json({ message: "Forbidden" });
    }

    // Evaluate jwt
    try {
        const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        if (Number(decode.id) !== user.id) {
            return res.status(403).json({ message: "Forbidden" })
        } else {
            const accessToken = jwt.sign(
                { id: user.id, role: user.role }, 
                process.env.JWT_ACCESS_SECRET,
                { expiresIn: "5m" }
            )
            return res.json({token: accessToken});
        }
    } catch(err) {
        return res.status(403).json({ message: "Forbidden" });
    }  
}

async function logout(req,res) {
    // Don't forget to delete access token on client
    const cookies = req.cookies;

    if (!cookies?.jwt || cookies?.jwt === ' ') {
        return res.status(204).json({ message: "No content" });
    }

    // Get the user from db using the refresh token
    const refreshToken = cookies.jwt;
    const user = await retrieveUserByToken(refreshToken);

    res.clearCookie('jwt', cookieOptions);

    if (!user) {
        return res.status(204).json({ message: "No Content" });
    } else {
        const clearUser = await updateRefreshToken(user.id, null);
        return res.status(204).json({ message: "No Content" });
    }
}


export { generateLoginJWT, logout, refreshJWT, register };
