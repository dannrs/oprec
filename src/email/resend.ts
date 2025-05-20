import { RESEND_API_KEY } from '@/constants';
import { Resend } from 'resend';

export const resend = new Resend(
  process.env.NODE_ENV === 'production'
    ? RESEND_API_KEY
    : process.env.RESEND_API_KEY
);
