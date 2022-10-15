/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `Period` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Period_label_key" ON "Period"("label");
