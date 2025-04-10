import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { users } from './data.js';
import { router as IdxRouter} from './routes/index.js';
import { router as UsrRouter} from './routes/users.js';
import { router as MsgRouter } from './routes/messages.js';


const app = express();

// Define middle-ware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// include before other routes, can also retrieve origins list from backend db
app.use(cors({origin: 'http://localhost:3000'}))
// Create dummy user session with middleware
app.use((req, res, next) => {
    req.me = users[1];
    next();
});

// Routes
app.get('/session', (req, res) => {
    return res.send(users[req.me.id]);
});
app.use(IdxRouter); // Basics
app.use("/users",UsrRouter); // Users
app.use("/messages",MsgRouter); // Messages


app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);