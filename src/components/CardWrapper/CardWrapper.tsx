import Image from "next/image";
import Link from "next/link";
import { Market, type Markets } from "@prisma/client";
import { Card, Button, Stack } from '@mantine/core';

type Props = {
  market: Markets;
  buttonText: string;
};

export function CardWrapper({ market, buttonText }: Props) {
  function getImage(market: string) {
    if (market === Market.COMMODITIES) {
      return "oil.svg";
    } else if (market === Market.CRYPTO) {
      return "bitcoin.svg";
    } else if (market === Market.FOREX) {
      return "forex.svg";
    }

    return "stock.svg";
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack align={"center"}>
        <h5 className="mb-2 text-3xl font-bold tracking-tight text-white capitalize text-center">{market.name}</h5>
        <div className={"mt-4 mb-8 h-[70px] w-[70px] relative"}>
          <Image src={`/images/${getImage(market.name)}`} alt={"Image"} fill />
        </div>
      </Stack>

      <Button
        variant={"outline"}
        component={Link}
        href={`/markets/${market.id}/assets`}
        fullWidth
      >{buttonText}</Button>
    </Card>
  );
}