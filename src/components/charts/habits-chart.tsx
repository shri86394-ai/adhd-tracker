"use client";

import { Dumbbell, Brain, Wine } from "lucide-react";
import { cn } from "@/lib/utils";

interface HabitsChartProps {
  data: {
    date: string;
    exercise: boolean;
    meditation: boolean;
    alcohol: boolean;
  }[];
}

type HabitKey = "exercise" | "meditation" | "alcohol";

const habits: {
  key: HabitKey;
  label: string;
  icon: typeof Dumbbell;
  color: string;
}[] = [
  { key: "exercise", label: "Exercise", icon: Dumbbell, color: "var(--chart-1)" },
  { key: "meditation", label: "Meditation", icon: Brain, color: "var(--chart-4)" },
  { key: "alcohol", label: "Alcohol", icon: Wine, color: "var(--chart-5)" },
];

function aggregateByWeek(data: HabitsChartProps["data"]) {
  const weeks: {
    weekLabel: string;
    exercise: number;
    meditation: number;
    alcohol: number;
    days: number;
  }[] = [];

  for (let i = 0; i < data.length; i += 7) {
    const chunk = data.slice(i, i + 7);
    weeks.push({
      weekLabel: chunk[0].date,
      exercise: chunk.filter((d) => d.exercise).length,
      meditation: chunk.filter((d) => d.meditation).length,
      alcohol: chunk.filter((d) => d.alcohol).length,
      days: chunk.length,
    });
  }

  return weeks;
}

export function HabitsChart({ data }: HabitsChartProps) {
  const isWeekView = data.length <= 7;
  const useWeeklyAgg = data.length > 31;

  // Year view: aggregate by week with opacity indicating completion rate
  if (useWeeklyAgg) {
    const weeks = aggregateByWeek(data);

    return (
      <div className="space-y-3">
        {habits.map((habit) => {
          const Icon = habit.icon;
          const totalCompleted = data.filter((d) => d[habit.key]).length;

          return (
            <div key={habit.key} className="flex items-center gap-3">
              <div className="w-24 shrink-0 flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium">{habit.label}</span>
              </div>
              <div className="flex flex-1 flex-wrap gap-1">
                {weeks.map((week) => {
                  const rate = week[habit.key] / week.days;
                  return (
                    <div
                      key={week.weekLabel}
                      className="h-3 w-3 rounded-sm"
                      style={{
                        backgroundColor: habit.color,
                        opacity: rate === 0 ? 0.1 : 0.2 + rate * 0.8,
                      }}
                      title={`Week of ${week.weekLabel}: ${week[habit.key]}/${week.days} days`}
                    />
                  );
                })}
              </div>
              <span className="w-12 shrink-0 text-right text-xs text-muted-foreground">
                {Math.round((totalCompleted / data.length) * 100)}%
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  // Week and month views: dot grid
  const dotSize = isWeekView ? "h-5 w-5" : "h-3.5 w-3.5";

  return (
    <div className="space-y-3">
      {/* Day labels for week view */}
      {isWeekView && (
        <div className="flex items-center gap-3">
          <div className="w-24 shrink-0" />
          <div className="flex flex-1 justify-around">
            {data.map((d) => (
              <span
                key={d.date}
                className="text-[10px] text-muted-foreground text-center"
              >
                {new Date(d.date + "T00:00:00").toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </span>
            ))}
          </div>
          <div className="w-12 shrink-0" />
        </div>
      )}

      {/* Habit rows */}
      {habits.map((habit) => {
        const Icon = habit.icon;
        const completedCount = data.filter((d) => d[habit.key]).length;

        return (
          <div key={habit.key} className="flex items-center gap-3">
            <div className="w-24 shrink-0 flex items-center gap-1.5">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium">{habit.label}</span>
            </div>
            <div
              className={cn(
                "flex flex-1 gap-1",
                isWeekView ? "justify-around" : "flex-wrap"
              )}
            >
              {data.map((d) => (
                <div
                  key={d.date}
                  className={cn("rounded-full", dotSize)}
                  style={{
                    backgroundColor: habit.color,
                    opacity: d[habit.key] ? 1 : 0.15,
                  }}
                  title={`${d.date}: ${d[habit.key] ? "Yes" : "No"}`}
                />
              ))}
            </div>
            <span className="w-12 shrink-0 text-right text-xs text-muted-foreground">
              {completedCount}/{data.length}
            </span>
          </div>
        );
      })}
    </div>
  );
}
