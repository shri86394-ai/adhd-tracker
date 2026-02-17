"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
}

export function StatCard({ icon: Icon, label, value, sub }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-lg font-bold leading-tight">{value}</p>
          {sub && (
            <p className="text-xs text-muted-foreground">{sub}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
