"use client";

import { Minus, Plus, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepWaterProps {
  value: number;
  onChange: (value: number) => void;
}

export function StepWater({ value, onChange }: StepWaterProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="rounded-full bg-primary/10 p-4">
        <Droplets className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-xl font-semibold">Cups of water today?</h2>
      <div className="flex items-center gap-8">
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-full text-lg"
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={value <= 0}
        >
          <Minus className="h-6 w-6" />
        </Button>
        <span className="min-w-[4rem] text-center text-6xl font-bold tabular-nums">
          {value}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-full text-lg"
          onClick={() => onChange(Math.min(30, value + 1))}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
      <p className="text-muted-foreground">cups</p>
    </div>
  );
}
