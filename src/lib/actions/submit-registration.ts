'use server';

import { db } from '@/db';
import type { NewProfile } from '@/lib/validations';
import { profile, User, user } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { betterFetch } from '@better-fetch/fetch';
import { getUserProfile } from '../data/user';

export async function submitRegistration(
  formData: NewProfile,
  userData: User | null
) {
  if (!userData) return { success: false };
  const existingProfile = await getUserProfile(userData.id);

  const data = {
    ...formData,
    userId: userData.id,
    // email: userData.email,
    // nomorWhatsapp: userData.nomorWhatsapp,
  };

  try {
    await db.transaction(async (tx) => {
      await tx
        .update(user)
        .set({
          name: formData.namaLengkap,
          email: formData.email,
          nomorWhatsapp: formData.nomorWhatsapp,
        })
        .where(eq(user.id, userData.id));

      if (existingProfile) {
        await tx
          .update(profile)
          .set(data)
          .where(eq(profile.userId, userData.id));
      } else {
        await tx.insert(profile).values(data);
      }
    });

    revalidatePath('/pendaftaran');
    return { success: true };
  } catch (error) {
    console.error('Error updating profile: ', error);
    return { success: false };
  }
}
