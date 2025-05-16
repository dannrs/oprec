import { db } from '@/db';
import { sekolah } from '@/db/schema';

export async function getSchoolNameList() {
  const data = await db.select().from(sekolah);

  return { sekolah: data };
}
