-- DropForeignKey
ALTER TABLE "OrganizationMetaMission" DROP CONSTRAINT "OrganizationMetaMission_organizationMetaId_fkey";

-- DropForeignKey
ALTER TABLE "WorkProgramDepartment" DROP CONSTRAINT "WorkProgramDepartment_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "WorkProgramDepartment" DROP CONSTRAINT "WorkProgramDepartment_workProgramId_fkey";

-- DropForeignKey
ALTER TABLE "WorkProgramDocumentation" DROP CONSTRAINT "WorkProgramDocumentation_workProgramId_fkey";

-- DropForeignKey
ALTER TABLE "WorkProgramField" DROP CONSTRAINT "WorkProgramField_fieldId_fkey";

-- DropForeignKey
ALTER TABLE "WorkProgramField" DROP CONSTRAINT "WorkProgramField_workProgramId_fkey";

-- AddForeignKey
ALTER TABLE "WorkProgramDepartment" ADD CONSTRAINT "WorkProgramDepartment_workProgramId_fkey" FOREIGN KEY ("workProgramId") REFERENCES "WorkProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkProgramDepartment" ADD CONSTRAINT "WorkProgramDepartment_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkProgramField" ADD CONSTRAINT "WorkProgramField_workProgramId_fkey" FOREIGN KEY ("workProgramId") REFERENCES "WorkProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkProgramField" ADD CONSTRAINT "WorkProgramField_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkProgramDocumentation" ADD CONSTRAINT "WorkProgramDocumentation_workProgramId_fkey" FOREIGN KEY ("workProgramId") REFERENCES "WorkProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMetaMission" ADD CONSTRAINT "OrganizationMetaMission_organizationMetaId_fkey" FOREIGN KEY ("organizationMetaId") REFERENCES "OrganizationMeta"("id") ON DELETE CASCADE ON UPDATE CASCADE;
