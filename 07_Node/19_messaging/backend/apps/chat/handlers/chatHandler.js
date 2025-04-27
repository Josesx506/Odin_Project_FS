

function registerChatHandlers(socket, io) {
  // `socket` = this particular connected client
  // `io` = whole server (for broadcasting)

  console.log(`Registering chat handlers for user ${socket.user.email}`);

  socket.on('joinRoom', (roomId) => {
    console.log(`${socket.user.email} joining groupChat/${roomId}`);
    socket.join(`groupChat/${roomId}`);
  });

  socket.on('groupMessage', ({ roomId, message }) => {
    console.log(`New group message in groupChat/${roomId}: ${message}`);

    io.to(`groupChat/${roomId}`)
      .emit('groupMessage', {
        sender: socket.user.email,
        message,
      });
  });

  socket.on('privateMessage', ({ userId, message }) => {
    console.log(`New private message in privateChat/${userId}: ${message}`);
    
    io.to(`privateChat/${roomId}`)
      .emit('privateMessage', {
        sender: socket.user.email,
        message,
      });
  });

  socket.on('leaveRoom', (roomId) => {
    console.log(`${socket.user.email} leaving groupChat/${roomId}`);
    socket.leave(`groupChat/${roomId}`);
  });
}

export { registerChatHandlers }