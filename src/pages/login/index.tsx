import { signIn } from "next-auth/react";
import { Button, Container } from "@mantine/core";
import Image from "next/image";

import { Title } from "~/components/Title/Title";
import { protectRoute } from "~/protectedRoute";

export default function Login() {
  async function onGithubSubmit(e: React.MouseEvent) {
    e.preventDefault()
    try {
      await signIn("github")
    } catch (e) {
      console.error(e);
    }
  }

  async function onDiscordSubmit(e: React.MouseEvent) {
    e.preventDefault()
    try {
      await signIn("discord")
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container className={"grid place-items-center p-4"}>
      <Title label={"Portfolio tracker for real traders"} />

      <div className={"flex items-center mt-8 gap-5"}>
        <Button
          className={"relative"}
          type="submit" variant={"outline"}
          size={"md"}
          /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
          onClick={onGithubSubmit}>
          <div className="flex gap-4 items-center">
            <Image src={"/images/github.svg"} alt={"Github icon"} width={20} height={20} />
            <span>Github</span>
          </div>
        </Button>

        <Button
          className={"relative"}
          type="submit" variant={"outline"}
          size={"md"}
          /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
          onClick={onDiscordSubmit}>
          <div className="flex gap-4 items-center">
            <Image src={"/images/discord.svg"} alt={"Discord icon"} width={20} height={20} />
            <span>Discord</span>
          </div>
        </Button>
      </div>
    </Container>
  );
}

export const getServerSideProps = protectRoute;