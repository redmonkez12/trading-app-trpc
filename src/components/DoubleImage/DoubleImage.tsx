import Image from "next/image";
import { type Market } from "@prisma/client";

type Props = {
  ticker: string;
  marketName: Market;
};

export function DoubleImage({ ticker, marketName }: Props) {
  const [pair1 = "", pair2 = ""] = ticker.split("/");

  return (
    <div>
      <div className={"absolute h-[25px] w-[25px] md:h-[40px] md:w-[40px] left-0 bottom-0 "}>
        <Image className={"absolute rounded-full z-10"}
               src={`/images/${marketName.toLowerCase()}/${pair1.toLowerCase()}.svg`} fill alt={"asset image"} />
      </div>
      <div className={"absolute h-[25px] w-[25px] md:h-[40px] md:w-[40px] right-0 top-0"}>
        <Image className={"absolute rounded-full"}
               src={`/images/${marketName.toLowerCase()}/${pair2.toLowerCase()}.svg`} fill alt={"asset image"} />
      </div>
    </div>
  );
}