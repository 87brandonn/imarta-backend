/*
  Warnings:

  - A unique constraint covering the columns `[periodId]` on the table `OrganizationMeta` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrganizationMeta_periodId_key" ON "OrganizationMeta"("periodId");
