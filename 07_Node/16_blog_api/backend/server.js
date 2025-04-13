import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config';
import express from 'express';
import { corsOptions } from "./config/options.js";
import { passport } from './config/passport.js';
import { sessionMiddleware } from './config/session.js';
import { refreshJWT } from './controller/auth.js';
import { credentials } from "./middleware/credentials.js";
import { router as adminRouter } from "./routes/admin.js";
import { router as authRouter } from './routes/auth.js';

const app = express();

// Load library middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(credentials);
app.use(cors(corsOptions));

// Middleware for auth
app.use(sessionMiddleware);
app.use(passport.session());

// Routes
app.use('/v1/auth',authRouter);
app.use("/v1/refresh", refreshJWT); // Include this after login
app.use('/v1/panel',adminRouter);   // Admin panel routes



const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Backend blog express server listening on port ${PORT}`);
})