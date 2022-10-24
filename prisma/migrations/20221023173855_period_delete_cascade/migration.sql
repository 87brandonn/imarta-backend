-- DropForeignKey
ALTER TABLE "OrganizationMeta" DROP CONSTRAINT "OrganizationMeta_periodId_fkey";

-- DropForeignKey
ALTER TABLE "WorkProgram" DROP CONSTRAINT "WorkProgram_periodId_fkey";

-- AddForeignKey
ALTER TABLE "WorkProgram" ADD CONSTRAINT "WorkProgram_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMeta" ADD CONSTRAINT "OrganizationMeta_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE CASCADE ON UPDATE CASCADE;
