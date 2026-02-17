"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useWizard } from "@/hooks/use-wizard";
import { todayDateString } from "@/lib/dates";
import { saveDailyEntry } from "@/app/(app)/checkin/actions";
import { StepWater } from "./step-water";
import { StepCoffee } from "./step-coffee";
import { StepSleep } from "./step-sleep";
import { StepAlcohol } from "./step-alcohol";
import { StepExercise } from "./step-exercise";
import { StepMeditation } from "./step-meditation";
import { cn } from "@/lib/utils";

export function WizardContainer() {
  const router = useRouter();
  const {
    step,
    data,
    direction,
    progress,
    isFirstStep,
    isLastStep,
    isSubmitting,
    setIsSubmitting,
    next,
    back,
    updateField,
  } = useWizard();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await saveDailyEntry({
        date: todayDateString(),
        ...data,
      });
      toast.success("Check-in complete!");
      router.push("/today");
    } catch {
      toast.error("Failed to save. Please try again.");
      setIsSubmitting(false);
    }
  };

  const isBoolean = step >= 4;

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-4">
      {/* Progress header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b pb-4 pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Step {step} of 6
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step content */}
      <div className="flex flex-1 items-center justify-center py-8">
        <div
          key={step}
          className={cn(
            "w-full animate-in fade-in duration-300",
            direction === "forward" ? "slide-in-from-right-4" : "slide-in-from-left-4"
          )}
        >
          {step === 1 && (
            <StepWater
              value={data.waterCups}
              onChange={(v) => updateField("waterCups", v)}
            />
          )}
          {step === 2 && (
            <StepCoffee
              value={data.coffeeCups}
              onChange={(v) => updateField("coffeeCups", v)}
            />
          )}
          {step === 3 && (
            <StepSleep
              value={data.sleepHours}
              onChange={(v) => updateField("sleepHours", v)}
            />
          )}
          {step === 4 && (
            <StepAlcohol
              value={data.alcohol}
              onChange={(v) => updateField("alcohol", v)}
              onAutoAdvance={next}
            />
          )}
          {step === 5 && (
            <StepExercise
              value={data.exercise}
              onChange={(v) => updateField("exercise", v)}
              onAutoAdvance={next}
            />
          )}
          {step === 6 && (
            <StepMeditation
              value={data.meditation}
              onChange={(v) => updateField("meditation", v)}
              onAutoAdvance={handleSubmit}
            />
          )}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="sticky bottom-20 bg-background/80 backdrop-blur-sm border-t py-4">
        <div className="flex gap-3">
          {!isFirstStep && (
            <Button
              variant="outline"
              size="lg"
              className="flex-1 rounded-xl"
              onClick={back}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          {!isBoolean && (
            <Button
              size="lg"
              className="flex-1 rounded-xl"
              onClick={isLastStep ? handleSubmit : next}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : isLastStep ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <ArrowRight className="mr-2 h-4 w-4" />
              )}
              {isSubmitting ? "Saving..." : isLastStep ? "Done" : "Next"}
            </Button>
          )}
          {isBoolean && !isLastStep && (
            <Button
              variant="ghost"
              size="lg"
              className="flex-1 rounded-xl text-muted-foreground"
              onClick={next}
            >
              Skip
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {isBoolean && isLastStep && (
            <Button
              size="lg"
              className="flex-1 rounded-xl"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Check className="mr-2 h-4 w-4" />
              )}
              {isSubmitting ? "Saving..." : "Done"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
