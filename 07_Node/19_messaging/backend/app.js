import http from 'http';
import { app } from './servers/express.js';
import { setupSocket } from './servers/socket.js';
import 'dotenv/config';

const server = http.createServer(app); // create server from express app

setupSocket(server); // attach socket.io to server

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});