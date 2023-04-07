import { signIn } from "next-auth/react";
import { Button, Container } from "@mantine/core";
import Image from "next/image";

import { Title } from "~/components/Title/Title";
import { protectRoute } from "~/protectedRoute";
import { useState } from "react";

type LoginType = "github" | "discord" | "google";

type Login = {
  type: LoginType;
  name: string;
  icon: string;
};

const logins: Login[] = [
  {
    type: "github",
    name: "Github",
    icon: "github.svg"
  },
  {
    type: "discord",
    name: "Discord",
    icon: "discord.svg"
  },
  {
    type: "google",
    name: "Google",
    icon: "google.svg"
  }
];

export default function Login() {
  const [loadingState, setLoadingState] = useState<{ loading: boolean; type?: LoginType }>({
    loading: false,
    type: undefined
  });

  async function onLogin(e: React.MouseEvent, type: LoginType) {
    e.preventDefault();
    try {
      await signIn(type);
      setLoadingState({
        loading: true,
        type,
      });
    } catch (e) {
      console.error(e);
      setLoadingState({
        loading: false,
        type: undefined,
      });
    }
  }

  return (
    <Container className={"grid place-items-center p-4"}>
      <Title>Portfolio tracker for real traders</Title>

      <h2 className={"text-3xl md:text-4xl font-bold text-white text-center my-8"}>Login page</h2>

      <div className={"flex flex-col md:max-w-[300px] items-center gap-5 w-full max-w-xl"}>
        {logins.map((login) => (
          <Button
            key={login.name}
            className={"relative"}
            type="submit" variant={"outline"}
            size={"md"}
            fullWidth
            loading={loadingState.type === login.type}
            disabled={loadingState.loading}
            leftIcon={<Image src={`/images/${login.icon}`} alt={`${login.name} icon`} width={25} height={25} />}
            /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
            onClick={(e) => onLogin(e, login.type)}>
            {login.name}
          </Button>
        ))}
      </div>
    </Container>
  );
}

export const getServerSideProps = protectRoute;