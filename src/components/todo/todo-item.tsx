"use client";

import { useRef, useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleTodo, deleteTodo } from "@/app/(app)/todos/actions";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onOptimisticToggle: (id: string) => void;
  onOptimisticDelete: (id: string) => void;
}

export function TodoItem({
  id,
  text,
  completed,
  onOptimisticToggle,
  onOptimisticDelete,
}: TodoItemProps) {
  const [, startTransition] = useTransition();
  const [offsetX, setOffsetX] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const touchStartX = useRef(0);
  const itemRef = useRef<HTMLDivElement>(null);

  const THRESHOLD = 0.3; // 30% of item width

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    setSwiping(true);
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!swiping) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    // Only allow swiping left (negative)
    setOffsetX(Math.min(0, delta));
  }

  function handleTouchEnd() {
    if (!swiping) return;
    setSwiping(false);

    const width = itemRef.current?.offsetWidth ?? 300;
    if (Math.abs(offsetX) > width * THRESHOLD) {
      // Swipe past threshold — animate off and delete
      setOffsetX(-width);
      setTimeout(() => {
        onOptimisticDelete(id);
        startTransition(() => {
          deleteTodo(id);
        });
      }, 200);
    } else {
      // Snap back
      setOffsetX(0);
    }
  }

  function handleToggle() {
    onOptimisticToggle(id);
    startTransition(() => {
      toggleTodo(id);
    });
  }

  function handleDelete() {
    onOptimisticDelete(id);
    startTransition(() => {
      deleteTodo(id);
    });
  }

  return (
    <div ref={itemRef} className="group relative overflow-hidden rounded-xl">
      {/* Red delete zone behind */}
      <div className="absolute inset-0 flex items-center justify-end bg-destructive px-4">
        <Trash2 className="h-5 w-5 text-destructive-foreground" />
      </div>

      {/* Sliding foreground */}
      <div
        className={cn(
          "relative flex items-center gap-3 rounded-xl border bg-card px-4 py-3",
          !swiping && "transition-transform duration-200"
        )}
        style={{ transform: `translateX(${offsetX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Checkbox */}
        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
            completed
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted-foreground/40 hover:border-primary"
          )}
          aria-label={completed ? "Uncheck task" : "Check task"}
        >
          {completed && (
            <svg
              className="h-3 w-3"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 6l3 3 5-5" />
            </svg>
          )}
        </button>

        {/* Text */}
        <span
          className={cn(
            "flex-1 text-sm",
            completed && "text-muted-foreground line-through"
          )}
        >
          {text}
        </span>

        {/* Delete button — desktop hover */}
        <button
          type="button"
          onClick={handleDelete}
          className="hidden shrink-0 text-muted-foreground/40 transition-colors hover:text-destructive group-hover:block"
          aria-label="Delete task"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
