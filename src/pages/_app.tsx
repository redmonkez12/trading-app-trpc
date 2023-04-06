import { useEffect, useState } from "react";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { getSession, SessionProvider } from "next-auth/react";

import { MantineProvider, Group } from "@mantine/core";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Navigation } from "~/components/Navigation/Navigation";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

const MyApp: AppType<{ session: Session | null }> = ({
                                                       Component,
                                                       pageProps: { session, ...pageProps }
                                                     }) => {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    void (async () => {
       const session = await getSession();
       setUser(session?.user || null);
    })();
  }, []);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        loader: "bars"
      }}
    >
      <SessionProvider
        session={session}
        refetchInterval={5 * 60}
        refetchOnWindowFocus={true}>
        <Group className={"p-5"}>
          {user && <Navigation/>}
          <div className={"flex justify-center w-full flex-1"}>
            <Component {...pageProps} />
          </div>
        </Group>
      </SessionProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);