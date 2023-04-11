import React, { useEffect, useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { Button, Container, NumberInput, Stack, TextInput, Select } from "@mantine/core";
import { Title } from "~/components/Title/Title";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { type User } from "~/components/Navigation/Navigation";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { PositionType } from ".prisma/client";

type FormValues = {
  openTime: string;
  closeTime: string;
  openPrice: number;
  closePrice: number;
  lots: number;
  type: string;
  fee: number;
};

const positions = [PositionType.LONG, PositionType.SHORT];

export function CreateForexPosition() {
  const form = useForm<FormValues>({
    initialValues: {
      openTime: "2023-06-04T20:20:20",
      closeTime: "2023-06-04T21:20:20",
      openPrice: 1.09102,
      closePrice: 1.09312,
      type: "LONG",
      fee: 0,
      lots: 1,
    },

    validate: {
      openTime: isNotEmpty("Open time is required"),
      closeTime: isNotEmpty("Close time is required"),
      lots: isNotEmpty("Lot size is required"),
      fee: isNotEmpty("Position size is required"),
      type: isNotEmpty("Position type is required"),
      openPrice: (value) => (value < 0 ? "Open price should be higher than zero" : null),
      closePrice: (value) => (value < 0 ? "Close price should be higher than zero" : null),
    }
  });

  const router = useRouter();
  const { marketId = "", assetId = "" } = router.query;
  const { data: asset } = api.assets.get.useQuery({ assetId: assetId as string });
  const { mutate: createPosition } = api.positions.create.useMutation();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => { // use zustand
    void (async () => {
      const session = await getSession();
      setUser(session?.user || null);
    })();
  }, []);

  async function submitForm(values: FormValues) {
    try {
      const openTime = new Date(values.openTime);
      const closeTime = new Date(values.closeTime);

      createPosition({
        assetId: assetId as string,
        userId: user?.id || "",
        openPrice: values.openPrice,
        closePrice: values.closePrice,
        positionType: values.type,
        closeTime,
        openTime,
        positionSize: values.lots * 100000,
      });
      await router.push(`/positions`);
    } catch (e) {
      console.error(e);
    }
  }

  // const profit = Math.round((form.values.closePrice - form.values.openPrice) * 10000) * 10;

  return (
    <Container className={"w-full"}>
      <div className={"flex flex-col items-center"}>
        <Title>
          <div className={"flex gap-4 justify-center items-center text-2xl"}>
            <div className={"flex"}>
              <span>Forex</span>
              <span className={"hidden md:inline"}>&nbsp;- New Position</span>
            </div>
            <div className={"text-[#339af0]"}>{asset?.ticker || ""}</div>
          </div>
        </Title>

        {/*<div>Profit {profit}$</div>*/}

        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className={"flex flex-col gap-4 max-w-[400px] w-full my-8"} onSubmit={form.onSubmit(submitForm)}>
          <TextInput
            label="Open time"
            placeholder="YYYY-MM-DDTHH:MM:SS"
            {...form.getInputProps("openTime")}
          />
          <TextInput
            label="Close time"
            placeholder="YYYY-MM-DDTHH:MM:SS"
            {...form.getInputProps("closeTime")}
          />
          <NumberInput
            label="Open price"
            placeholder="Enter open price"
            {...form.getInputProps("openPrice")}
          />
          <NumberInput
            label="Close price"
            placeholder="Enter close price"
            {...form.getInputProps("closePrice")}
          />
          <NumberInput
            label="Lot size"
            placeholder="Enter lot size"
            {...form.getInputProps("lots")}
          />

          <NumberInput
            label="Fee"
            decimalSeparator={"."}
            precision={2}
            placeholder="Fee"
            {...form.getInputProps("fee")}
          />

          <Select
            label="Position type"
            placeholder="Select a position type"
            data={positions.map(position => ({ value: position, label: position }))}
            {...form.getInputProps("type")}
          />

          <Stack className={"gap-1 md:gap-4"}>
            <Button
              className={"mt-4"}
              variant={"outline"}
              type={"submit"}
              fullWidth
              disabled={!form.isValid}
            >Submit</Button>

            <Button
              className={"mt-4"}
              variant={"outline"}
              component={Link}
              fullWidth
              href={`/markets/${marketId as string}/assets`}
            >Back</Button>
          </Stack>
        </form>
      </div>
    </Container>
  );
}