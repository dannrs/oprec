import { object, string, boolean, date, number } from 'zod';

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

export const registrationSchema = object({
  name: getNameSchema(),
  email: getEmailSchema(),
  tempat_lahir: string(),
  tanggal_lahir: date().nullable(),
  jenis_kelamin: string(),
  agama: string(),
  no_hp: string(),
  instagram: string(),
  alamat: string(),
  asal_sekolah: string(),
  kota_kabupaten: string(),
  kelas: number(),
  jenjang_pendidikan: string(),
});
