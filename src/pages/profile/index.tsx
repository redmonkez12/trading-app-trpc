import { protectAuthRoute } from "~/protectedRoute";
import { Container, Switch, Title, useMantineColorScheme, Button, Modal, Text, Group } from "@mantine/core";
import { useState } from "react";

export default function Profile() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [openAddMoneyModal, setOpenAddMoneyModal] = useState(false);

  function close() {
    setOpenAddMoneyModal(false);
  }

  return (
    <>
      <Modal opened={openAddMoneyModal} onClose={close} size="auto" title="Modal size auto">
        <Text>Modal with size auto will fits its content</Text>

        <Group mt="xl">
          <Button variant="outline">
            Close
          </Button>
          <Button variant="outline">
            Add
          </Button>
        </Group>
      </Modal>

      <Container>
        <Title>Profile</Title>

        <form className={"flex flex-col gap-4 max-w-[400px] w-full my-8"}>
          <Switch
            checked={colorScheme === "dark"}
            onChange={(event) => toggleColorScheme(event.currentTarget.checked ? "dark" : "light")}
            label={colorScheme === "dark" ? "Dark mode" : "Light mode"}
          />

          <Button variant={"outline"} onClick={() => setOpenAddMoneyModal(true)}>Add money</Button>
        </form>
      </Container>
    </>
  );
}

export const getServerSideProps = protectAuthRoute;