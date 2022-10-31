-- DropForeignKey
ALTER TABLE "WorkProgramStaff" DROP CONSTRAINT "WorkProgramStaff_workProgramId_fkey";

-- AddForeignKey
ALTER TABLE "WorkProgramStaff" ADD CONSTRAINT "WorkProgramStaff_workProgramId_fkey" FOREIGN KEY ("workProgramId") REFERENCES "WorkProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;
