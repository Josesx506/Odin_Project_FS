import cookieParser from "cookie-parser";
import cors from "cors";
import express from 'express';
import { corsOptions } from "../config/options.js";
import { passport } from '../config/passport.js';
import { sessionMiddleware } from '../config/session.js';
import { logRequests } from '../shared/controller/logger.js';
import { credentials } from "../shared/middleware/credentials.js";


const app = express();

// Load library middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(credentials);
app.options('/v1/*path', cors(corsOptions)); // Preflight cors
app.use(cors(corsOptions));

// Middleware for auth
app.use(sessionMiddleware);
app.use(passport.session());

// Basic middleware - Logger
app.use(logRequests);


// Routes


app.get("/",(req,res)=>{
    res.send("Received request\n");
})


export { app };
