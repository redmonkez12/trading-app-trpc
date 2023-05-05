-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('DARK', 'LIGHT');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('CZK', 'PLN', 'GBP', 'USD', 'EUR', 'AUD', 'CHF', 'JPY', 'NZD', 'CAD', 'BTC');

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mode" "Mode" NOT NULL,
    "currency" "Currency" NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
