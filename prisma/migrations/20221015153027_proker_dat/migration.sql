/*
  Warnings:

  - You are about to drop the column `eventDate` on the `WorkProgram` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkProgram" DROP COLUMN "eventDate",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3);
