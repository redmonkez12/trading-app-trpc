import { Market } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";
import { db } from "../lib/db";

export async function cryptoSeed() {
  const crypto = await db.markets.findFirstOrThrow({
    where: {
      name: Market.CRYPTO,
    },
  });

  const assets = [
    {
      name: "Bitcoin",
      ticker: "BTC",
      image: "btc.png",
      marketId: crypto.id,
    },
    {
      name: "Ethereum",
      ticker: "ETH",
      image: "eth.png",
      marketId: crypto.id,
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