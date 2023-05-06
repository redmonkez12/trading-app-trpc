import { Group } from "@mantine/core";
import React from "react";
import { type NextComponentType } from "next";

type Props = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: Props) {
  return (
    <Group align={"flex-start"} className={"p-4 md:p-8 flex-col md:flex-row h-full w-full"}>
      <div className={"flex justify-center w-full flex-1 h-full"}>
        {children}
      </div>
    </Group>
  );
}

export const withAuthLayout = <T extends object>(Component: NextComponentType<T>) => {
  // eslint-disable-next-line react/display-name
  return (props: T) => (
    <AuthLayout>
      <Component {...props} />
    </AuthLayout>
  );
};
