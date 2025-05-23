import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@/db/schema';
import { DATABASE_URL } from '@/constants';

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === 'production'
      ? DATABASE_URL
      : process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema, logger: true });
