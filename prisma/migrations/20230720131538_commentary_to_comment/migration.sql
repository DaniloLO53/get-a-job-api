/*
  Warnings:

  - You are about to drop the column `commentary` on the `rates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rates" DROP COLUMN "commentary",
ADD COLUMN     "comment" TEXT;
