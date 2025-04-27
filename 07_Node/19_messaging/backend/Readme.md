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


### Postman
In postman, click on the `New` button to add a `Socket.io` request. This cannot be used with a http collection. Once the socket is added, 
use the server url to connect to it e.g.`http:localhost:3000`. The connection is persisted, and you can add event topics to your connection 
under the events tab. There's a toggle button to listen to new events.

### Rooms
To listen to events from a room, you need to have joined the room. On the client, from the sidebar, for each link that they click on, a 
`useEffect` can be used to join the room. That way all new messages sent to the room will be visible to everyone connected to that room.
```JS
socket.join(`groupChat:${roomId}`);
```