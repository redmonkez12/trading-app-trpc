import { createId } from "@paralleldrive/cuid2";
import { CountryType, Market } from "@prisma/client";

import { cryptoSeed } from "./cryptoSeed";
import { db } from "../lib/db";
import { stocksSeed } from "./stocksSeed";
import { commoditiesSeed } from "./commoditiesSeed";
import { forexSeed } from "./forexSeed";
import { indicesSeed } from "./indicesSeed";

async function main() {
  await db.assets.deleteMany();
  await db.markets.deleteMany();
  await db.countries.deleteMany();

  const markets = [Market.INDICES, Market.STOCKS, Market.FOREX, Market.CRYPTO, Market.COMMODITIES];
  for (const market of markets) {
    await db.markets.create({
      data: {
        id: createId(),
        name: market
      }
    });
  }

  const countries = [CountryType.USA, CountryType.GERMANY];

  for (const country of countries) {
    await db.countries.create({
      data: {
        id: createId(),
        name: country,
      },
    });
  }

  await indicesSeed();
  await cryptoSeed();
  await commoditiesSeed();
  await stocksSeed();
  await forexSeed();
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
