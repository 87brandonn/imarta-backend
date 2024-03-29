/*
  Warnings:

  - The values [STRING] on the enum `AttributeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttributeType_new" AS ENUM ('TITLE', 'SUBTITLE', 'TEXT', 'SWIPER_CENTERED', 'SWIPER_NORMAL', 'IMAGE_BIG', 'IMAGE_SMALL', 'IMAGE_GRID', 'HERO', 'HOME_EVENTS');
ALTER TABLE "Attribute" ALTER COLUMN "type" TYPE "AttributeType_new" USING ("type"::text::"AttributeType_new");
ALTER TYPE "AttributeType" RENAME TO "AttributeType_old";
ALTER TYPE "AttributeType_new" RENAME TO "AttributeType";
DROP TYPE "AttributeType_old";
COMMIT;
