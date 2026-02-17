"use client";

import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  water: { label: "Water (cups)", color: "var(--chart-1)" },
} satisfies ChartConfig;

interface WaterChartProps {
  data: { date: string; waterCups: number }[];
}

export function WaterChart({ data }: WaterChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          fontSize={12}
          tickFormatter={(v) =>
            new Date(v + "T00:00:00").toLocaleDateString("en-US", {
              weekday: "short",
            })
          }
        />
        <YAxis tickLine={false} axisLine={false} fontSize={12} width={30} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="waterCups"
          stroke="var(--color-water)"
          strokeWidth={2}
          dot={{ r: 3 }}
          name="water"
        />
      </LineChart>
    </ChartContainer>
  );
}
