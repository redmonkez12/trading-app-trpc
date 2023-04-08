import { BarChart } from "~/components/BarChart/BarChart";
import { Container } from "@mantine/core";

export default function Statistics() {
  return (
    <Container className={"w-full"}>
      <BarChart/>
    </Container>
  );
}