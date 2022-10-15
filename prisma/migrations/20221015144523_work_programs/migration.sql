-- CreateTable
CREATE TABLE "Period" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "leader" TEXT,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "leader" TEXT,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkProgram" (
    "id" SERIAL NOT NULL,
    "periodId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "participationCount" INTEGER NOT NULL,
    "collaborators" TEXT[],
    "staffs" TEXT[],

    CONSTRAINT "WorkProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkProgramDocumentation" (
    "id" SERIAL NOT NULL,
    "imgUrl" TEXT NOT NULL,

    CONSTRAINT "WorkProgramDocumentation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkProgram" ADD CONSTRAINT "WorkProgram_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
