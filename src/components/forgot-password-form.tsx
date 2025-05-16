'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorContext } from '@better-fetch/fetch';
import { authClient } from '@/lib/auth-client';
import { type ForgotPassword, forgotPasswordSchema } from '@/lib/validations';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import LoadingButton from './loading-button';

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();

  const form = useForm<ForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ForgotPassword) => {
    await authClient.forgetPassword(
      {
        email: values.email,
        redirectTo: '/reset-password',
      },
      {
        onSuccess: () => {
          toast.success('Sukses', {
            description:
              'Jika email ini terdaftar, Anda akan menerima tautan untuk reset password',
          });
          router.push('/login');
        },
        onError: (ctx: ErrorContext) => {
          console.log(ctx);
          toast.error('Terjadi kesalahan', {
            description: ctx.error.message,
          });
        },
      }
    );
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='max-w-sm'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Lupa Password</CardTitle>
          <CardDescription>
            Silakan masukkan email Anda untuk mengatur ulang password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid gap-6'>
                <div className='grid gap-6'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem className='grid gap-3'>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <FormControl>
                          <Input
                            id='email'
                            type='email'
                            placeholder='fojb-dev@example.com'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <LoadingButton pending={form.formState.isSubmitting}>
                    Submit
                  </LoadingButton>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
