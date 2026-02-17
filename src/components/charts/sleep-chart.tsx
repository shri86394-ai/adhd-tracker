"use client";

import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  sleep: { label: "Sleep (hours)", color: "var(--chart-2)" },
} satisfies ChartConfig;

interface SleepChartProps {
  data: { date: string; sleepHours: number }[];
}

export function SleepChart({ data }: SleepChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-sleep)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-sleep)" stopOpacity={0} />
          </linearGradient>
        </defs>
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
        <Area
          type="monotone"
          dataKey="sleepHours"
          stroke="var(--color-sleep)"
          fill="url(#sleepGradient)"
          strokeWidth={2}
          name="sleep"
        />
      </AreaChart>
    </ChartContainer>
  );
}
