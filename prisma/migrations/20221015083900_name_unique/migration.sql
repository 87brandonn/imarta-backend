/*
  Warnings:

  - A unique constraint covering the columns `[name,moduleId]` on the table `Attribute` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Attribute_name_moduleId_key" ON "Attribute"("name", "moduleId");
