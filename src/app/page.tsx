import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getStartOfToday } from "@/lib/dates";

export const dynamic = "force-dynamic";

export default async function Home() {
  let entry = null;

  try {
    const today = getStartOfToday();
    entry = await prisma.dailyEntry.findUnique({
      where: { date: today },
    });
  } catch {
    // DB unavailable — fall through to redirect to checkin
  }

  if (entry) {
    redirect("/today");
  } else {
    redirect("/checkin");
  }
}
