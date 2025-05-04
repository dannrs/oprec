import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  date,
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  role: text('role'),
  banned: boolean('banned'),
  banReason: text('ban_reason'),
  banExpires: timestamp('ban_expires'),
});

export const profile = pgTable('profile', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  tempat_lahir: text('tempat_lahir'),
  tanggal_lahir: date('tanggal_lahir', { mode: 'date' }),
  jenis_kelamin: text('jenis_kelamin'),
  agama: text('agama'),
  no_hp: text('no_hp'),
  instagram: text('instagram'),
  alamat: text('alamat'),
  asal_sekolah: text('asal_sekolah'),
  kota_kabupaten: text('kota_kabupaten'),
  kelas: integer('kelas'),
  jenjang_pendidikan: text('jenjang_pendidikan'),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  impersonatedBy: text('impersonated_by'),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const asal_sekolah = pgTable('asal_sekolah', {
  npsn: text('npsn').primaryKey(),
  nama_sekolah: text('nama_sekolah').notNull(),
  kota_kabupaten: text('kota_kabupaten').notNull(),
  provinsi: text('provinsi').notNull(),
  jenis: text('jenis').notNull(),
});

export type User = typeof user.$inferSelect;
