import { readSecret } from '@/lib/read-secret';

const password = readSecret(process.env.POSTGRES_PASSWORD_FILE!);
export const DATABASE_URL = `postgres://${process.env.POSTGRES_USER}:${password}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}?sslmode=${process.env.POSTGRES_SSLMODE}`;

export const BETTER_AUTH_SECRET = readSecret(
  process.env.BETTER_AUTH_SECRET_FILE!
);

export const RESEND_API_KEY = readSecret(process.env.RESEND_API_KEY_FILE!);
