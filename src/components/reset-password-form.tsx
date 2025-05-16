'use client';

import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorContext } from '@better-fetch/fetch';
import { authClient } from '@/lib/auth-client';
import {
  type ForgotPassword,
  forgotPasswordSchema,
  ResetPassword,
  resetPasswordSchema,
} from '@/lib/validations';

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
import { CircleX, MoveRight } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { validateResetPasswordToken } from '@/lib/actions';
import { useEffect, useState } from 'react';

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const [isTokenValid, setIsTokenValid] = useState(false);

  const token = searchParams.get('token') || '';
  const error = searchParams.get('error') || '';

  // useEffect(() => {
  //   const validateToken = async () => {
  //     const { valid } = await validateResetPasswordToken(
  //       token,
  //       '/reset-password'
  //     );
  //     setIsTokenValid(valid);
  //   };
  //   validateToken();
  // });

  const form = useForm<ResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: ResetPassword) => {
    await authClient.resetPassword(
      {
        newPassword: values.password,
        token,
      },
      {
        onSuccess: () => {
          toast.success('Sukses', {
            description:
              'Reset password berhasil. Silakan login untuk melanjutkan',
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

  if (error === 'INVALID_TOKEN') {
    return (
      <Card className='w-[350px] flex-col items-center justify-center py-10 md:w-[450px]'>
        <CardHeader className='w-full text-center'>
          <CircleX className='mx-auto size-10' />
          <CardTitle className='text-lg'>
            Tautan {error === 'INVALID_TOKEN' ? 'tidak valid' : 'kedaluwarsa'}
          </CardTitle>
          <CardDescription>
            Tautan reset password ini{' '}
            {error === 'INVALID_TOKEN' ? 'tidak valid' : 'sudah kedaluwarsa'}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href='/login'
            className={buttonVariants({
              variant: 'default',
            })}
          >
            <span>Kembali ke Login</span>
            <MoveRight className='size-4' />
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Reset Password</CardTitle>
          <CardDescription>Silakan masukkan password baru Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid gap-6'>
                <div className='grid gap-6'>
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem className='grid gap-3'>
                        <FormLabel htmlFor='password'>Password Baru</FormLabel>
                        <FormControl>
                          <Input
                            id='password'
                            type='password'
                            placeholder='Password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <FormItem className='grid gap-3'>
                        <FormLabel htmlFor='confirmPassword'>
                          Ulangi Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            id='confirmPassword'
                            type='password'
                            placeholder='Ulangi Password'
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
