import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  date,
  uuid,
  serial,
} from 'drizzle-orm/pg-core';
import { z } from 'zod';

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
  id: uuid('id').primaryKey().unique().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  nama_lengkap: text('nama_lengkap').notNull(),
  tempat_lahir: text('tempat_lahir').notNull(),
  tanggal_lahir: date('tanggal_lahir', { mode: 'date' }).notNull(),
  jenis_kelamin: text('jenis_kelamin').notNull(),
  agama: text('agama').notNull(),
  no_hp: text('no_hp').notNull(),
  instagram: text('instagram').notNull(),
  alamat: text('alamat').notNull(),
  asal_sekolah: text('asal_sekolah').notNull(),
  kota_kabupaten: text('kota_kabupaten').notNull(),
  kelas: text('kelas').notNull(),
  jenjang_pendidikan: text('jenjang_pendidikan').notNull(),
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

export const sekolah = pgTable('sekolah', {
  id: serial('id').primaryKey(),
  nama: text('nama').notNull(),
});

export const kabupaten_kota = pgTable('kabupaten_kota', {
  id: serial('id').primaryKey(),
  nama: text('nama').notNull(),
});

export type User = typeof user.$inferSelect;
