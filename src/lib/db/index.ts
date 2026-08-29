import "server-only";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

declare global {
  var __dominiaDbPool: Pool | undefined;
}

/**
 * Reaproveita o pool entre recarregamentos do módulo no hot reload do `next
 * dev`: sem isso, cada edição de arquivo recriaria o Pool e estouraria o
 * limite de 10 conexões da instância única de Postgres.
 */
const pool =
  global.__dominiaDbPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  });

if (process.env.NODE_ENV !== "production") {
  global.__dominiaDbPool = pool;
}

export const db = drizzle(pool, { schema });
