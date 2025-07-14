/*
  Warnings:

  - You are about to drop the column `content` on the `Quote` table. All the data in the column will be lost.
  - Added the required column `mood` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "content",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mood" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;
