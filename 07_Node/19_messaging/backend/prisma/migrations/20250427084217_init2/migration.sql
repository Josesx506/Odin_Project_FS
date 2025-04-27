-- CreateEnum
CREATE TYPE "ChatRole" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "ChatUser" ADD COLUMN     "role" "ChatRole" NOT NULL DEFAULT 'USER';
