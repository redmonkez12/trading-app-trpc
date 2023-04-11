import { BarChart } from "~/components/BarChart/BarChart";
import { Container } from "@mantine/core";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { type User } from "~/components/Navigation/Navigation";
import { getSession } from "next-auth/react";
import { protectAuthRoute } from "~/protectedRoute";

export default function Statistics() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => { // use zustand
    void (async () => {
      const session = await getSession();
      setUser(session?.user || null);
    })();
  }, []);

  const { data: byMonth = [] } = api.statistics.getByMonth.useQuery({ userId: user?.id || "" });

  return (
    <Container className={"w-full"}>
      <BarChart byMonth={byMonth}/>
    </Container>
  );
}

export const getServerSideProps = protectAuthRoute;