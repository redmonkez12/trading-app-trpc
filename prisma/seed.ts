import { db } from "../lib/db";
import { Market } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";
import { forexSeed } from "./forexSeed";
import { stocksSeed } from "./stocksSeed";
import { commoditiesSeed } from "./commoditiesSeed";

async function main() {
  const markets = [Market.CRYPTO, Market.FOREX, Market.STOCKS, Market.COMMODITIES];

  for (const market of markets) {
    await db.markets.create({
      data: {
        id: createId(),
        name: market
      }
    });
  }


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
