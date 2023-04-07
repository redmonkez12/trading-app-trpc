import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Title({ children }: Props) {
  return (
    <h1 className={"text-4xl md:text-5xl font-bold text-white text-center"}>{children}</h1>
  );
}