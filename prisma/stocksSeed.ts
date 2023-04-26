import { db } from "../lib/db";
import { CountryType, Market } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";
import { europeStocks } from "./data/stocks/germany";
import { usaStocks } from "./data/stocks/usa";

export async function stocksSeed() {
  const stocks = await db.markets.findFirstOrThrow({
    where: {
      name: Market.STOCKS,
    },
  });

  const germany = await db.countries.findFirstOrThrow({
    where: {
      name: CountryType.GERMANY,
    },
  });

  const usa = await db.countries.findFirstOrThrow({
    where: {
      name: CountryType.USA,
    },
  });

  for (const asset of usaStocks) {
    await db.assets.create({
      data: {
        id: createId(),
        name: asset.name,
        ticker: asset.ticker,
        marketId: stocks.id,
        image: asset.image,
        pipFactor: 1,
        countryId: usa.id,
      },
    });
  }

  for (const asset of europeStocks) {
    await db.assets.create({
      data: {
        id: createId(),
        name: asset.name,
        ticker: asset.ticker,
        marketId: stocks.id,
        image: asset.image,
        pipFactor: 1,
        countryId: germany.id,
      },
    });
  }
}