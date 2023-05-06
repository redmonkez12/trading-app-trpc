import React, { useEffect, useState } from "react";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";

import { MantineProvider, Alert, type ColorScheme, ColorSchemeProvider } from "@mantine/core";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
                                                       Component,
                                                       pageProps: { session, ...pageProps }
                                                     }) => {
  const [showAlert, setShowAlert] = useState(true);
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useEffect(() => {
    const showAlert = !sessionStorage.getItem("alert");
    setShowAlert(showAlert);
  }, []);

  function closeAlert() {
    setShowAlert(false);
    sessionStorage.setItem("alert", "show");
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
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

            <Component {...pageProps} />
        </SessionProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default api.withTRPC(MyApp);