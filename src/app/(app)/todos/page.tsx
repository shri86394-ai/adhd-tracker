"use client";

import { useEffect, useState, useOptimistic, useCallback } from "react";
import { Loader2, ListChecks } from "lucide-react";
import { formatDate, getStartOfToday } from "@/lib/dates";
import { getTodos } from "./actions";
import { TodoInput } from "@/components/todo/todo-input";
import { TodoItem } from "@/components/todo/todo-item";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const [optimisticTodos, dispatch] = useOptimistic(
    todos,
    (
      state: Todo[],
      action:
        | { type: "add"; text: string }
        | { type: "toggle"; id: string }
        | { type: "delete"; id: string }
    ) => {
      switch (action.type) {
        case "add": {
          const now = new Date();
          return [
            ...state.filter((t) => !t.completed),
            {
              id: `temp-${Date.now()}`,
              text: action.text,
              completed: false,
              date: now,
              createdAt: now,
              updatedAt: now,
            },
            ...state.filter((t) => t.completed),
          ];
        }
        case "toggle":
          return state
            .map((t) =>
              t.id === action.id ? { ...t, completed: !t.completed } : t
            )
            .sort((a, b) => {
              if (a.completed !== b.completed) return a.completed ? 1 : -1;
              return (
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
              );
            });
        case "delete":
          return state.filter((t) => t.id !== action.id);
        default:
          return state;
      }
    }
  );

  const fetchTodos = useCallback(async () => {
    const data = await getTodos();
    setTodos(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Re-fetch after server action completes (revalidation)
  useEffect(() => {
    const interval = setInterval(fetchTodos, 3000);
    return () => clearInterval(interval);
  }, [fetchTodos]);

  const unchecked = optimisticTodos.filter((t) => !t.completed);
  const checked = optimisticTodos.filter((t) => t.completed);
  const today = getStartOfToday();

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Todos</h1>
        <p className="text-muted-foreground">{formatDate(today, "long")}</p>
      </div>

      <div className="mb-6">
        <TodoInput
          onOptimisticAdd={(text) => dispatch({ type: "add", text })}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : optimisticTodos.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <ListChecks className="h-12 w-12 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            No tasks yet. Add one above to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {unchecked.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onOptimisticToggle={(id) => dispatch({ type: "toggle", id })}
              onOptimisticDelete={(id) => dispatch({ type: "delete", id })}
            />
          ))}

          {unchecked.length > 0 && checked.length > 0 && (
            <div className="py-2">
              <div className="h-px bg-border" />
            </div>
          )}

          {checked.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onOptimisticToggle={(id) => dispatch({ type: "toggle", id })}
              onOptimisticDelete={(id) => dispatch({ type: "delete", id })}
            />
          ))}
        </div>
      )}
    </div>
  );
}
