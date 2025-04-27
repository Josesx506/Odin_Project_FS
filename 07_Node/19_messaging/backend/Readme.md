### Workflow
I'm using node to host both the express server, and the socket.io servers for chats. The express app handles middlewares and routes. 
Each route can then publish messages to the socket io connection. The react frontend connects to the server, and can subscribe to 
topics from my websocket.
```bash
Express App (middlewares, routes)
          ↓
Create HTTP Server (http.createServer(app))
          ↓
Initialize Socket.IO (setupSocket(server))
          ↓
Start Listening (server.listen(PORT))
```