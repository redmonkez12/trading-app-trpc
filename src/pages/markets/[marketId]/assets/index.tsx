import React from "react";
import { useDebounce } from 'use-debounce';
import { List, Group, Button, Stack, Container, Loader, Pagination, Input } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { Market } from "@prisma/client";

import { api } from "~/utils/api";
import { DoubleImage } from "~/components/DoubleImage/DoubleImage";
import { Title } from "~/components/Title/Title";
import { protectAuthRoute } from "~/protectedRoute";

export default function Assets() {
  const [search, setSearch] = React.useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const router = useRouter();
  const { marketId = "", page = "" } = router.query;

  const limit = 5;
  let _page = Number(page) || 1;
  _page = _page < 1 ? 1 : _page;

  const { data: assets = [],  } = api.assets.getAll.useQuery({
    marketId: marketId as string,
    offset: ((_page - 1) * limit),
    limit,
    search: debouncedSearch,
  });
  const { data: count = 0 } = api.assets.count.useQuery({ marketId: marketId as string });
  const { data: market, isLoading } = api.markets.get.useQuery({ id: marketId as string });

  const marketName = market?.name || Market.FOREX;

  const pages = Math.ceil(count / (limit || 1));

  function parseImageColors(image: string) {
    const [, backgroundColor = ""] = image.split("_");

    return {
      backgroundColor: `#${backgroundColor}`
    };
  }

  async function setPage(page: number) {
    const href = {
      pathname: router.pathname,
      query: { ...router.query, page }
    };

    await router.push(href);
  }

  function searchAsset(e: React.KeyboardEvent<HTMLInputElement>) {
    setSearch((e.target as HTMLInputElement).value);
  }


  if (isLoading) {
    return <div className={"loader"}>
      <Loader size="md" />
    </div>;
  }

  return (
    <Container className={"w-full"}>
      <Stack className={"p-0 md:p-4"} spacing={"md"}>
        <Title>
          <div className={"flex gap-4 justify-center items-center"}>
            <div className={"capitalize"}>{marketName.toLowerCase()}</div>
            <div className={"text-xl text-[#339af0]"}>({count})</div>
          </div>
        </Title>

        <Input className={"mt-8"} placeholder="Search for assets" disabled={assets.length <= 1} onKeyUp={searchAsset}/>

        <List spacing={"md"}>
          {(!isLoading && assets[0]) ? assets.map((asset) => {
            const imageColors = parseImageColors(asset.image);

            return (
              <List.Item key={asset.id}
                         className={"flex gap-3 items-center border-solid border p-4 bg-gray-800 border-gray-700 text-white custom-list-item"}>
                <Group noWrap>
                  <div
                    className={`${marketName !== Market.STOCKS ? "" : "image-box-shadow"} h-[40px] md:h-[60px] w-[40px] md:w-[60px] relative`}
                    style={{ backgroundColor: imageColors.backgroundColor }}>
                    {(marketName !== Market.FOREX) ? (
                      <Image className={`${marketName !== Market.STOCKS ? "rounded-full" : ""}`}
                             src={`/images/${marketName.toLowerCase()}/${asset.image}`}
                             fill
                             alt={"asset image"} />
                    ) : <DoubleImage ticker={asset.ticker} marketName={marketName} />}

                  </div>
                  <Group noWrap className={"flex-1"}>
                    <div className={"font-bold"}>{asset.ticker}</div>
                    <div className={"text-lg hidden md:block"}>{asset.name}</div>
                  </Group>

                  <Button
                    className={"ml-auto"}
                    variant={"outline"}
                    component={Link}
                    href={`/markets/${market?.id || ""}/assets/${asset.id}/position`}
                  >Add position</Button>
                </Group>
              </List.Item>
            );
          }) : (
            <h2 className={"text-4xl md:text-5xl font-bold text-zinc-400 text-center mb-2"}>Sorry, there are no assets</h2>
          )}
        </List>

        <div className={"flex gap-10"}>
          <Button
            variant={"outline"}
            component={Link}
            href={`/markets`}
          >Back</Button>

          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          {pages > 1 && <Pagination value={_page} onChange={setPage} total={pages} />}
        </div>
      </Stack>
    </Container>
  );
}

export const getServerSideProps = protectAuthRoute;