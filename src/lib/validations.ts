import { z } from "zod";

export const dailyEntrySchema = z.object({
  date: z.string().date(),
  waterCups: z.number().int().min(0).max(30),
  coffeeCups: z.number().int().min(0).max(20),
  sleepHours: z.number().int().min(0).max(24),
  alcohol: z.boolean(),
  exercise: z.boolean(),
  meditation: z.boolean(),
});

export type DailyEntryInput = z.infer<typeof dailyEntrySchema>;
