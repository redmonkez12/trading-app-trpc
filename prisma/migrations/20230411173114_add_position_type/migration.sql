/*
  Warnings:

  - Added the required column `positionType` to the `Positions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PositionType" AS ENUM ('LONG', 'SHORT');

-- AlterTable
ALTER TABLE "Positions" ADD COLUMN     "positionType" "PositionType" NOT NULL;
