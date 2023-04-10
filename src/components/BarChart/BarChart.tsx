import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { type PerMonth } from "~/server/api/routers/statistics";

type Props = {
  byMonth: PerMonth[];
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function BarChart({ byMonth }: Props) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartId = useRef<string | null>(null);

  useEffect(() => {
    if (byMonth.length === 0) {
      return;
    }

    const data = Array.from({ length: 12 }, (_, index) => {
      const found = byMonth.find(({ month }) => month == index + 1);
      return {
        profitLoss: found ? found.profitLoss : 0,
        month: months[index],
      };
    });

    console.log(data);

    if (chartId.current !== null) {
      return;
    }

    const chart = new Chart(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      chartRef.current,
      {
        type: "bar",
        data: {
          labels: data.map(row => row.month),
          datasets: [
            {
              label: "Profit/Loss",
              data: data.map(row => row.profitLoss),
              backgroundColor: data.map(row => row.profitLoss >= 0 ? "#1db954" : "#e90052")
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          }
        }
      }
    );
    chartId.current = chart.id;
  }, [byMonth.length]);

  return (
    <div>
      <h2 className={"text-4xl md:text-5xl font-bold text-zinc-400 text-center mb-2"}>Profit/Loss</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}