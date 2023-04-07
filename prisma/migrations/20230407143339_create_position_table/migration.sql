-- CreateTable
CREATE TABLE "Positions" (
    "id" TEXT NOT NULL,
    "openPrice" DECIMAL(65,30) NOT NULL,
    "closePrice" DECIMAL(65,30) NOT NULL,
    "userId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,

    CONSTRAINT "Positions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Positions" ADD CONSTRAINT "Positions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Positions" ADD CONSTRAINT "Positions_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
