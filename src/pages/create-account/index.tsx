import React from "react";
import { Input, Select, Title, Text, Stack, Box, Group, Button, Avatar, Tooltip } from "@mantine/core";
import { Currency } from "@prisma/client";
import { withCreateAccountLayout } from "~/layouts/CreateAccountLayout";
import { protectAuthRoute } from "~/protectedRoute";
import { IconInfoCircle, IconSquareX } from "@tabler/icons-react";


const currencies = Object.values(Currency);

function CreateAccount() {
  return (
    <Stack>
      <Stack>
        <Group position={"right"} align={"center"}>
          <Title className={"w-full flex items-center gap-2 text-3xl md:text-4xl"}>
            <Tooltip label={
              <div>
                <Text>You can create multiple subaccounts, each with its own currency</Text>
                <Text>Trading positions are not shared between accounts</Text>
              </div>
            }>
              <IconInfoCircle className={"mt-1 md:mt-2 cursor-pointer"} size="1.5rem" />
            </Tooltip>
            <span>Create account(s)</span>
          </Title>
          <Button
            className={"w-full md:w-auto"}
            variant={"outline"}
          >
            Add account
          </Button>
        </Group>

        <Box
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
          })}
          className={"flex flex-col gap-8 p-8"}>
          <div className={"flex justify-between"}>
            <Text size={"lg"}>Account #1</Text>
            <IconSquareX className={"cursor-pointer"} color={"red"}/>
          </div>
          <Input placeholder="Account name" />

          <Select
            label="Currency"
            placeholder="Select a position type"
            data={currencies.map(position => ({ value: position, label: position }))}
          />
        </Box>

        <Box
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
          })}
          className={"flex flex-col gap-8 p-8"}>
          <div className={"flex justify-between"}>
            <Text size={"lg"}>Account #2</Text>
            <IconSquareX className={"cursor-pointer"} color={"red"}/>
          </div>
          <Input placeholder="Account name" />

          <Select
            label="Currency"
            placeholder="Select a position type"
            data={currencies.map(position => ({ value: position, label: position }))}
          />
        </Box>

        <Button
          className={"w-full md:w-auto"}
          variant={"outline"}
        >
          Create
        </Button>
      </Stack>
    </Stack>
  );
}

export default withCreateAccountLayout(CreateAccount);

export const getServerSideProps = protectAuthRoute;
