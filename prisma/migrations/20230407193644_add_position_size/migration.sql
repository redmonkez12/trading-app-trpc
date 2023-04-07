/*
  Warnings:

  - Added the required column `positionSize` to the `Positions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Positions" ADD COLUMN     "positionSize" DECIMAL(65,30) NOT NULL;
