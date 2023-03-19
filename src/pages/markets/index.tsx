import { Card } from "~/components/Card/card";
import { api } from "~/utils/api";

export default function MarketsPage() {
  const { data: markets = [] } = api.markets.getAll.useQuery();

  return (
    <div className={"m-5 font-light text-gray-500"}>
      <div className={"grid grid-cols-1 gap-6 sm:grid-cols-2"}>
        {
          markets.map((market) => (
            <Card key={market.id} buttonText={"Go to forex"}
                  title={market.name}
                  text={"Forex trading is an increasingly popular discipline of online trading. No wonder, it’s THE biggest market in the world which has a lot to offer which quite logically attracts new traders each and every day. "}
            />
          ))
        }
      </div>
    </div>
  );
}