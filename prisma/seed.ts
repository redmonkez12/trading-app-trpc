import { db } from "../lib/db";

async function main() {
  const markets = ["forex", "commodities", "crypto", "stocks"];

  for (const market of markets) {
    await db.market.create({
      data: {
        name: market,
      },
    });
  }
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
