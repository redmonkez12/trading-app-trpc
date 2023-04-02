import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Assets() {
  const router = useRouter()
  const { id = "" } = router.query;
  const { data: assets = [] } = api.assets.getAll.useQuery({ marketId: id as string });

  function parseImageColors(image: string) {
    const [, backgroundColor = ""] = image.split("_");

    return {
      backgroundColor: `#${backgroundColor}`,
    };
  }

  return (
    <div className={"p-4"}>
      <h1 className={"text-5xl font-bold text-black mb-8 text-center"}>Assets</h1>

      <ul className={"list-none list-inside flex flex-col gap-5"}>
        {assets.map((asset) => {
          const imageColors = parseImageColors(asset.image);

          return (
            <li key={asset.id} className={"flex gap-3 items-center border-solid border-black border p-4 bg-gray-800 border-gray-700 text-white"}>
              <div className={`image-box-shadow h-[60px] w-[60px] relative`} style={{ backgroundColor: imageColors.backgroundColor }}>
                <Image src={`/images/stocks/${asset.image}.svg`} fill alt={"asset image"} />
              </div>
              <div className={"font-bold"}>{asset.ticker}</div>
              <div className={"text-lg"}>{asset.name}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}