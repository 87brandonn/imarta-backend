-- DropForeignKey
ALTER TABLE "WorkProgram" DROP CONSTRAINT "WorkProgram_periodId_fkey";

-- AlterTable
ALTER TABLE "WorkProgram" ALTER COLUMN "periodId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkProgram" ADD CONSTRAINT "WorkProgram_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE SET NULL ON UPDATE CASCADE;
