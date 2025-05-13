import cookieParser from "cookie-parser";
import cors from "cors";
import express from 'express';
import { sessionMiddleware } from './config/session.js';
import { passport } from './config/passport.js'
import 'dotenv/config';
import { router as authRouther } from './routes/auth.js';
import { logRequests } from './controller/logger.js'

const app = express();

// Load library middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Middleware for auth
app.use(sessionMiddleware)
app.use(passport.session());

// Basic middleware - Logger
app.use(logRequests);

app.use('/v1/auth', authRouther);


app.get('/', (req,res)=>{
    res.send('Welcome to the odin capstone social media server')
})

/////////////////////////////////////////////////////
// Clean up incomplete
app.get('/github', (req,res)=>{
    res.send('<a href="/v1/auth/github">Login with Github</a>')
})
app.get('/profile', (req,res)=>{
    res.json(req.user)
})
/////////////////////////////////////////////////////


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Express app is listening on port: ${port}`)
})