import React, { useEffect, useState } from "react";
import { Button, Container, TextInput, NumberInput, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import Link from "next/link";
import { getSession } from "next-auth/react";

import { useForm, isNotEmpty } from "@mantine/form";
import { Title } from "~/components/Title/Title";
import { api } from "~/utils/api";
import { type User } from "~/components/Navigation/Navigation";

type FormValues = {
  openTime: string;
  closeTime: string;
  openPrice: number;
  closePrice: number;
  positionSize: number;
};

export default function AddPosition() {
  const form = useForm<FormValues>({
    initialValues: {
      openTime: "2023-06-04T20:20:20",
      closeTime: "2023-06-04T21:20:20",
      openPrice: 100,
      closePrice: 120,
      positionSize: 10,
    },

    validate: {
      openTime: isNotEmpty("Open time is required"),
      closeTime: isNotEmpty("Close time is required"),
      positionSize: isNotEmpty("Position size is required"),
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
        closeTime,
        openTime,
        positionSize: values.positionSize,
      });
      await router.push(`/positions`);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container className={"w-full"}>
      <div className={"flex flex-col items-center"}>
        <Title>
          <div className={"flex gap-4 justify-center items-center"}>
            <div>Add position</div>
            <div className={"text-xl text-[#339af0]"}>{asset?.name || ""}({asset?.ticker || ""})</div>
          </div>
        </Title>

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
            label="Position size"
            placeholder="Enter position size"
            {...form.getInputProps("positionSize")}
          />

          <Stack spacing={"md"}>
            <Button
              className={"mt-4"}
              variant={"outline"}
              type={"submit"}
              fullWidth
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
