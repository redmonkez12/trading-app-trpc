import { Navigation, type User } from "~/components/Navigation/Navigation";
import { Group } from "@mantine/core";
import React from "react";
import { type NextComponentType } from "next";

type Props = {
  children: React.ReactNode;
  user: User;
};


type WithLayoutProps<T> = {
  user: User;
} & T;

export function Layout({ children, user }: Props) {
  return (
    <Group align={"flex-start"} className={"p-4 md:p-8 flex-col md:flex-row h-full w-full"}>
      <Navigation user={user} />
      <div className={"flex justify-center w-full flex-1 h-full"}>
        {children}
      </div>
    </Group>
  );
}

export const withLayout = <T extends object>(Component: NextComponentType<T>) => {
  // eslint-disable-next-line react/display-name
  return ({ user, ...props }: WithLayoutProps<T>) => (
    <Layout user={user}>
      <Component {...props} />
    </Layout>
  );
};
