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
    },
    {
      name: "Australian Dollar / U.S. Dollar",
      ticker: "AUD/USD",
      image: "aud-usd",
    },
    {
      name: "British Pound / U.S. Dollar",
      ticker: "GBP/USD",
      image: "gbp-usd",
    },
    {
      name: "British Pound / Japanese Yen",
      ticker: "GBP/JPY",
      image: "gbp-jpy",
    },
    {
      name: "U.S. Dollar / Swiss Franc",
      ticker: "USD/CHF",
      image: "usd-chf",
    },
    {
      name: "U.S. Dollar / Canadian Dollar",
      ticker: "USD/CAD",
      image: "usd-cad",
    },
    {
      name: "Euro / Japanese Yen",
      ticker: "EUR/JPY",
      image: "eur-jpy",
    },
    {
      name: "Australian Dollar / Japanese Yen",
      ticker: "AUD/JPY",
      image: "aud-jpy",
    },
    {
      name: "New Zealand Dollar / U.S. Dollar",
      ticker: "NZD/USD",
      image: "nzd-usd",
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
        pipFactor: 10000,
      }
    });
  }
}