"use client";

import { useState } from "react";
import {
  Minus,
  Plus,
  Pencil,
  Check,
  Droplets,
  Coffee,
  Moon,
  Wine,
  Dumbbell,
  Brain,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { updateEntry } from "@/app/(app)/today/actions";
import { toast } from "sonner";

type FieldConfig = {
  field: string;
  label: string;
  icon: LucideIcon;
  type: "number" | "boolean";
  unit?: string;
  max?: number;
};

export const FIELD_CONFIGS: FieldConfig[] = [
  { field: "waterCups", label: "Water", icon: Droplets, type: "number", unit: "cups", max: 30 },
  { field: "coffeeCups", label: "Coffee", icon: Coffee, type: "number", unit: "cups", max: 20 },
  { field: "sleepHours", label: "Sleep", icon: Moon, type: "number", unit: "hours", max: 24 },
  { field: "alcohol", label: "Alcohol", icon: Wine, type: "boolean" },
  { field: "exercise", label: "Exercise", icon: Dumbbell, type: "boolean" },
  { field: "meditation", label: "Meditation", icon: Brain, type: "boolean" },
];

interface SummaryCardProps {
  entryId: string;
  config: FieldConfig;
  value: number | boolean;
}

export function SummaryCard({ entryId, config, value }: SummaryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const Icon = config.icon;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateEntry(entryId, config.field, editValue);
      setIsEditing(false);
      toast.success(`${config.label} updated`);
    } catch {
      toast.error("Failed to update");
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    return (
      <Card className="relative">
        <CardContent className="flex flex-col items-center gap-3 p-4">
          <Icon className="h-6 w-6 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            {config.label}
          </span>
          {config.type === "number" ? (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() =>
                  setEditValue((v) => Math.max(0, (v as number) - 1))
                }
                disabled={(editValue as number) <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="min-w-[2.5rem] text-center text-3xl font-bold tabular-nums">
                {editValue as number}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() =>
                  setEditValue((v) =>
                    Math.min(config.max ?? 99, (v as number) + 1)
                  )
                }
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={editValue === true ? "default" : "outline"}
                className="rounded-xl"
                onClick={() => setEditValue(true)}
              >
                Yes
              </Button>
              <Button
                size="sm"
                variant={editValue === false ? "default" : "outline"}
                className="rounded-xl"
                onClick={() => setEditValue(false)}
              >
                No
              </Button>
            </div>
          )}
          <Button
            size="sm"
            className="w-full rounded-xl"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Check className="mr-1 h-4 w-4" />
            Save
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="group relative cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => {
        setEditValue(value);
        setIsEditing(true);
      }}
    >
      <CardContent className="flex flex-col items-center gap-2 p-4">
        <div className="flex w-full items-start justify-between">
          <Icon className="h-6 w-6 text-primary" />
          <Pencil className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <div className="text-center">
          {config.type === "number" ? (
            <>
              <p className="text-3xl font-bold">{value as number}</p>
              <p className="text-sm text-muted-foreground">{config.unit}</p>
            </>
          ) : (
            <p
              className={cn(
                "text-2xl font-bold",
                value ? "text-primary" : "text-muted-foreground"
              )}
            >
              {value ? "Yes" : "No"}
            </p>
          )}
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          {config.label}
        </span>
      </CardContent>
    </Card>
  );
}
