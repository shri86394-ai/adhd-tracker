"use client";

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  exercise: { label: "Exercise", color: "var(--chart-1)" },
  meditation: { label: "Meditation", color: "var(--chart-4)" },
  alcohol: { label: "Alcohol", color: "var(--chart-5)" },
} satisfies ChartConfig;

interface HabitsChartProps {
  data: {
    date: string;
    exercise: boolean;
    meditation: boolean;
    alcohol: boolean;
  }[];
}

export function HabitsChart({ data }: HabitsChartProps) {
  const chartData = data.map((d) => ({
    date: d.date,
    exercise: d.exercise ? 1 : 0,
    meditation: d.meditation ? 1 : 0,
    alcohol: d.alcohol ? 1 : 0,
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <BarChart data={chartData}>
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
        <YAxis tickLine={false} axisLine={false} fontSize={12} width={30} domain={[0, 1]} ticks={[0, 1]} tickFormatter={(v) => (v === 1 ? "Yes" : "No")} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) => (value === 1 ? "Yes" : "No")}
            />
          }
        />
        <Bar dataKey="exercise" fill="var(--color-exercise)" radius={[2, 2, 0, 0]} name="exercise" />
        <Bar dataKey="meditation" fill="var(--color-meditation)" radius={[2, 2, 0, 0]} name="meditation" />
        <Bar dataKey="alcohol" fill="var(--color-alcohol)" radius={[2, 2, 0, 0]} name="alcohol" />
      </BarChart>
    </ChartContainer>
  );
}
