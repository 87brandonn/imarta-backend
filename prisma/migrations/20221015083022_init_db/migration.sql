-- CreateTable
CREATE TABLE "Modules" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attributes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "modulesId" INTEGER NOT NULL,

    CONSTRAINT "Attributes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Modules_slug_key" ON "Modules"("slug");

-- AddForeignKey
ALTER TABLE "Attributes" ADD CONSTRAINT "Attributes_modulesId_fkey" FOREIGN KEY ("modulesId") REFERENCES "Modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
