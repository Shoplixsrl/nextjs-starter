import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import * as schema from "./schema";

// Export schema
export * from "./schema";

// Database connection
let db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!db) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not set");
    }

    neonConfig.fetchConnectionCache = true;
    const pool = new Pool({ connectionString });
    db = drizzle(pool, { schema });
  }

  return db;
}

export type Database = ReturnType<typeof getDb>;
