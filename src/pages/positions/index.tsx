import { Button, Container, Menu, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { type User } from "~/components/Navigation/Navigation";
import { getSession } from "next-auth/react";
import { Title } from "~/components/Title/Title";
import Image from "next/image";
import { protectAuthRoute } from "~/protectedRoute";
import { PositionType } from ".prisma/client";
import NextLink from "next/link";
import { Market } from "@prisma/client";

export default function Positions() {
  const [user, setUser] = useState<User | null>(null);

  const { data: markets = [] } = api.markets.getAll.useQuery();
  const { data: positions = [] } = api.positions.getAll.useQuery({ userId: user?.id || "" });

  useEffect(() => { // use zustand
    void (async () => {
      const session = await getSession();
      setUser(session?.user || null);
    })();
  }, []);

  const rows = positions.map((position) => {
    const profitLoss = position.positionType === PositionType.LONG
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ? position.positionSize * (position.closePrice - position.openPrice)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      : position.positionSize * (position.openPrice - position.closePrice);

    return (
      <tr key={position.id}>
        <td>
          <div className={"flex gap-2 items-center"}>
            <div className={"text-lg"}>{position.asset.ticker}</div>
          </div>
        </td>
        <td>
          <div className={"flex gap-2 items-center"}>
            <div>{profitLoss.toFixed(2)} USD</div>
            <div
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              /* @ts-ignore */
              className={"text-xs text-[#339af0]"}>({(profitLoss / (position.openPrice * position.positionSize) * 100).toFixed(2)}%)
            </div>
          </div>
        </td>
        { /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <td>{position.asset.market.name === "FOREX" ? position.positionSize / 100000 : position.positionSize.toString()}</td>
        {position.positionType === PositionType.LONG && <th style={{color: "#1db954"}}>LONG</th>}
        {position.positionType === PositionType.SHORT && <th style={{color: "#e90052"}}>SHORT</th>}
        <td><Image src={`/images/${profitLoss > 0 ? "profit" : "loss"}.svg`} width={30}
                   height={30}
                   alt={"icon"} /></td>
      </tr>
    );
  });

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
    <Container className={"w-full"}>
      <div className={"flex flex-col md:flex-row items-center justify-center relative"}>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button variant={"outline"} className={"w-full md:w-auto mb-4 md:mb-0 md:absolute md:left-0"}>New
              position</Button>
          </Menu.Target>

          <Menu.Dropdown>
            {markets.map(market => (
              <Menu.Item key={market.id} icon={<Image src={`/images/${getImage(market.name)}`} alt={"Crypto"} width={14}
                                                      height={14} />}>
                <NextLink className={"capitalize"}
                          href={`/markets/${market.id}/assets`}>{market.name.toLowerCase()}</NextLink>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>

        <Title>Your positions</Title>
      </div>

      <Table className={"mt-8"}>
        <thead>
        <tr>
          <th>Asset</th>
          <th>P/L</th>
          <th>Size</th>
          <th>Type</th>
          <th></th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
}

export const getServerSideProps = protectAuthRoute;