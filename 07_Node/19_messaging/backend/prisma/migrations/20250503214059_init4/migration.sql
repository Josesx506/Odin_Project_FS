-- DropForeignKey
ALTER TABLE "ChatConvoParticipant" DROP CONSTRAINT "ChatConvoParticipant_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "ChatConvoParticipant" DROP CONSTRAINT "ChatConvoParticipant_userId_fkey";

-- AddForeignKey
ALTER TABLE "ChatConvoParticipant" ADD CONSTRAINT "ChatConvoParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ChatUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatConvoParticipant" ADD CONSTRAINT "ChatConvoParticipant_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "ChatConvo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
