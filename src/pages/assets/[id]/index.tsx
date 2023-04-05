import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Image from "next/image";
import { List, Group, Button, Stack, Container, Loader } from "@mantine/core";
import Link from "next/link";
import { Market } from "@prisma/client";
import { DoubleImage } from "~/components/DoubleImage/DoubleImage";
import { Title } from "~/components/Title/Title";
import { protectAuthRoute } from "~/protectedRoute";

export default function Assets() {
  const router = useRouter();
  const { id = "" } = router.query;
  const { data: assets = [] } = api.assets.getAll.useQuery({ marketId: id as string });
  const { data: market, isLoading } = api.markets.get.useQuery({ id: id as string });
  const marketName = market?.name || Market.FOREX;

  function parseImageColors(image: string) {
    const [, backgroundColor = ""] = image.split("_");

    return {
      backgroundColor: `#${backgroundColor}`
    };
  }


  if (isLoading) {
    return <div className={"loader"}>
      <Loader size="md" />
    </div>;
  }

  return (
    <Container>
      <Stack className={"p-4"} spacing={"md"}>
        <Title label={"Assets"} />

        <List spacing={"md"}>
          {assets.map((asset) => {
            const imageColors = parseImageColors(asset.image);

            return (
              <List.Item key={asset.id}
                         className={"flex gap-3 items-center border-solid border p-4 bg-gray-800 border-gray-700 text-white"}>
                <Group noWrap>
                  <div
                    className={`${marketName !== Market.STOCKS ? "" : "image-box-shadow"} h-[60px] w-[60px] relative`}
                    style={{ backgroundColor: imageColors.backgroundColor }}>
                    {(marketName === Market.COMMODITIES || marketName === Market.STOCKS) ? (
                      <Image className={`${marketName !== Market.STOCKS ? "rounded-full" : ""}`}
                             src={`/images/${marketName.toLowerCase()}/${asset.image}.svg`}
                             fill
                             alt={"asset image"} />
                    ) : <DoubleImage ticker={asset.ticker} marketName={marketName} />}

                  </div>
                  <Group noWrap className={"flex-1"}>
                    <div className={"font-bold"}>{asset.ticker}</div>
                    <div className={"text-lg"}>{asset.name}</div>
                  </Group>
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

export const getServerSideProps = protectAuthRoute;