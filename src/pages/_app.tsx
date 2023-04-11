import React, { useEffect, useState } from "react";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { getSession, SessionProvider } from "next-auth/react";
import Image from "next/image";

import { MantineProvider, Group, Alert } from "@mantine/core";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { type User } from "~/components/Navigation/Navigation";
import { NavigationNew } from "~/components/Navigation/NavigationNew";

const MyApp: AppType<{ session: Session | null }> = ({
                                                       Component,
                                                       pageProps: { session, ...pageProps }
                                                     }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const showAlert = !sessionStorage.getItem("alert");
    setShowAlert(showAlert);

    void (async () => {
      const session = await getSession();
      setUser(session?.user || null);
    })();
  }, []);

  function closeAlert() {
    setShowAlert(false);
    sessionStorage.setItem("alert", "show");
  }

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
        {showAlert && <Alert
          icon={<Image src={"/images/danger.svg"}
                       width={20} height={20}
                       alt={"danger"} />}
          color="red"
          withCloseButton
          onClose={closeAlert}>
          This application is under development, please don&apos;t use it for real data.
        </Alert>}

        <Group align={"flex-start"} className={"p-8 flex-col md:flex-row h-full"}>
          {user && <NavigationNew user={user} />}
          <div className={"flex justify-center w-full flex-1"}>
            <Component {...pageProps} />
          </div>
        </Group>
      </SessionProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);