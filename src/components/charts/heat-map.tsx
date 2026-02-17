"use client";

import { cn } from "@/lib/utils";

interface HeatMapProps {
  data: {
    date: string;
    exercise: boolean;
    meditation: boolean;
    alcohol: boolean;
    waterCups: number;
    coffeeCups: number;
    sleepHours: number;
  }[];
}

function getCompletionScore(entry: HeatMapProps["data"][0]): number {
  let score = 0;
  if (entry.waterCups >= 6) score++;
  if (entry.coffeeCups <= 3) score++;
  if (entry.sleepHours >= 7) score++;
  if (!entry.alcohol) score++;
  if (entry.exercise) score++;
  if (entry.meditation) score++;
  return score;
}

function getIntensityClass(score: number): string {
  if (score === 0) return "bg-muted";
  if (score <= 2) return "bg-primary/20";
  if (score <= 4) return "bg-primary/50";
  return "bg-primary/80";
}

export function HeatMap({ data }: HeatMapProps) {
  // Build a map from date string to entry
  const dateMap = new Map(data.map((d) => [d.date, d]));

  // Generate last N days grid
  const days: { date: string; score: number }[] = [];
  const totalDays = Math.min(data.length > 30 ? data.length : 30, 365);

  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const entry = dateMap.get(dateStr);
    days.push({
      date: dateStr,
      score: entry ? getCompletionScore(entry) : -1,
    });
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium">Daily Completion</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="h-3 w-3 rounded-sm bg-muted" />
          <div className="h-3 w-3 rounded-sm bg-primary/20" />
          <div className="h-3 w-3 rounded-sm bg-primary/50" />
          <div className="h-3 w-3 rounded-sm bg-primary/80" />
          <span>More</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {days.map((day) => (
          <div
            key={day.date}
            className={cn(
              "h-3 w-3 rounded-sm transition-colors",
              day.score === -1 ? "bg-muted/40" : getIntensityClass(day.score)
            )}
            title={`${day.date}: ${day.score === -1 ? "No data" : `${day.score}/6 habits`}`}
          />
        ))}
      </div>
    </div>
  );
}
