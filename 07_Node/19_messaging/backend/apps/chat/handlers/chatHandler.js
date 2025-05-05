

function registerChatHandlers(socket, io) {
  // `socket` = this particular connected client
  // `io` = whole server (for broadcasting)

  console.log(`Registering chat handlers for user`);

  socket.on('joinConversation', (conversationId) => {
    socket.join(`chat:${conversationId}`);
  });

  socket.on('leaveConversation', (conversationId) => {
    socket.leave(`chat:${conversationId}`);
  });
}

export { registerChatHandlers }