import { db } from "~/lib/db";
import { Market } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";

export async function stocksSeed() {
  const stocks = await db.markets.findFirstOrThrow({
    where: {
      name: Market.STOCKS,
    },
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