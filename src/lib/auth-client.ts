import { createAuthClient } from 'better-auth/react';
import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { auth } from './auth';
import { ac, admin, anggota, pengurus } from './auth/permissions';

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        pengurus,
        anggota,
      },
    }),
    inferAdditionalFields<typeof auth>(),
  ],
});

export type ClientSession = typeof authClient.$Infer.Session;
