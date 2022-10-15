/*
  Warnings:

  - Added the required column `workProgramId` to the `WorkProgramDocumentation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkProgramDocumentation" ADD COLUMN     "workProgramId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkProgramDocumentation" ADD CONSTRAINT "WorkProgramDocumentation_workProgramId_fkey" FOREIGN KEY ("workProgramId") REFERENCES "WorkProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
