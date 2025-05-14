import { db } from '@/db';
import { kabupaten_kota } from '@/db/schema';

export async function getRegionList() {
  const data = await db.select().from(kabupaten_kota);

  return { region: data };
}
