'use server';

import { db } from '@/db';
import type { NewProfile, newProfileSchema, Profile } from '@/lib/validations';
import { kabupaten_kota, profile, sekolah, user } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getUser(userId: string) {
  const data = await db.select().from(user).where(eq(user.id, userId));

  return data;
}
export async function getUserProfile(userId: string) {
  const data = await db
    .select()
    .from(profile)
    .where(eq(profile.userId, userId))
    .limit(1);

  return data;
}

export async function getSchoolNameList() {
  const data = await db.select().from(sekolah);

  return { data };
}

export async function getRegionNameList() {
  const data = await db.select().from(kabupaten_kota);

  return { data };
}

export async function submitRegistration(formData: NewProfile, userId: string) {
  const existingProfile = await getUserProfile(userId);

  const data = {
    ...formData,
    userId,
  };

  if (existingProfile.length > 0) {
    try {
      await db.update(profile).set(data).where(eq(profile.userId, userId));
      return { success: true };
    } catch (error) {
      console.error('Error updating profile: ', error);
      return { success: false };
    }
  }

  try {
    console.log('formData', formData);
    await db.insert(profile).values(data);
    return { success: true };
  } catch (error) {
    console.error('Error adding profile: ', error);
    return { success: true };
  }
}
