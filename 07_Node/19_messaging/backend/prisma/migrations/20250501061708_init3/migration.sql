/*
  Warnings:

  - You are about to drop the column `chatRoomId` on the `ChatMessage` table. All the data in the column will be lost.
  - You are about to drop the `ChatRoom` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `conversationId` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_chatRoomId_fkey";

-- DropForeignKey
ALTER TABLE "ChatRoom" DROP CONSTRAINT "ChatRoom_authorId_fkey";

-- DropIndex
DROP INDEX "ChatMessage_chatRoomId_idx";

-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "chatRoomId",
ADD COLUMN     "conversationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ChatRoom";

-- CreateTable
CREATE TABLE "ChatConvo" (
    "id" SERIAL NOT NULL,
    "convoName" TEXT,
    "isGroup" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatConvo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatConvoParticipant" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,

    CONSTRAINT "ChatConvoParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatConvoParticipant_userId_conversationId_key" ON "ChatConvoParticipant"("userId", "conversationId");

-- CreateIndex
CREATE INDEX "ChatMessage_conversationId_idx" ON "ChatMessage"("conversationId");

-- AddForeignKey
ALTER TABLE "ChatConvoParticipant" ADD CONSTRAINT "ChatConvoParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ChatUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatConvoParticipant" ADD CONSTRAINT "ChatConvoParticipant_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "ChatConvo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "ChatConvo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
