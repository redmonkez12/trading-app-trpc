import { Container, Stack } from "@mantine/core";
import Image from "next/image";
import { TopNav } from "~/components/TopNav/TopNav";
import { Title } from "~/components/Title/Title";

export default function Home (){

  return (
    <Stack className={"w-full"}>
      <TopNav/>

      <Container className={"grid place-items-center p-4 flex-1"}>
        <Stack>
          <Title>Portfolio tracker</Title>

          <Image src={"/images/landing.png"} width={400} height={400} alt={"Landing image"}/>

          <Title>...For real traders</Title>
        </Stack>
      </Container>
    </Stack>
  );
}
