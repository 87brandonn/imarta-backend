-- AlterTable
ALTER TABLE "WorkProgram" ALTER COLUMN "participationCount" DROP NOT NULL,
ALTER COLUMN "collaborators" DROP NOT NULL,
ALTER COLUMN "staffs" DROP NOT NULL;
