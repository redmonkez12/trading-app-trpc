import { Market } from "@prisma/client";
import { Card } from "~/components/Card/card";
import { api } from "~/utils/api";

export default function MarketsPage() {
  const { data: markets = [] } = api.markets.getAll.useQuery();

  function getTitle(market: Market) {
    if (market === Market.COMMODITIES) {
      return "Go to commodities";
    } else if (market === Market.CRYPTO) {
      return "Go to crypto";
    } else if (market === Market.FOREX) {
      return "Go to forex";
    } else if (market === Market.STOCKS) {
      return "Go to stocks";
    }
    
    return "Unknown text";
  }

  return (
    <div className={"flex flex-col gap-5 items-center m-5 font-light text-gray-500"}>
      <h1 className={"text-5xl font-bold text-black"}>Choose your favorite market</h1>

      <div className={"market-container grid grid-cols-1 gap-6"}>
        {
          markets.map((market) => (
            <Card key={market.id}
                  buttonText={getTitle(market.name)}
                  market={market}
            />
          ))
        }
      </div>
    </div>
  );
}