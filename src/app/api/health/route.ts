import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import redis from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = {
    postgres: "erro" as "ok" | "erro",
    redis: "erro" as "ok" | "erro",
  };

  try {
    await db.execute(sql`select 1`);
    status.postgres = "ok";
  } catch {
    status.postgres = "erro";
  }

  try {
    await redis.ping();
    status.redis = "ok";
  } catch {
    status.redis = "erro";
  }

  const saudavel = status.postgres === "ok" && status.redis === "ok";

  return NextResponse.json(status, { status: saudavel ? 200 : 503 });
}
