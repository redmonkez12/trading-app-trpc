import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export function BarChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartId = useRef<string | null>(null);

  useEffect(() => {
    const data = [
      { month: "January", count: 1000 },
      { month: "February", count: -2000 },
      { month: "March", count: 5000 },
      { month: "April", count: 0 },
      { month: "May", count: 0 },
      { month: "June", count: 0 },
      { month: "July", count: 0 },
      { month: "August", count: 0 },
      { month: "September", count: 0 },
      { month: "October", count: 0 },
      { month: "November", count: 0 },
      { month: "December", count: 0 },
    ];

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
              label: "Positive",
              data: data.map(row => row.count).filter(value => value > 0),
              backgroundColor: "#1db954",
            },
            {
              label: "Negative",
              data: data.map(row => row.count).filter(value => value < 0),
              backgroundColor: "#e90052",
            },
          ],
        },
      }
    );
    chartId.current = chart.id;
  }, []);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}