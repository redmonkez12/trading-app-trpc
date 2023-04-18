import { protectAuthRoute } from "~/protectedRoute";
import { Container, Switch, Title, useMantineColorScheme } from "@mantine/core";

export default function Profile() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Container>
      <Title>Profile</Title>

      <form className={"flex flex-col gap-4 max-w-[400px] w-full my-8"}>
        <Switch
          checked={colorScheme === "dark"}
          onChange={(event) => toggleColorScheme(event.currentTarget.checked ? "dark" : "light")}
          label={colorScheme === "dark" ? "Dark mode" : "Light mode"}
        />
      </form>
    </Container>
  );
}

export const getServerSideProps = protectAuthRoute;