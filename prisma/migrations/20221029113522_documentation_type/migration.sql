-- CreateEnum
CREATE TYPE "DocumentationType" AS ENUM ('IMAGE', 'VIDEO', 'YOUTUBE');

-- AlterTable
ALTER TABLE "WorkProgramDocumentation" ADD COLUMN     "type" "DocumentationType" NOT NULL DEFAULT 'IMAGE';
