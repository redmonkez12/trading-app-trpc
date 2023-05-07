import React, { useCallback, useEffect, useState } from "react";
import {
  TextInput,
  Select,
  Title,
  Text,
  Stack,
  Box,
  Group,
  Button,
  Tooltip,
  Checkbox,
  Switch,
  useMantineColorScheme
} from "@mantine/core";
import { Currency, type Mode } from "@prisma/client";
import { IconInfoCircle, IconSquareX } from "@tabler/icons-react";

import { withCreateAccountLayout } from "~/layouts/CreateAccountLayout";
import { protectAuthRoute } from "~/protectedRoute";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { type User } from "~/components/Navigation/Navigation";
import { getSession } from "next-auth/react";


const currencies = Object.values(Currency);

type Account = {
  name: string;
  currency: Currency;
  mode: Mode;
  default: boolean;
};

function CreateAccount() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { toggleColorScheme } = useMantineColorScheme();
  const { mutate: createAccount, isLoading } = api.userAccounts.create.useMutation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => { // use zustand
    void (async () => {
      const session = await getSession();
      setUser(session?.user || null);
    })();
  }, []);
  
  const [accounts, setAccounts] = useState<Account[]>([
    {
      name: "",
      currency: Currency.USD,
      mode: "DARK",
      default: true,
    },
  ]);

  function deleteAccount(index: number) {
    return; // disabled

    const newAccounts = accounts.filter((_, iindex) => iindex !== index);
    setAccounts(newAccounts);
  }

  const isDisabled = useCallback(() => {
    if (accounts.length === 0) {
      return true;
    }

    return accounts.some(account => {
        return !account.name || !account.currency;
    });
  }, [accounts]);

  function changeInput(value: string, index: number) {
    const updatedAccounts = [...accounts];

    updatedAccounts[index] = { ...updatedAccounts[index], name: value } as Account;
    setAccounts(updatedAccounts);
  }

  function changeSelect(value: string | null, index: number) {
    const updatedAccounts = [...accounts];
    updatedAccounts[index] = {
      ...updatedAccounts[index],
      currency: value || "",
    } as Account;
    setAccounts(updatedAccounts);
  }

  async function submitForm() {
    try {
      const account = accounts[0] as Account;

      createAccount({
        userId: user?.id || "",
        currency: account.currency,
        default: true,
        mode: account.mode,
        money: 0,
      });
      await router.push("/markets");
    } catch (e) {
      console.error(e);
    }
  }

  function changeMode(checked: boolean, index: number) {
    const updatedAccounts = [...accounts];
    updatedAccounts[index] = {
      ...updatedAccounts[index],
      mode: checked ? "DARK" : "LIGHT",
    } as Account;
    setAccounts(updatedAccounts);
    toggleColorScheme(checked ? "dark" : "light")
  }

  return (
    <Stack>
      <Stack>
        <Group className={"max-w-lg"} position={"right"} align={"center"}>
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
          <div className={"flex items-center justify-between w-full"}>
            <Text color={"green"}>Currently only one account is allowed</Text>
            <Button
              className={"w-full md:w-auto"}
              variant={"outline"}
              disabled={true}
            >
              Add account
            </Button>
          </div>
        </Group>

        {accounts.map((account, index) => (
          <Box
            key={index}
            sx={(theme) => ({
              backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
            })}
            className={"flex flex-col gap-8 p-8"}>
            <div className={"flex justify-between"}>
              <Text size={"lg"}>Account #1</Text>
              <IconSquareX className={"opacity-50"} color={"red"} onClick={() => deleteAccount(index)}/>
            </div>
            <TextInput
              placeholder="Account name"
              value={accounts[index]?.name || ""}
              onInput={(e: React.KeyboardEvent<HTMLInputElement>) => {
                changeInput((e.target as HTMLInputElement).value, index);
            }}/>

            <Select
              label="Currency"
              value={accounts[index]?.currency || ""}
              placeholder="Select a position type"
              onChange={(value) => changeSelect(value, index)}
              data={currencies.map(position => ({ value: position, label: position }))}
            />

            <Switch
              checked={accounts[index]?.mode === "DARK"}
              onChange={(event) => changeMode(event.currentTarget.checked, index)}
              label={accounts[index]?.mode === "DARK" ? "Dark mode" : "Light mode"}
            />

            <Checkbox checked={accounts[index]?.default || false} label="Default account" disabled/>
          </Box>
        ))}

        <Button
          className={"w-full md:w-auto"}
          variant={"outline"}
          disabled={isDisabled() || isLoading}
          type={"button"}
          /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
          onClick={submitForm}
        >
          Create
        </Button>
      </Stack>
    </Stack>
  );
}

export default withCreateAccountLayout(CreateAccount);

export const getServerSideProps = protectAuthRoute;
