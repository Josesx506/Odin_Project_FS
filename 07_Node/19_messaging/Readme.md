### Summary
Real-time chat based application built with Express, Postgres, React, and SocketIo. Maintains bidirectional communication 
between server and clients during conversations. 

### Features
- Send messages
- Follow and unfollow other users
- Create public group chats
- Join other group chats
- Update profile information

### Auth
Http and Websocket server were both secured using stateless JWTs. Access tokens were saved in react state (memory) and refresh 
tokens were saved in http-only cookies.

### Todo
- [ ] Include images in chat with supabase. There were other pressing priorities
