import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from '@/constants';

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url:
      process.env.NODE_ENV === 'production'
        ? DATABASE_URL
        : process.env.DATABASE_URL!,
  },
});
