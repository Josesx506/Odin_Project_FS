import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config';
import express from 'express';
import { corsOptions } from "./config/options.js";
import { passport } from './config/passport.js';
import { sessionMiddleware } from './config/session.js';
import { logRequests } from './controller/logger.js';
import { credentials } from './middleware/credentials.js';
import { router as authRouter } from './routes/auth.js';
import { router as postsRouter } from './routes/posts.js';
import { router as usersRouter } from './routes/users.js';
import { router as searchRouter } from './routes/search.js'

const app = express();

// Load library middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(credentials);
app.use(cors(corsOptions));

// Middleware for auth
app.use(sessionMiddleware)
app.use(passport.session());

// Basic middleware - Logger
app.use(logRequests);

app.use('/v1/auth', authRouter);
app.use('/v1/social', postsRouter);
app.use('/v1/social', usersRouter);
app.use('/v1/social', searchRouter);

app.get('/', (req,res)=>{
    res.send('Welcome to the odin capstone social media server')
})


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Express app is listening on port: ${port}`)
})