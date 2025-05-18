'use client';

import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorContext } from '@better-fetch/fetch';
import { authClient } from '@/lib/auth-client';
import { signInSchema } from '@/lib/validations';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
import { Checkbox } from './ui/checkbox';
import LoadingButton from './loading-button';
import Link from 'next/link';
import { Eye, EyeClosed } from 'lucide-react';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    console.log(values);
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      },
      {
        onSuccess: () => {
          router.push('/');
          router.refresh();
        },
        onError: (ctx: ErrorContext) => {
          console.log(ctx);
          toast.error('Something went wrong', {
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
          <CardTitle className='text-xl'>Selamat Datang</CardTitle>
          <CardDescription>
            Silakan login menggunakan email Anda
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
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem className='grid gap-3'>
                        <div className='flex items-center'>
                          <FormLabel htmlFor='password'>Password</FormLabel>
                          <Link
                            href='/forgot-password'
                            className='ml-auto text-sm underline-offset-4 hover:underline'
                          >
                            Lupa password?
                          </Link>
                        </div>
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
                    name='rememberMe'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='flex gap-2'>
                            <Checkbox
                              id='rememberMe'
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <FormLabel htmlFor='rememberMe'>
                              Ingat saya
                            </FormLabel>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <LoadingButton pending={form.formState.isSubmitting}>
                    Login
                  </LoadingButton>
                </div>
                <div className='text-center text-sm'>
                  Tidak memiliki akun?{' '}
                  <a href='/register' className='underline underline-offset-4'>
                    Daftar
                  </a>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
