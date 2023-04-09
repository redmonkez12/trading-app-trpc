import { Container, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { type User } from "~/components/Navigation/Navigation";
import { getSession } from "next-auth/react";
import { Title } from "~/components/Title/Title";
import Image from "next/image";

export default function Positions() {
  const [user, setUser] = useState<User | null>(null);

  const { data: positions = [] } = api.positions.getAll.useQuery({ userId: user?.id || "" });

  useEffect(() => { // use zustand
    void (async () => {
      const session = await getSession();
      setUser(session?.user || null);
    })();
  }, []);

  const rows = positions.map((position) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const profitLoss = position.positionSize * (position.closePrice - position.openPrice);

    return (
      <tr key={position.id}>
        <td>
          <div className={"flex gap-2 items-center"}>
            <div className={"text-lg"}>{position.asset.name}</div>
            <div className={"text-xs text-[#339af0]"}>({position.asset.ticker})</div>
          </div>
        </td>
        <td>
          <div className={"flex gap-2 items-center"}>
            <div>{profitLoss} USD</div>
            <div
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              /* @ts-ignore */
              className={"text-xs text-[#339af0]"}>({(profitLoss / (position.openPrice * position.positionSize) * 100).toFixed(2)}%)
            </div>
          </div>
        </td>
        <td><Image src={`/images/${profitLoss > 0 ? "profit" : "loss"}.svg`} width={30} height={30}
                   alt={"icon"} /></td>
      </tr>
    );
  });

  return (
    <Container className={"w-full"}>
      <Title>Your positions</Title>

      <Table className={"mt-8"}>
        <thead>
        <tr>
          <th>Asset</th>
          <th>P/L</th>
          <th></th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
}