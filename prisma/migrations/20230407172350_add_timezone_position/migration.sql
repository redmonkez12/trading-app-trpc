/*
  Warnings:

  - Added the required column `closeTime` to the `Positions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openTime` to the `Positions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Positions" ADD COLUMN     "closeTime" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "openTime" TIMESTAMPTZ NOT NULL;
