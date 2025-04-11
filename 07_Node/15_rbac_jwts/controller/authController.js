import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser,clearAllUsers,retrieveUserByEmail } from "./dbController.js";

async function register(req, res, next) {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await clearAllUsers(); // Delete entries for testing purposes
        const newUser = await createUser(username, email, hashedPassword);
        return res.status(201).json({message: `User Registered with ${newUser.email}`})
        // res.redirect("/v1/auth/login");
    } catch(err) {
        return res.status(500).json({message: "Incorrect form structure"})
    }
}


async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await retrieveUserByEmail(email);
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({message: "invalid username or password"})
        } else {
            const token = jwt.sign(
                { id: user.id, role: user.role }, 
                process.env.JWT_SECRET,
                { expiresIn: "1m" }
            )
            return res.status(200).json({
                message: "successfully signed in",
                token: token
            })
        }
    } catch(err) {
        return res.status(500).json({message: "user does not exist, please signup"})
    }
}


export { register, login }