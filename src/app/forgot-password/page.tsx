import { ForgotPasswordForm } from '@/components/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
