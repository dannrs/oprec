import { object, string, boolean, date, number, z } from 'zod';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { profile, user } from '@/db/schema';

const getPasswordSchema = (type: 'password' | 'confirmPassword') =>
  string({ required_error: `${type} is required` })
    .min(8, `${type} must be atleast 8 characters`)
    .max(32, `${type} can not exceed 32 characters`);

const getEmailSchema = () =>
  string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email');

const getNameSchema = () =>
  string({ required_error: 'Name is required' })
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters');

export const signUpSchema = object({
  name: getNameSchema(),
  email: getEmailSchema(),
  password: getPasswordSchema('password'),
  confirmPassword: getPasswordSchema('confirmPassword'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const signInSchema = object({
  email: getEmailSchema(),
  password: getPasswordSchema('password'),
  rememberMe: boolean(),
});

export const userSchema = createSelectSchema(user);
export const profileSchema = createSelectSchema(profile);
export const newProfileSchema = createInsertSchema(profile, {
  nama_lengkap: (schema) => schema.min(1, 'Nama lengkap harus diisi'),
  tempat_lahir: (schema) => schema.min(1, 'Tempat lahir harus diisi'),
  tanggal_lahir: (schema) =>
    schema.min(new Date('1900-01-01'), 'Tanggal lahir harus diisi'),
  jenis_kelamin: (schema) => schema.min(1, 'Jenis kelamin harus diisi'),
  agama: (schema) => schema.min(1, 'Agama harus diisi'),
  no_hp: (schema) =>
    schema.regex(
      /^08\d{8,11}$/,
      "No HP harus diawali dengan '08' dan terdiri dari 10-13 digit"
    ),
  instagram: (schema) => schema.min(1, 'Instagram harus diisi'),
  alamat: (schema) => schema.min(1, 'Alamat harus diisi'),
  asal_sekolah: (schema) => schema.min(1, 'Asal sekolah harus diisi'),
  kota_kabupaten: (schema) => schema.min(1, 'Kabupaten/Kota harus diisi'),
  kelas: (schema) => schema.min(1, 'Kelas harus diisi'),
  jenjang_pendidikan: (schema) =>
    schema.min(1, 'Jenjang pendidikan harus diisi'),
}).omit({
  id: true,
  userId: true,
});

export type Profile = z.infer<typeof profileSchema>;
export type NewProfile = z.infer<typeof newProfileSchema>;
