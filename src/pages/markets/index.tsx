import { Market } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import { Button, Loader } from "@mantine/core";

import { CardWrapper } from "~/components/CardWrapper/CardWrapper";
import { api } from "~/utils/api";
import { Title } from "~/components/Title/Title";
import { protectAuthRoute } from "~/protectedRoute";

export default function MarketsPage() {
  const { data: session } = useSession();
  const { data: markets = [], isLoading = [] } = api.markets.getAll.useQuery();

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

  if (isLoading) {
    return <div className={"loader"}>
      <Loader size="md" />
    </div>;
  }

  return (
    <div className={"flex flex-col gap-5 items-center m-5 font-light text-gray-500"}>
      <Title label={"Choose your favorite market"} />

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

      <Button
        variant={"outline"}
        /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
        onClick={() => signOut()}
      >Logout</Button>
    </div>
  );
}

export const getServerSideProps = protectAuthRoute;
