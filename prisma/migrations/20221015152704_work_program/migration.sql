-- AlterTable
ALTER TABLE "WorkProgram" ALTER COLUMN "collaborators" SET NOT NULL,
ALTER COLUMN "collaborators" SET DATA TYPE TEXT,
ALTER COLUMN "staffs" SET NOT NULL,
ALTER COLUMN "staffs" SET DATA TYPE TEXT;
