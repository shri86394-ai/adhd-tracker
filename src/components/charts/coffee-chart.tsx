"use client";

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  coffee: { label: "Coffee (cups)", color: "var(--chart-3)" },
} satisfies ChartConfig;

interface CoffeeChartProps {
  data: { date: string; coffeeCups: number }[];
}

export function CoffeeChart({ data }: CoffeeChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <BarChart data={data}>
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
        <Bar
          dataKey="coffeeCups"
          fill="var(--color-coffee)"
          radius={[4, 4, 0, 0]}
          name="coffee"
        />
      </BarChart>
    </ChartContainer>
  );
}
