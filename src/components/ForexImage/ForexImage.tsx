import Image from "next/image";

type Props = {
  ticker: string;
};

export function ForexImage({ ticker }: Props) {
  const [pair1 = "", pair2 = ""] = ticker.split("/");

  return (
    <div className={"relative w-full h-full"}>
      <Image className={"absolute rounded-full left-0 bottom-0 z-10"} src={`/images/forex/${pair1. toLowerCase()}.svg`} width={40} height={40} alt={"asset image"} />
      <Image className={"absolute rounded-full right-0 top-0"} src={`/images/forex/${pair2.toLowerCase()}.svg`} width={40} height={40} alt={"asset image"} />
    </div>
  );
}