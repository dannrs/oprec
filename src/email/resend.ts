import { RESEND_API_KEY } from '@/constants';
import { Resend } from 'resend';

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY_FILE
    ? RESEND_API_KEY
    : process.env.RESEND_API_KEY;
  return new Resend(apiKey);
}
