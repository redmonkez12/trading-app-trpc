import { db } from "../lib/db";
import { Market } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";

export async function commoditiesSeed() {
  const forex = await db.markets.findFirstOrThrow({
    where: {
      name: Market.COMMODITIES,
    },
  });

  const assets = [
    {
      name: "Gold Spot / U.S. Dollar",
      ticker: "XAU/USD",
      image: "gold",
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