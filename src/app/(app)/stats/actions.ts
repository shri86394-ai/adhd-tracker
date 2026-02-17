"use server";

import { prisma } from "@/lib/db";
import type { DailyEntry } from "@/generated/prisma/client";

function computeAverages(entries: DailyEntry[]) {
  if (entries.length === 0) {
    return {
      avgWater: 0,
      avgCoffee: 0,
      avgSleep: 0,
      exerciseRate: 0,
      meditationRate: 0,
      alcoholRate: 0,
    };
  }

  const n = entries.length;
  return {
    avgWater: Math.round((entries.reduce((s, e) => s + e.waterCups, 0) / n) * 10) / 10,
    avgCoffee: Math.round((entries.reduce((s, e) => s + e.coffeeCups, 0) / n) * 10) / 10,
    avgSleep: Math.round((entries.reduce((s, e) => s + e.sleepHours, 0) / n) * 10) / 10,
    exerciseRate: Math.round((entries.filter((e) => e.exercise).length / n) * 100),
    meditationRate: Math.round((entries.filter((e) => e.meditation).length / n) * 100),
    alcoholRate: Math.round((entries.filter((e) => e.alcohol).length / n) * 100),
  };
}

function serializeEntries(entries: DailyEntry[]) {
  return entries.map((e) => ({
    date: e.date.toISOString().split("T")[0],
    waterCups: e.waterCups,
    coffeeCups: e.coffeeCups,
    sleepHours: e.sleepHours,
    alcohol: e.alcohol,
    exercise: e.exercise,
    meditation: e.meditation,
  }));
}

export async function getWeekData() {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  weekAgo.setHours(0, 0, 0, 0);

  const entries = await prisma.dailyEntry.findMany({
    where: { date: { gte: weekAgo } },
    orderBy: { date: "asc" },
  });

  return {
    entries: serializeEntries(entries),
    averages: computeAverages(entries),
    totalDays: entries.length,
  };
}

export async function getMonthData() {
  const now = new Date();
  const monthAgo = new Date(now);
  monthAgo.setDate(monthAgo.getDate() - 30);
  monthAgo.setHours(0, 0, 0, 0);

  const entries = await prisma.dailyEntry.findMany({
    where: { date: { gte: monthAgo } },
    orderBy: { date: "asc" },
  });

  return {
    entries: serializeEntries(entries),
    averages: computeAverages(entries),
    totalDays: entries.length,
  };
}

export async function getYearData() {
  const now = new Date();
  const yearAgo = new Date(now);
  yearAgo.setFullYear(yearAgo.getFullYear() - 1);
  yearAgo.setHours(0, 0, 0, 0);

  const entries = await prisma.dailyEntry.findMany({
    where: { date: { gte: yearAgo } },
    orderBy: { date: "asc" },
  });

  return {
    entries: serializeEntries(entries),
    averages: computeAverages(entries),
    totalDays: entries.length,
  };
}
