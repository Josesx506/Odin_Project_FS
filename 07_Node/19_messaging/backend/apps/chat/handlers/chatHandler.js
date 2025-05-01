

function registerChatHandlers(socket, io) {
  // `socket` = this particular connected client
  // `io` = whole server (for broadcasting)

  console.log(`Registering chat handlers for user`);// ${socket.user.email}

  socket.on('joinConversation', (conversationId) => {
    console.log(`${socket.id} joining conversation/${conversationId}`);
    socket.join(`chat:${conversationId}`);
  });

  socket.on('newMessage', ({ conversationId, message }) => {
    console.log(`New message in chat:${conversationId}- ${message}`);

    // Redirect messages to specific conversations
    io.to(`chat:${conversationId}`)
      .emit('newMessage', {
        sender: socket.user.email,
        message,
      });
  });

  socket.on('leaveConversation', (conversationId) => {
    console.log(`${socket.id} leaving conversation/${conversationId}`);
    socket.leave(`chat:${conversationId}`);
  });
}

export { registerChatHandlers }