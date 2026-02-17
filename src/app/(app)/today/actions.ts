"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getStartOfToday } from "@/lib/dates";

export async function getTodayEntry() {
  const today = getStartOfToday();
  return prisma.dailyEntry.findUnique({ where: { date: today } });
}

export async function updateEntry(
  id: string,
  field: string,
  value: number | boolean
) {
  await prisma.dailyEntry.update({
    where: { id },
    data: { [field]: value },
  });
  revalidatePath("/today");
  return { success: true };
}
