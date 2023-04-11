import { db } from "../lib/db";
import { Market } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";
import { europeanStocks } from "./data/stocks";

export async function stocksSeed() {
  const stocks = await db.markets.findFirstOrThrow({
    where: {
      name: Market.STOCKS,
    },
  });

  for (const asset of europeanStocks) {
    await db.assets.create({
      data: {
        id: createId(),
        name: asset.name,
        ticker: asset.ticker,
        marketId: stocks.id,
        image: asset.image,
        pipFactor: 1,
      },
    });
  }
}