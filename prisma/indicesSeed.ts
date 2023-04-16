import { db } from "../lib/db";
import { Market } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";

export async function indicesSeed() {
  const forex = await db.markets.findFirstOrThrow({
    where: {
      name: Market.INDICES
    }
  });

  const assets = [
    {
      name: "US 30",
      ticker: "US30",
      image: "us30.svg",
      pipFactor: 1,
    },
    {
      name: "Dow Jones Industrial Average Index",
      ticker: "US100",
      image: "us100.svg",
      pipFactor: 1,
    },
    {
      name: "US 500",
      ticker: "US500",
      image: "us500.svg",
      pipFactor: 1,
    },
    {
      name: "Germany 40",
      ticker: "DE40",
      image: "de40.svg",
      pipFactor: 1,
    },
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