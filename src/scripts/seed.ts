import { nanoid } from 'nanoid';
import { faker } from '@faker-js/faker';
import { db } from '@/db';
import fs from 'fs/promises';
import { parse } from 'csv-parse';
import { account, kabupaten_kota, profile, sekolah, user } from '@/db/schema';

type SekolahRow = {
  nama: string;
};

type KotaKabupatenRow = {
  nama: string;
  wilayah: string;
};

async function parseCSV<T>(filePath: string): Promise<T[]> {
  const file = await fs.readFile(filePath, 'utf-8');
  return new Promise((resolve, reject) => {
    parse(file, { columns: true, trim: true }, (err, records: T[]) => {
      if (err) reject(err);
      else resolve(records);
    });
  });
}

async function seed() {
  const school = await db
    .select({
      name: sekolah.nama,
    })
    .from(sekolah);

  const schoolName = school.map((item) => item.name);

  const region = await db
    .select({
      name: kabupaten_kota.nama,
    })
    .from(kabupaten_kota);

  const regionName = region.map((item) => item.name);

  const now = new Date();
  const totalUsers = 1;

  for (let i = 0; i < totalUsers; i++) {
    const userId = nanoid();
    const email = faker.internet.email();
    const fullName = faker.person.fullName();

    await db.insert(user).values({
      id: userId,
      name: fullName,
      email,
      nomorWhatsapp: faker.phone.number({ style: 'national' }),
      emailVerified: true,
      image: faker.image.avatar(),
      createdAt: now,
      updatedAt: now,
      role: faker.helpers.arrayElement(['admin', 'pengurus', 'anggota']),
      banned: false,
    });

    await db.insert(account).values({
      id: nanoid(),
      accountId: email,
      providerId: 'email',
      userId,
      password: 'password123',
      createdAt: now,
      updatedAt: now,
    });

    await db.insert(profile).values({
      userId,
      namaLengkap: fullName,
      tempatLahir: faker.location.city(),
      tanggalLahir: faker.date.birthdate({ min: 15, max: 18, mode: 'age' }),
      jenisKelamin: faker.helpers.arrayElement(['Laki-laki', 'Perempuan']),
      agama: faker.helpers.arrayElement([
        'Islam',
        'Kristen',
        'Katolik',
        'Hindu',
        'Buddha',
      ]),
      email,
      instagram: `@${faker.internet.username()}`,
      nomorWhatsapp: faker.phone.number({ style: 'national' }),
      asalSekolah: faker.helpers.arrayElement(schoolName),
      asalKota: faker.helpers.arrayElement(regionName),
      asalWilayah: faker.helpers.arrayElement([
        'Wilayah I',
        'Wilayah II',
        'Wilayah III',
        'Wilayah IV',
        'Wilayah V',
        'Wilayah VI',
        'Wilayah VII',
        'Wilayah VIII',
        'Wilayah IX',
        'Wilayah X',
        'Wilayah XI',
        'Wilayah XII',
        'Wilayah XIII',
      ]),
      kelas: faker.helpers.arrayElement(['10', '11', '12']),
      jenjangPendidikan: faker.helpers.arrayElement(['SMA', 'SMK', 'MA']),
      alamat: faker.location.streetAddress(),
    });
  }

  console.log(
    `✅ Seeded ${totalUsers} users with matching profiles and accounts`
  );
}

async function seedSekolah() {
  const records = await parseCSV<SekolahRow>(
    '/home/dann/documents/projects/oprec/src/scripts/data/sekolah.csv'
  );
  const values = records.map((row) => ({ nama: row.nama }));
  await db.insert(sekolah).values(values);
  console.log(`✅ Inserted ${values.length} sekolah`);
}

async function seedKotaKabupaten() {
  const records = await parseCSV<KotaKabupatenRow>(
    '/home/dann/documents/projects/oprec/src/scripts/data/kabupaten_kota.csv'
  );
  const values = records.map((row) => ({
    nama: row.nama,
    wilayah: row.wilayah,
  }));
  await db.insert(kabupaten_kota).values(values);
  console.log(`✅ Inserted ${values.length} kabupaten/kota`);
}

async function main() {
  try {
    await seedSekolah();
    await seedKotaKabupaten();
    await seed();
  } catch (err) {
    console.error('❌ Seeding error:', err);
  }
}

main()
  .then(() => {
    console.log('✅ Seeding completed');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
