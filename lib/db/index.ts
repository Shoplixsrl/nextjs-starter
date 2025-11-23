import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Initialize database connection only if DATABASE_URL is available
// This allows the build to succeed without requiring the database connection
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = sql ? drizzle(sql, { schema }) : null as any;
