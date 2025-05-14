import 'server-only';

import { headers } from 'next/headers';
import { auth } from '../auth';
import { redirect } from 'next/navigation';

export async function getSession() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (!data) redirect('/login');

  const { session } = data;

  return session;
}
