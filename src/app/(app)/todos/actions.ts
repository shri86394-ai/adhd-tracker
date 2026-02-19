"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getStartOfToday } from "@/lib/dates";

export async function getTodos() {
  const today = getStartOfToday();

  const existing = await prisma.todo.findMany({
    where: { date: today },
  });

  if (existing.length === 0) {
    // Rollover: find the most recent day with todos
    const latest = await prisma.todo.findFirst({
      where: { date: { lt: today } },
      orderBy: { date: "desc" },
      select: { date: true },
    });

    if (latest) {
      const previousTodos = await prisma.todo.findMany({
        where: { date: latest.date },
      });

      if (previousTodos.length > 0) {
        await prisma.todo.createMany({
          data: previousTodos.map((t) => ({
            text: t.text,
            completed: true, // auto-check everything carried forward
            date: today,
          })),
        });
      }
    }
  }

  return prisma.todo.findMany({
    where: { date: today },
    orderBy: [{ completed: "asc" }, { createdAt: "asc" }],
  });
}

export async function addTodo(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const today = getStartOfToday();
  await prisma.todo.create({
    data: { text: trimmed, date: today },
  });

  revalidatePath("/todos");
}

export async function toggleTodo(id: string) {
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) return;

  await prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed },
  });

  revalidatePath("/todos");
}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({ where: { id } });
  revalidatePath("/todos");
}
