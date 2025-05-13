-- CreateTable
CREATE TABLE "SocialUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT,
    "gravatar" TEXT,
    "token" TEXT,

    CONSTRAINT "SocialUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SocialUser_email_key" ON "SocialUser"("email");
