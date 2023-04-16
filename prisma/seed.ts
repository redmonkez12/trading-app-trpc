import { createId } from "@paralleldrive/cuid2";
import { Market } from "@prisma/client";

import { cryptoSeed } from "./cryptoSeed";
import { db } from "../lib/db";
import { stocksSeed } from "./stocksSeed";
import { commoditiesSeed } from "./commoditiesSeed";
import { forexSeed } from "./forexSeed";
import { indicesSeed } from "./indicesSeed";

async function main() {
  // const markets = [Market.INDICES];
  // for (const market of markets) {
  //   await db.markets.create({
  //     data: {
  //       id: createId(),
  //       name: market
  //     }
  //   });
  // }

  await db.assets.deleteMany();


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
