import { Market } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";

import { db } from "../lib/db";
import { crypto } from "./data/crypto";

export async function cryptoSeed() {
  const cryptoMarket = await db.markets.findFirstOrThrow({
    where: {
      name: Market.CRYPTO,
    },
  });

  for (const asset of crypto) {
    await db.assets.create({
      data: {
        id: createId(),
        name: asset.name,
        ticker: asset.ticker,
        marketId: cryptoMarket.id,
        image: asset.image,
        pipFactor: 1,
      },
    });
  }
}