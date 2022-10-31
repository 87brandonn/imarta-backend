-- CreateTable
CREATE TABLE "WorkProgramStaff" (
    "id" SERIAL NOT NULL,
    "workProgramId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isLead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "WorkProgramStaff_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkProgramStaff" ADD CONSTRAINT "WorkProgramStaff_workProgramId_fkey" FOREIGN KEY ("workProgramId") REFERENCES "WorkProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
