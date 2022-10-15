/*
  Warnings:

  - A unique constraint covering the columns `[name,sectionId]` on the table `Attribute` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,moduleId]` on the table `Section` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `Attribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attribute" ADD COLUMN     "label" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_name_sectionId_key" ON "Attribute"("name", "sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Section_name_moduleId_key" ON "Section"("name", "moduleId");
