"use client";

import { useState, useCallback } from "react";

export interface WizardData {
  waterCups: number;
  coffeeCups: number;
  sleepHours: number;
  alcohol: boolean;
  exercise: boolean;
  meditation: boolean;
}

const INITIAL_DATA: WizardData = {
  waterCups: 0,
  coffeeCups: 0,
  sleepHours: 7,
  alcohol: false,
  exercise: false,
  meditation: false,
};

const TOTAL_STEPS = 6;

export function useWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = (step / TOTAL_STEPS) * 100;
  const isFirstStep = step === 1;
  const isLastStep = step === TOTAL_STEPS;

  const next = useCallback(() => {
    if (step < TOTAL_STEPS) {
      setDirection("forward");
      setStep((s) => s + 1);
    }
  }, [step]);

  const back = useCallback(() => {
    if (step > 1) {
      setDirection("back");
      setStep((s) => s - 1);
    }
  }, [step]);

  const updateField = useCallback(
    <K extends keyof WizardData>(field: K, value: WizardData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  return {
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
  };
}
