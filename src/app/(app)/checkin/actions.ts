"use server";

import { prisma } from "@/lib/db";
import { dailyEntrySchema } from "@/lib/validations";

export async function saveDailyEntry(input: unknown) {
  const parsed = dailyEntrySchema.parse(input);
  const dateObj = new Date(parsed.date + "T00:00:00.000Z");

  const entry = await prisma.dailyEntry.upsert({
    where: { date: dateObj },
    update: {
      waterCups: parsed.waterCups,
      coffeeCups: parsed.coffeeCups,
      sleepHours: parsed.sleepHours,
      alcohol: parsed.alcohol,
      exercise: parsed.exercise,
      meditation: parsed.meditation,
    },
    create: {
      date: dateObj,
      waterCups: parsed.waterCups,
      coffeeCups: parsed.coffeeCups,
      sleepHours: parsed.sleepHours,
      alcohol: parsed.alcohol,
      exercise: parsed.exercise,
      meditation: parsed.meditation,
    },
  });

  return { success: true, id: entry.id };
}
