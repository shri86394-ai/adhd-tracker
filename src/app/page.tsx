import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getStartOfToday } from "@/lib/dates";

export const dynamic = "force-dynamic";

export default async function Home() {
  const today = getStartOfToday();

  const entry = await prisma.dailyEntry.findUnique({
    where: { date: today },
  });

  if (entry) {
    redirect("/today");
  } else {
    redirect("/checkin");
  }
}
