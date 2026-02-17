import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getStartOfToday, formatDate } from "@/lib/dates";
import { SummaryGrid } from "@/components/summary/summary-grid";

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  const today = getStartOfToday();
  let entry = null;

  try {
    entry = await prisma.dailyEntry.findUnique({
      where: { date: today },
    });
  } catch {
    // DB unavailable — redirect to checkin
  }

  if (!entry) {
    redirect("/checkin");
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Today&apos;s Summary</h1>
        <p className="text-muted-foreground">{formatDate(today, "long")}</p>
      </div>
      <SummaryGrid entry={entry} />
    </div>
  );
}
