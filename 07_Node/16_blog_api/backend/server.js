import cookieParser from "cookie-parser";
import 'dotenv/config';
import express from 'express';
import { passport } from './config/passport.js';
import { sessionMiddleware } from './config/session.js';
import { refreshJWT } from './controller/auth.js';
import { router as authRouter } from './routes/auth.js';

const app = express();

// Load library middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Middleware for auth
app.use(sessionMiddleware);
app.use(passport.session());

// Routes
app.use('/v1/auth',authRouter);
app.use("/v1/refresh", refreshJWT); // Include this after login



const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Backend blog express server listening on port ${PORT}`);
})