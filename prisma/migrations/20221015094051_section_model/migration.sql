/*
  Warnings:

  - You are about to drop the column `moduleId` on the `Attribute` table. All the data in the column will be lost.
  - Added the required column `sectionId` to the `Attribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Attribute` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AttributeType" AS ENUM ('TITLE', 'TEXT', 'SWIPER_CENTERED', 'SWIPER_NORMAL', 'IMAGE_BIG', 'IMAGE_SMALL', 'IMAGE_GRID', 'HERO', 'HOME_EVENTS');

-- DropForeignKey
ALTER TABLE "Attribute" DROP CONSTRAINT "Attribute_moduleId_fkey";

-- DropIndex
DROP INDEX "Attribute_name_moduleId_key";

-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "moduleId",
ADD COLUMN     "sectionId" INTEGER NOT NULL,
ADD COLUMN     "type" "AttributeType" NOT NULL,
ALTER COLUMN "data" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "moduleId" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
