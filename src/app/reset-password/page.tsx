import { ResetPasswordForm } from '@/components/reset-password-form';

export default async function ResetPasswordPage() {
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
