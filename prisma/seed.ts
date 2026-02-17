import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter }) as unknown as PrismaClient;

async function main() {
  console.log("Seeding database...");

  // Clear existing entries
  await prisma.dailyEntry.deleteMany();

  const entries = [];
  const now = new Date();

  for (let i = 90; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    entries.push({
      date,
      waterCups: Math.floor(Math.random() * 8) + 3, // 3-10
      coffeeCups: Math.floor(Math.random() * 4), // 0-3
      sleepHours: Math.floor(Math.random() * 5) + 5, // 5-9
      alcohol: Math.random() < 0.2, // 20% chance
      exercise: Math.random() < 0.6, // 60% chance
      meditation: Math.random() < 0.4, // 40% chance
    });
  }

  for (const entry of entries) {
    await prisma.dailyEntry.create({ data: entry });
  }

  console.log(`Seeded ${entries.length} daily entries`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
