/*
  Warnings:

  - You are about to drop the column `name` on the `SocialUser` table. All the data in the column will be lost.
  - Added the required column `username` to the `SocialUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SocialUser" DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
