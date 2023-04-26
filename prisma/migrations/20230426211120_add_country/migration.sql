/*
  Warnings:

  - Added the required column `countryId` to the `Assets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assets" ADD COLUMN     "countryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Countries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "Assets_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
