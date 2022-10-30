/*
  Warnings:

  - You are about to drop the column `type` on the `WorkProgramDocumentation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkProgramDocumentation" DROP COLUMN "type",
ADD COLUMN     "fileType" "DocumentationType" NOT NULL DEFAULT 'IMAGE';
