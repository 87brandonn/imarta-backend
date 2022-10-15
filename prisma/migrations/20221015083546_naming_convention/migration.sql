/*
  Warnings:

  - You are about to drop the `Attributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Modules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attributes" DROP CONSTRAINT "Attributes_modulesId_fkey";

-- DropTable
DROP TABLE "Attributes";

-- DropTable
DROP TABLE "Modules";

-- CreateTable
CREATE TABLE "Module" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "moduleId" INTEGER NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Module_slug_key" ON "Module"("slug");

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
