-- CreateTable
CREATE TABLE "Assets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,

    CONSTRAINT "Assets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Assets_ticker_key" ON "Assets"("ticker");

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "Assets_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Markets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
