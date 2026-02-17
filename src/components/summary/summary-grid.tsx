"use client";

import { SummaryCard, FIELD_CONFIGS } from "./summary-card";
import type { DailyEntry } from "@/generated/prisma/client";

interface SummaryGridProps {
  entry: DailyEntry;
}

export function SummaryGrid({ entry }: SummaryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {FIELD_CONFIGS.map((config) => (
        <SummaryCard
          key={config.field}
          entryId={entry.id}
          config={config}
          value={entry[config.field as keyof DailyEntry] as number | boolean}
        />
      ))}
    </div>
  );
}
