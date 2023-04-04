import Image from "next/image";
import { Market } from "@prisma/client";

type Props = {
  ticker: string;
  marketName: Market;
};

export function DoubleImage({ ticker, marketName }: Props) {
  const [pair1 = "", pair2 = ""] = ticker.split("/");

  return (
    <div className={"relative w-full h-full"}>
      <Image className={"absolute rounded-full left-0 bottom-0 z-10"} src={`/images/${marketName.toLowerCase()}/${pair1. toLowerCase()}.svg`} width={40} height={40} alt={"asset image"} />
      <Image className={"absolute rounded-full right-0 top-0"} src={`/images/${marketName.toLowerCase()}/${pair2.toLowerCase()}.svg`} width={40} height={40} alt={"asset image"} />
    </div>
  );
}