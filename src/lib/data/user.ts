import { db } from '@/db';
import { profile, user } from '@/db/schema';
import { eq } from 'drizzle-orm';
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

export async function getUsersGenderStats() {
  const session = await getSession();
  if (!session) return null;

  try {
    const maleCount = await db
      .select()
      .from(profile)
      .where(eq(profile.jenisKelamin, 'Laki-laki'));
    const femaleCount = await db
      .select()
      .from(profile)
      .where(eq(profile.jenisKelamin, 'Perempuan'));

    return {
      male: maleCount.length,
      female: femaleCount.length,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUsersSchoolStats() {
  const session = await getSession();
  if (!session) return null;

  try {
    const smaCount = await db
      .select()
      .from(profile)
      .where(eq(profile.jenjangPendidikan, 'SMA'));
    const smkCount = await db
      .select()
      .from(profile)
      .where(eq(profile.jenjangPendidikan, 'SMK'));
    const maCount = await db
      .select()
      .from(profile)
      .where(eq(profile.jenjangPendidikan, 'MA'));

    return {
      sma: smaCount.length,
      smk: smkCount.length,
      ma: maCount.length,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUsersRegionStats() {
  const session = await getSession();
  if (!session) return null;

  try {
    const wilayahICount = await db
      .select()
      .from(profile)
      .where(eq(profile.asalWilayah, 'Wilayah I'));

    const wilayahIICount = await db
      .select()
      .from(profile)
      .where(eq(profile.asalWilayah, 'Wilayah II'));

    const wilayahIIICount = await db
      .select()
      .from(profile)
      .where(eq(profile.asalWilayah, 'Wilayah III'));

    const wilayahIVCount = await db
      .select()
      .from(profile)
      .where(eq(profile.asalWilayah, 'Wilayah IV'));

    const wilayahVCount = await db
      .select()
      .from(profile)
      .where(eq(profile.asalWilayah, 'Wilayah V'));

    const wilayahVICount = await db
      .select()
      .from(profile)
      .where(eq(profile.asalWilayah, 'Wilayah VI'));

    const wilayahVIICount = await db
      .select()
      .from(profile)
      .where(eq(profile.asalWilayah, 'Wilayah VII'));

    const wilayahVIIICount = await db
      .select()
      .from(profile)
      .where(eq(profile.asalWilayah, 'Wilayah VIII'));

    const wilayahIXCount = await db
      .select()
      .from(profile)
      .where(eq(profile.asalWilayah, 'Wilayah IX'));

    const wilayahXCount = await db
      .select()
      .from(profile)
      .where(eq(profile.asalWilayah, 'Wilayah X'));

    const wilayahXICount = await db
      .select()
      .from(profile)
      .where(eq(profile.asalWilayah, 'Wilayah XI'));

    const wilayahXIICount = await db
      .select()
      .from(profile)
      .where(eq(profile.asalWilayah, 'Wilayah XII'));

    const wilayahXIIICount = await db
      .select()
      .from(profile)
      .where(eq(profile.asalWilayah, 'Wilayah XIII'));

    return {
      wilayahI: wilayahICount.length,
      wilayahII: wilayahIICount.length,
      wilayahIII: wilayahIIICount.length,
      wilayahIV: wilayahIVCount.length,
      wilayahV: wilayahVCount.length,
      wilayahVI: wilayahVICount.length,
      wilayahVII: wilayahVIICount.length,
      wilayahVIII: wilayahVIIICount.length,
      wilayahIX: wilayahIXCount.length,
      wilayahX: wilayahXCount.length,
      wilayahXI: wilayahXICount.length,
      wilayahXII: wilayahXIICount.length,
      wilayahXIII: wilayahXIIICount.length,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
