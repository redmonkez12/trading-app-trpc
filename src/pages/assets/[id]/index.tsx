import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Image from "next/image";
import { List, Group, Button, Stack, Container } from "@mantine/core";
import Link from "next/link";
import { Market } from "@prisma/client";
import { ForexImage } from "~/components/ForexImage/ForexImage";

export default function Assets() {
  const router = useRouter();
  const { id = "" } = router.query;
  const { data: assets = [] } = api.assets.getAll.useQuery({ marketId: id as string });
  const { data: market } = api.markets.get.useQuery({ id: id as string });
  const marketName = market?.name || Market.FOREX;

  function parseImageColors(image: string) {
    const [, backgroundColor = ""] = image.split("_");

    return {
      backgroundColor: `#${backgroundColor}`
    };
  }

  return (
    <Container>
      <Stack className={"p-4"} spacing={"md"}>
        <h1 className={"text-5xl font-bold text-white text-center"}>Assets</h1>

        <List spacing={"md"}>
          {assets.map((asset) => {
            const imageColors = parseImageColors(asset.image);

            return (
              <List.Item key={asset.id}
                         className={"flex gap-3 items-center border-solid border p-4 bg-gray-800 border-gray-700 text-white"}>
                <Group>
                  <div className={`${marketName !== Market.STOCKS ? "" : "image-box-shadow"} h-[60px] w-[60px] relative`}
                       style={{ backgroundColor: imageColors.backgroundColor }}>
                    {marketName === Market.FOREX ? (
                      <ForexImage ticker={asset.ticker} />
                    ) : <Image className={`${marketName !== Market.STOCKS ? "rounded-full" : ""}`} src={`/images/${marketName}/${asset.image}.svg`} fill alt={"asset image"} />}

                  </div>
                  <div className={"font-bold"}>{asset.ticker}</div>
                  <div className={"text-lg"}>{asset.name}</div>
                </Group>
              </List.Item>
            );
          })}
        </List>

        <div>
          <Button
            variant={"outline"}
            component={Link}
            href={`/markets`}
          >Back</Button>
        </div>
      </Stack>
    </Container>
  );
}