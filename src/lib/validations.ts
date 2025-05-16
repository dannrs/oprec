import { object, string, boolean, z } from 'zod';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { profile, user } from '@/db/schema';

const getPasswordSchema = (type: 'Password' | 'Konfirmasi Password') =>
  string({ required_error: `${type} harus diisi` })
    .min(8, `${type} tidak boleh kurang dari 8 karakter`)
    .max(32, `${type} tidak boleh lebih dari 32 karakter`);

const getEmailSchema = () =>
  string({ required_error: 'Email harus diisi' })
    .min(1, 'Email harus diisi')
    .email('Email tidak valid');

const getNameSchema = () =>
  string({ required_error: 'Nama harus diisi' })
    .min(1, 'Nama harus diisi')
    .max(50, 'Nama tidak boleh lebih dari 50 karakter');

export const signUpSchema = object({
  name: getNameSchema(),
  email: getEmailSchema(),
  nomorWhatsapp: string().regex(
    /^628\d*$/,
    "Nomor Whatsapp harus diawali dengan '628'"
  ),
  password: getPasswordSchema('Password'),
  confirmPassword: getPasswordSchema('Konfirmasi Password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak sama',
  path: ['confirmPassword'],
});

export const signInSchema = object({
  email: getEmailSchema(),
  password: getPasswordSchema('Password'),
  rememberMe: boolean(),
});

export const forgotPasswordSchema = object({
  email: getEmailSchema(),
});

export const resetPasswordSchema = object({
  password: getPasswordSchema('Password'),
  confirmPassword: getPasswordSchema('Konfirmasi Password'),
});

export const userSchema = createSelectSchema(user);
export const profileSchema = createSelectSchema(profile);
export const newProfileSchema = createInsertSchema(profile, {
  namaLengkap: (schema) => schema.min(1, 'Nama lengkap harus diisi'),
  tempatLahir: (schema) => schema.min(1, 'Tempat lahir harus diisi'),
  tanggalLahir: (schema) =>
    schema.min(new Date('1900-01-01'), 'Tanggal lahir harus diisi'),
  jenisKelamin: (schema) => schema.min(1, 'Jenis kelamin harus diisi'),
  agama: (schema) => schema.min(1, 'Agama harus diisi'),
  email: (schema) => schema.min(1, 'Email harus diisi'),
  nomorWhatsapp: (schema) =>
    schema.regex(
      /^628\d{8,11}$/,
      "No HP harus diawali dengan '628' dan terdiri dari 10-13 digit"
    ),
  instagram: (schema) => schema.min(1, 'Instagram harus diisi'),
  alamat: (schema) => schema.min(1, 'Alamat harus diisi'),
  asalSekolah: (schema) => schema.min(1, 'Asal sekolah harus diisi'),
  asalKota: (schema) => schema.min(1, 'Asal Kabupaten/Kota harus diisi'),
  kelas: (schema) => schema.min(1, 'Kelas harus diisi'),
  jenjangPendidikan: (schema) =>
    schema.min(1, 'Jenjang pendidikan harus diisi'),
}).omit({
  id: true,
  userId: true,
  asalWilayah: true,
});

export type ResetPassword = z.infer<typeof resetPasswordSchema>;
export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type NewProfile = z.infer<typeof newProfileSchema>;
