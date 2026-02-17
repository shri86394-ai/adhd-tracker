"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Droplets,
  Coffee,
  Moon,
  Dumbbell,
  Brain,
  Wine,
  Loader2,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatCard } from "@/components/charts/stat-card";
import { WaterChart } from "@/components/charts/water-chart";
import { SleepChart } from "@/components/charts/sleep-chart";
import { CoffeeChart } from "@/components/charts/coffee-chart";
import { HabitsChart } from "@/components/charts/habits-chart";
import { HeatMap } from "@/components/charts/heat-map";
import { getWeekData, getMonthData, getYearData } from "./actions";

type Period = "week" | "month" | "year";

type StatsData = Awaited<ReturnType<typeof getWeekData>>;

export default function StatsPage() {
  const [period, setPeriod] = useState<Period>("week");
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (p: Period) => {
    setLoading(true);
    try {
      const result =
        p === "week"
          ? await getWeekData()
          : p === "month"
            ? await getMonthData()
            : await getYearData();
      setData(result);
    } catch {
      // Handle error silently for now
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(period);
  }, [period, fetchData]);

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Stats</h1>
        <p className="text-muted-foreground">Track your habits over time</p>
      </div>

      <Tabs
        value={period}
        onValueChange={(v) => setPeriod(v as Period)}
        className="mb-6"
      >
        <TabsList className="w-full">
          <TabsTrigger value="week" className="flex-1">
            Week
          </TabsTrigger>
          <TabsTrigger value="month" className="flex-1">
            Month
          </TabsTrigger>
          <TabsTrigger value="year" className="flex-1">
            Year
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : !data || data.totalDays === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          <p>No data for this period yet.</p>
          <p className="text-sm">Start checking in daily to see your stats!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Averages grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={Droplets}
              label="Avg Water"
              value={`${data.averages.avgWater}`}
              sub="cups/day"
            />
            <StatCard
              icon={Coffee}
              label="Avg Coffee"
              value={`${data.averages.avgCoffee}`}
              sub="cups/day"
            />
            <StatCard
              icon={Moon}
              label="Avg Sleep"
              value={`${data.averages.avgSleep}`}
              sub="hours/night"
            />
            <StatCard
              icon={Dumbbell}
              label="Exercise"
              value={`${data.averages.exerciseRate}%`}
              sub="of days"
            />
            <StatCard
              icon={Brain}
              label="Meditation"
              value={`${data.averages.meditationRate}%`}
              sub="of days"
            />
            <StatCard
              icon={Wine}
              label="Alcohol"
              value={`${data.averages.alcoholRate}%`}
              sub="of days"
            />
          </div>

          <Separator />

          {/* Charts */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Water Intake</CardTitle>
            </CardHeader>
            <CardContent>
              <WaterChart data={data.entries} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Sleep</CardTitle>
            </CardHeader>
            <CardContent>
              <SleepChart data={data.entries} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Coffee</CardTitle>
            </CardHeader>
            <CardContent>
              <CoffeeChart data={data.entries} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Habits</CardTitle>
            </CardHeader>
            <CardContent>
              <HabitsChart data={data.entries} />
            </CardContent>
          </Card>

          <Separator />

          {/* Heat map */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Activity Heat Map</CardTitle>
            </CardHeader>
            <CardContent>
              <HeatMap data={data.entries} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
