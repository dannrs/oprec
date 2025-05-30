import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin as adminPlugin } from 'better-auth/plugins';
import { db } from '@/db';
import { nextCookies } from 'better-auth/next-js';
import { getResend } from '@/email/resend';
import { VerifyEmail } from '@/email/email-template';
import { ResetPasswordEmail } from '@/email/reset-password-template';
import { ac, admin, anggota, pengurus } from './auth/permissions';
import { BETTER_AUTH_SECRET } from '@/constants';

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || process.env.VERCEL_URL,
  secret:
    process.env.NODE_ENV === 'production'
      ? BETTER_AUTH_SECRET
      : process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  trustedOrigins: [
    'http://localhost:3000',
    process.env.VERCEL_URL!,
    'https://oprec.forumosisjabar.id',
  ],
  plugins: [
    adminPlugin({
      ac,
      defaultRole: 'anggota',
      adminUserIds: ['kKZpEmyIWc6sYbiRNTv8WBQJXufeg9Nu'],
      roles: {
        admin,
        pengurus,
        anggota,
      },
    }),
    nextCookies(),
  ],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      const resend = getResend();
      await resend.emails.send({
        from: `Forum OSIS Jawa Barat ${process.env.NODE_ENV === 'production' ? '<no-reply@transactional.forumosisjabar.id>' : '<no-reply@mail.danni.my.id>'}`,
        to: user.email,
        subject: 'Reset Password',
        react: ResetPasswordEmail({
          username: user.name,
          resetPasswordUrl: url,
        }),
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const resend = getResend();
      const baseUrl = process.env.BETTER_AUTH_URL || process.env.VERCEL_URL;
      const verificationUrl = `${baseUrl}/api/auth/verify-email?token=${token}&callbackURL=${process.env.BETTER_AUTH_URL}/email-verified`;
      await resend.emails.send({
        from: `Forum OSIS Jawa Barat ${process.env.NODE_ENV === 'production' ? '<no-reply@transactional.forumosisjabar.id>' : '<no-reply@mail.danni.my.id>'}`,
        to: user.email,
        subject: 'Verifikasi Alamat Email Anda',
        react: VerifyEmail({
          username: user.name,
          verificationUrl,
        }),
      });
    },
  },
  user: {
    additionalFields: {
      nomorWhatsapp: {
        type: 'string',
        required: true,
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
