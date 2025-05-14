/*
  Warnings:

  - Added the required column `fullname` to the `SocialUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SocialUser" ADD COLUMN     "fullname" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SocialFriendship" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "friendId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialFriendship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SocialFriendship_userId_friendId_key" ON "SocialFriendship"("userId", "friendId");

-- AddForeignKey
ALTER TABLE "SocialFriendship" ADD CONSTRAINT "SocialFriendship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SocialUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialFriendship" ADD CONSTRAINT "SocialFriendship_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "SocialUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
