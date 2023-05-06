import { Group } from "@mantine/core";
import { type NextComponentType } from "next";
import React from "react";

type Props = {
  children: React.ReactNode;
};


export function CreateAccountLayout({ children }: Props) {
  return (
    <Group align={"flex-start"} className={"p-4 md:p-8 flex-col md:flex-row h-full w-full"}>
      <div className={"flex justify-center w-full flex-1 h-full"}>
        {children}
      </div>
    </Group>
  );
}

export const withCreateAccountLayout = <T extends object>(Component: NextComponentType<T>) => {
  // eslint-disable-next-line react/display-name
  return (props: T) => (
    <CreateAccountLayout>
      <Component {...props} />
    </CreateAccountLayout>
  );
};
