import { withLayout } from "~/layouts/Layout";
import { protectAuthRoute } from "~/protectedRoute";
import { useForm } from "@mantine/form";
import { NumberInput, Text, Stack, Button } from "@mantine/core";
import React from "react";

function Rules() {
  const form = useForm({
    initialValues: {
      maxTradesDay: 0,
      maxTradesWeek: 0,
      maxTradesMonth: 0,
      maxLoseDay: 0,
      maxLoseWeek: 0,
      maxLoseMonth: 0,
    },
  });

  return (
    <Stack className={"max-w-md w-full"}>
      <Text className={"text-4xl text-center"}>Consistency rules</Text>

      <form className={"flex flex-col gap-8"}>
        <NumberInput
          label="Max trades day"
          {...form.getInputProps("maxTradesDay")}
        />

        <NumberInput
          label="Max trades week"
          {...form.getInputProps("maxTradesWeek")}
        />

        <NumberInput
          label="Max trades month"
          {...form.getInputProps("maxTradesMonth")}
        />

        <NumberInput
          label="Max lose day"
          {...form.getInputProps("maxLoseDay")}
        />

        <NumberInput
          label="Max lose week"
          {...form.getInputProps("maxLoseWeek")}
        />

        <NumberInput
          label="Max lose month"
          {...form.getInputProps("maxLoseMonth")}
        />

        <Button variant={"outline"}>Submit</Button>
      </form>
    </Stack>
  );
}

export default withLayout(Rules);

export const getServerSideProps = protectAuthRoute;