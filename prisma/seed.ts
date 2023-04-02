import { db } from "../lib/db";
import { Assets, Market } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";

async function main() {
  const markets = [Market.CRYPTO, Market.FOREX, Market.STOCKS, Market.COMMODITIES];

  for (const market of markets) {
    await db.markets.create({
      data: {
        id: createId(),
        name: market
      }
    });
  }

  const stocks = await db.markets.findFirstOrThrow({
    where: {
      name: Market.STOCKS
    }
  });

  const assets = [
    {
      name: "Volkswagen AG",
      ticker: "VOW3.DE",
      image: "1210_48535A_F7F7F7",
      marketId: stocks.id,
    },
    {
      name: "Advanced Micro Devices Inc",
      ticker: "AMD",
      image: "1832_2C2C2C_F7F7F7",
      marketId: stocks.id,
    },
  ];

  for (const asset of assets) {
    await db.assets.create({
      data: {
        id: createId(),
        name: asset.name,
        ticker: asset.ticker,
        marketId: asset.marketId,
        image: asset.image,
      },
    });
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
