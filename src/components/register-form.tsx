'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorContext } from '@better-fetch/fetch';
import { authClient } from '@/lib/auth-client';
import { signUpSchema } from '@/lib/validations';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import LoadingButton from '@/components/loading-button';
import { Eye, EyeClosed } from 'lucide-react';

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      nomorWhatsapp: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    await authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        nomorWhatsapp: values.nomorWhatsapp,
        password: values.password,
      },
      {
        onSuccess: () => {
          toast.success('Pendaftaran berhasil');
          router.push('/verify-email');
        },
        onError: (ctx: ErrorContext) => {
          toast.error('Terjadi kesalahan', {
            description: ctx.error.message,
          });
        },
      }
    );
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Buat akun baru</CardTitle>
          <CardDescription>
            Silahkan register dengan menggunakan email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid gap-6'>
                <div className='grid gap-6'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem className='grid gap-3'>
                        <FormLabel htmlFor='name'>Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input
                            id='name'
                            type='text'
                            placeholder='Jhon Doe'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                            placeholder='m@example.com'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='nomorWhatsapp'
                    render={({ field }) => (
                      <FormItem className='grid gap-3'>
                        <FormLabel htmlFor='nomor-whatsapp'>
                          Nomor Whatsapp
                        </FormLabel>
                        <FormControl>
                          <Input
                            id='nomor-whatsapp'
                            placeholder='628xxx'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem className='grid gap-3'>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Input
                              id='password'
                              type={showPassword ? 'text' : 'password'}
                              placeholder='Password'
                              {...field}
                            />
                            {showPassword ? (
                              <Eye
                                className='absolute top-1/2 right-2 size-4 -translate-y-1/2 cursor-pointer'
                                onClick={() => setShowPassword(!showPassword)}
                              />
                            ) : (
                              <EyeClosed
                                className='absolute top-1/2 right-2 size-4 -translate-y-1/2 cursor-pointer'
                                onClick={() => setShowPassword(!showPassword)}
                              />
                            )}
                          </div>
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
                          Konfirmasi Password
                        </FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Input
                              id='confirmPassword'
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder='Konfirmasi Password'
                              {...field}
                            />
                            {showConfirmPassword ? (
                              <Eye
                                className='absolute top-1/2 right-2 size-4 -translate-y-1/2 cursor-pointer'
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              />
                            ) : (
                              <EyeClosed
                                className='absolute top-1/2 right-2 size-4 -translate-y-1/2 cursor-pointer'
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <LoadingButton pending={form.formState.isSubmitting}>
                    Register
                  </LoadingButton>
                </div>
                <div className='text-center text-sm'>
                  Sudah punya akun?{' '}
                  <a href='/login' className='underline underline-offset-4'>
                    Login
                  </a>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By creating an account, you agree to our{' '}
        <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
