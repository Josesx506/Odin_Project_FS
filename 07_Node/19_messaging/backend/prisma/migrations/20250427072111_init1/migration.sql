-- CreateTable
CREATE TABLE "ChatFriendship" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "friendId" INTEGER NOT NULL,

    CONSTRAINT "ChatFriendship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatFriendship_userId_friendId_key" ON "ChatFriendship"("userId", "friendId");

-- AddForeignKey
ALTER TABLE "ChatFriendship" ADD CONSTRAINT "ChatFriendship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ChatUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatFriendship" ADD CONSTRAINT "ChatFriendship_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "ChatUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
