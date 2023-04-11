import { db } from "../lib/db";
import { Market } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";

export async function forexSeed() {
  const forex = await db.markets.findFirstOrThrow({
    where: {
      name: Market.FOREX
    }
  });

  const assets = [
    {
      name: "Euro / U.S. Dollar",
      ticker: "EUR/USD",
      image: "eur-usd",
      pipFactor: 10000,
    },
    {
      name: "Australian Dollar / U.S. Dollar",
      ticker: "AUD/USD",
      image: "aud-usd",
      pipFactor: 10000,
    },
    {
      name: "British Pound / U.S. Dollar",
      ticker: "GBP/USD",
      image: "gbp-usd",
      pipFactor: 10000,
    }
  ];

  for (const asset of assets) {
    await db.assets.create({
      data: {
        id: createId(),
        name: asset.name,
        ticker: asset.ticker,
        marketId: forex.id,
        image: asset.image,
        pipFactor: asset.pipFactor,
      }
    });
  }
}