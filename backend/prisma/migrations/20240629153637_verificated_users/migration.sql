/*
  Warnings:

  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fullName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "VerificatedUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificatedUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VerificatedUser" ADD CONSTRAINT "VerificatedUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
