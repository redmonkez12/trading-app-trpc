import { db } from "../lib/db";
import { Market } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";

export async function forexSeed() {
  const forex = await db.markets.findFirstOrThrow({
    where: {
      name: Market.FOREX,
    },
  });

  const assets = [
    {
      name: "Euro / U.S. Dollar",
      ticker: "EUR/USD",
      image: "eur-usd",
      marketId: forex.id,
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