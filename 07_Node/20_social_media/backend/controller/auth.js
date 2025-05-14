import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../config/options.js";
import {
  createUserWithoutRole, retrieveUserByEmail,
  retrieveUserByToken, updateRefreshToken
} from "./prismadb.js";

async function register(req, res, next) {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const avail = await retrieveUserByEmail(email);
    if (avail) {
      return res.status(404).json({ message: `Selected email is unavailable` })
    }
    const newUser = await createUserWithoutRole(name, email, hashedPassword);
    return res.status(200).json({ message: `New user registered with ${newUser.email}` })
  } catch (err) {
    return res.status(500).json({ message: "Incorrect form structure" })
  }
}

async function generateLoginJWT(req, res, next) {
  try {
    const user = req.user;

    // Generate the access and referesh tokens
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    )
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "1d" }
    )

    // Save the refresh token to the db. Will be removed on logout
    await updateRefreshToken(user.id, refreshToken);

    // Send the refresh token as a httpOnly cookie that's unavailable to JS
    res.cookie('accessJwt', accessToken, cookieOptions);
    res.cookie('refreshJwt', refreshToken, cookieOptions);

    // Redirect to the client feed
    return res.redirect(`${process.env.CLIENT_URL}/feed`)
  } catch (err) {
    next(err);
  }
}

async function refreshJWT(req, res, next) {
  const cookies = req.cookies;

  if (!cookies?.refreshJwt || cookies?.refreshJwt === ' ') {
    return res.status(401).json({ message: "Unauthorized: No refresh token provided" });
  }

  // Get the user from db using the refresh token
  const refreshToken = cookies.refreshJwt;
  const user = await retrieveUserByToken(refreshToken);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Evaluate jwt
  try {
    const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    if (Number(decode.id) !== user.id) {
      return res.status(403).json({ message: "Forbidden: Invalid token" })
    } else {
      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "15m" }
      )

      // Update the access token
      res.cookie('accessJwt', accessToken, cookieOptions);

      return res.status(200).json({ message: "updated access token" })
    }
  } catch (err) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
}

async function logout(req, res) {
  // Don't forget to delete access token on client
  const cookies = req.cookies;

  if (!cookies?.refreshJwt || cookies?.refreshJwt === ' ') {
    return res.status(204).json({ message: "No content" });
  }

  // Get the user from db using the refresh token
  const refreshToken = cookies.refreshJwt;
  const user = await retrieveUserByToken(refreshToken);

  // Clear both cookies
  res.clearCookie('accessJwt', cookieOptions);
  res.clearCookie('refreshJwt', cookieOptions);

  if (!user) {
    return res.status(204).json({ message: "No Content" });
  } else {
    const clearUser = await updateRefreshToken(user.id, null);
    return res.status(204).json({ message: "No Content" });
  }
}

export { generateLoginJWT, logout, refreshJWT, register };
