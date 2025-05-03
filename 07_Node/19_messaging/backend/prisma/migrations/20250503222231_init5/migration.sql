-- DropForeignKey
ALTER TABLE "ChatFriendship" DROP CONSTRAINT "ChatFriendship_friendId_fkey";

-- DropForeignKey
ALTER TABLE "ChatFriendship" DROP CONSTRAINT "ChatFriendship_userId_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_conversationId_fkey";

-- AddForeignKey
ALTER TABLE "ChatFriendship" ADD CONSTRAINT "ChatFriendship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ChatUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatFriendship" ADD CONSTRAINT "ChatFriendship_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "ChatUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "ChatConvo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "ChatUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
