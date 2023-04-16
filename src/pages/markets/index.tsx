import { Market } from "@prisma/client";
import { Loader } from "@mantine/core";

import { CardWrapper } from "~/components/CardWrapper/CardWrapper";
import { api } from "~/utils/api";
import { Title } from "~/components/Title/Title";
import { protectAuthRoute } from "~/protectedRoute";

export default function MarketsPage() {
  const { data: markets = [], isLoading = true } = api.markets.getAll.useQuery();

  function getTitle(market: Market) {
    if (market === Market.COMMODITIES) {
      return "Go to commodities";
    } else if (market === Market.CRYPTO) {
      return "Go to crypto";
    } else if (market === Market.FOREX) {
      return "Go to forex";
    } else if (market === Market.STOCKS) {
      return "Go to stocks";
    } else if (market === Market.INDICES) {
      return "Go to indices";
    }
    
    return "Unknown text";
  }

  if (isLoading) {
    return <div className={"loader"}>
      <Loader size="md" />
    </div>;
  }

  return (
    <div className={"flex flex-col gap-5 items-center m-5 font-light text-gray-500"}>
      <Title>Choose your market</Title>

      <div className={"market-container grid grid-cols-1 gap-6"}>
        {
          markets.map((market) => (
            <CardWrapper key={market.id}
                         buttonText={getTitle(market.name)}
                         market={market}
            />
          ))
        }
      </div>
    </div>
  );
}

export const getServerSideProps = protectAuthRoute;
