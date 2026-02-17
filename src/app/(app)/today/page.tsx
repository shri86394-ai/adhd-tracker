import { redirect } from "next/navigation";
import { Quote } from "lucide-react";
import { prisma } from "@/lib/db";
import { getStartOfToday, formatDate } from "@/lib/dates";
import { getDailyQuote } from "@/lib/quotes";
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

  const quote = getDailyQuote();

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      {/* Daily quote */}
      <div className="mb-6 rounded-2xl border bg-card p-4">
        <Quote className="mb-2 h-5 w-5 text-primary/60" />
        <p className="text-sm font-medium italic leading-relaxed">
          &ldquo;{quote.text}&rdquo;
        </p>
        <p className="mt-1.5 text-xs text-muted-foreground">
          &mdash; {quote.author}
        </p>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Today&apos;s Summary</h1>
        <p className="text-muted-foreground">{formatDate(today, "long")}</p>
      </div>
      <SummaryGrid entry={entry} />
    </div>
  );
}
