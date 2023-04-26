/*
  Warnings:

  - Changed the type of `name` on the `Countries` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CountryType" AS ENUM ('USA', 'GERMANY');

-- AlterTable
ALTER TABLE "Assets" ALTER COLUMN "countryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Countries" DROP COLUMN "name",
ADD COLUMN     "name" "CountryType" NOT NULL;
