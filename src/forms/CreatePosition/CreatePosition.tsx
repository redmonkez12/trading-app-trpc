import { PositionType } from ".prisma/client";
import { type Assets } from "@prisma/client";
import { useRouter } from "next/router";
import { isNotEmpty, useForm } from "@mantine/form";
import { api } from "~/utils/api";
import React, { useEffect, useState } from "react";
import { type User } from "~/components/Navigation/Navigation";
import { getSession } from "next-auth/react";
import { Title } from "~/components/Title/Title";
import { Button, Container, NumberInput, Select, Stack } from "@mantine/core";
import Link from "next/link";
import { DateTimePicker } from "@mantine/dates";

type FormValues = {
  openTime: string;
  closeTime: string;
  openPrice: number;
  closePrice: number;
  units: number;
  type: PositionType;
  fee: number;
};

const positions = [PositionType.LONG, PositionType.SHORT];

type Props = {
  marketId: string;
  asset: Assets | null;
};

export function CreatePosition({ marketId, asset }: Props) {
  const router = useRouter();

  const form = useForm<FormValues>({
    initialValues: {
      openTime: "",
      closeTime: "",
      openPrice: 0,
      closePrice: 0,
      type: "LONG",
      fee: 0,
      units: 0,
    },

    validate: {
      openTime: isNotEmpty("Open time is required"),
      closeTime: (value, values) => (
        value <= values.openTime ? "Close time should be after open time" : null
      ),
      units: (value) => (value <= 0 ? "Position size should be higher than zero" : null),
      fee: isNotEmpty("Position size is required"),
      type: isNotEmpty("Position type is required"),
      openPrice: (value) => (value <= 0 ? "Open price should be higher than zero" : null),
      closePrice: (value) => (value <= 0 ? "Close price should be higher than zero" : null)
    },
  });

  const { mutate: createPosition, isLoading } = api.positions.create.useMutation();
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
        assetId: asset?.id || "",
        accountId: "",
        openPrice: values.openPrice,
        closePrice: values.closePrice,
        positionType: values.type,
        fee: values.fee,
        closeTime,
        openTime,
        positionSize: values.units
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
              { /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call */}
              <span className={"capitalize"}>{(asset as any)?.market?.name?.toLowerCase() || ""}</span>
              <span className={"hidden md:inline"}>&nbsp;- New Position</span>
            </div>
            <div className={"text-[#339af0]"}>{asset?.ticker || ""}</div>
          </div>
        </Title>

        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className={"flex flex-col gap-4 max-w-[400px] w-full my-8"} onSubmit={form.onSubmit(submitForm)}>
          <DateTimePicker
            withSeconds
            label="Open time"
            {...form.getInputProps("openTime")}
          />
          <DateTimePicker
            withSeconds
            label="Close time"
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
            label="Units"
            placeholder="Enter position size"
            {...form.getInputProps("units")}
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
              disabled={!form.isValid || isLoading}
            >Submit</Button>

            <Button
              className={"mt-4"}
              variant={"outline"}
              component={Link}
              fullWidth
              href={`/markets/${marketId}/assets`}
            >Back</Button>
          </Stack>
        </form>
      </div>
    </Container>
  );
}
