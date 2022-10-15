-- CreateTable
CREATE TABLE "WorkProgramDepartment" (
    "workProgramId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "WorkProgramField" (
    "workProgramId" INTEGER NOT NULL,
    "fieldId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "OrganizationMeta" (
    "id" SERIAL NOT NULL,
    "periodId" INTEGER NOT NULL,
    "vision" TEXT NOT NULL,
    "hierarchyImgUrl" TEXT NOT NULL,

    CONSTRAINT "OrganizationMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationMetaMission" (
    "id" SERIAL NOT NULL,
    "organizationMetaId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "OrganizationMetaMission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkProgramDepartment_workProgramId_departmentId_key" ON "WorkProgramDepartment"("workProgramId", "departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkProgramField_workProgramId_fieldId_key" ON "WorkProgramField"("workProgramId", "fieldId");

-- AddForeignKey
ALTER TABLE "WorkProgramDepartment" ADD CONSTRAINT "WorkProgramDepartment_workProgramId_fkey" FOREIGN KEY ("workProgramId") REFERENCES "WorkProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkProgramDepartment" ADD CONSTRAINT "WorkProgramDepartment_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkProgramField" ADD CONSTRAINT "WorkProgramField_workProgramId_fkey" FOREIGN KEY ("workProgramId") REFERENCES "WorkProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkProgramField" ADD CONSTRAINT "WorkProgramField_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMeta" ADD CONSTRAINT "OrganizationMeta_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMetaMission" ADD CONSTRAINT "OrganizationMetaMission_organizationMetaId_fkey" FOREIGN KEY ("organizationMetaId") REFERENCES "OrganizationMeta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
