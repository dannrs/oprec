import { db } from '@/db';
import { kabupaten_kota, profile, sekolah, user } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '../auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSession } from './session';

export async function getUsers() {
  const session = await getSession();
  if (!session) return null;

  try {
    const data = await db.select().from(user);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getUser(userId: string) {
  const session = await getSession();
  if (!session) return null;

  try {
    const [data] = await db
      .select()
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserProfiles() {
  const data = await db.select().from(profile);

  return data;
}

export async function getUserProfile(userId: string) {
  const session = await getSession();
  if (!session) return null;

  try {
    const [data] = await db
      .select()
      .from(profile)
      .where(eq(profile.userId, userId))
      .limit(1);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
