import Image from "next/image";
import { Market, Markets } from "@prisma/client";

type Props = {
  market: Markets;
  buttonText: string;
};

export function Card({ market, buttonText }: Props) {
  function getImage(market: string) {
    if (market === Market.COMMODITIES) {
      return "oil.svg";
    } else if (market === Market.CRYPTO) {
      return "bitcoin.svg";
    } else if (market === Market.FOREX) {
      return "forex.svg";
    }

    return "stock.svg";
  }

  return (
    <div
      className="flex flex-col items-center max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-3xl font-bold tracking-tight text-white capitalize text-center">{market.name}</h5>
      </a>
      <div className={"mt-4 mb-8 h-[70px] w-[70px] relative"}>
        <Image src={`/images/${getImage(market.name)}`} alt={"Image"} fill />
      </div>
      <a href={`assets/${market.id}`}
         className={`block w-full items-center px-3 py-2 text-sm
         font-medium text-center text-white rounded-lg focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800`}>
        {buttonText}
      </a>
    </div>
  );
}