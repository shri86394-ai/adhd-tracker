"use client";

import { useRef, useTransition } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addTodo } from "@/app/(app)/todos/actions";

interface TodoInputProps {
  onOptimisticAdd: (text: string) => void;
}

export function TodoInput({ onOptimisticAdd }: TodoInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit() {
    const text = inputRef.current?.value.trim();
    if (!text) return;

    onOptimisticAdd(text);
    inputRef.current!.value = "";

    startTransition(() => {
      addTodo(text);
    });
  }

  return (
    <div className="flex gap-2">
      <Input
        ref={inputRef}
        placeholder="Add a task..."
        disabled={pending}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />
      <Button
        size="icon"
        onClick={handleSubmit}
        disabled={pending}
        aria-label="Add task"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
