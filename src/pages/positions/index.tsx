import { Container, List } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { type User } from "~/components/Navigation/Navigation";
import { getSession } from "next-auth/react";
import { Title } from "~/components/Title/Title";
import { type Positions } from ".prisma/client";

export default function Positions() {
  const [user, setUser] = useState<User | null>(null);

  const { data: positions } = api.positions.getAll.useQuery({ userId: user?.id || "" });

  console.log(positions);

  useEffect(() => { // use zustand
    void (async () => {
      const session = await getSession();
      setUser(session?.user || null);
    })();
  }, []);

  function calculatePl(position: Positions) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return position.positionSize * (position.closePrice - position.openPrice);
  }
  
  return (
    <Container className={"w-full"}>
      <Title>Your positions</Title>

      <List spacing={"md"}>
        {positions?.map(position => (
          <List.Item key={position.id}>
            <div>{position.asset.name}</div>
            <div>P/L {calculatePl(position)}</div>
          </List.Item>
        ))}
      </List>
    </Container>
  );
}