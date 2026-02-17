"use client";

import { Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StepExerciseProps {
  value: boolean;
  onChange: (value: boolean) => void;
  onAutoAdvance: () => void;
}

export function StepExercise({ value, onChange, onAutoAdvance }: StepExerciseProps) {
  const handleSelect = (val: boolean) => {
    onChange(val);
    setTimeout(onAutoAdvance, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="rounded-full bg-primary/10 p-4">
        <Dumbbell className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-xl font-semibold">Did you exercise today?</h2>
      <div className="flex gap-4">
        <Button
          size="lg"
          variant="outline"
          className={cn(
            "h-16 w-28 rounded-2xl text-lg font-semibold transition-all",
            value === true &&
              "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
          )}
          onClick={() => handleSelect(true)}
        >
          Yes
        </Button>
        <Button
          size="lg"
          variant="outline"
          className={cn(
            "h-16 w-28 rounded-2xl text-lg font-semibold transition-all",
            value === false &&
              "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
          )}
          onClick={() => handleSelect(false)}
        >
          No
        </Button>
      </div>
    </div>
  );
}
