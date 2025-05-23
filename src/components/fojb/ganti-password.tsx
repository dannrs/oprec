'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { ChangePassword, changePasswordSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ErrorContext } from '@better-fetch/fetch';
import LoadingButton from '../loading-button';
import { InputPassword } from '../input-password';

export function GantiPasswordForm() {
  const router = useRouter();

  const form = useForm<ChangePassword>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: ChangePassword) => {
    await authClient.changePassword(
      {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        revokeOtherSessions: true,
      },
      {
        onSuccess: () => {
          toast.success('Sukses', {
            description: 'Password Anda berhasil diubah.',
          });
          router.push('/login');
        },
        onError: (ctx: ErrorContext) => {
          console.log(ctx);
          if (ctx.error.status === 400) {
            toast.error('Password saat ini salah', {
              description: ctx.error.message,
            });
          } else {
            toast.error('Terjadi kesalahan', {
              description: ctx.error.message,
            });
          }
        },
      }
    );
  };

  return (
    <Card className='space-y-4 pb-8'>
      <CardHeader className='text-center'>
        <CardTitle className='text-xl'>Ganti Password</CardTitle>
        <CardDescription>
          Masukkan password lama Anda untuk mengganti password
        </CardDescription>
      </CardHeader>
      <CardContent className='px-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-6'>
              <div className='grid gap-6'>
                <FormField
                  control={form.control}
                  name='currentPassword'
                  render={({ field }) => (
                    <FormItem className='grid gap-3'>
                      <FormLabel htmlFor='current-password'>
                        Password Saat Ini
                      </FormLabel>
                      <FormControl>
                        <InputPassword
                          id='current-password'
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
                  name='newPassword'
                  render={({ field }) => (
                    <FormItem className='grid gap-3'>
                      <FormLabel htmlFor='new-password'>
                        Password Baru
                      </FormLabel>
                      <FormControl>
                        <InputPassword
                          id='new-password'
                          placeholder='Password Baru'
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
                      <FormLabel htmlFor='confirm-password'>
                        Ulangi Password Baru
                      </FormLabel>
                      <FormControl>
                        <InputPassword
                          id='confirm-password'
                          placeholder='Ulangi Password Baru'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <LoadingButton pending={form.formState.isSubmitting}>
                  Simpan Perubahan
                </LoadingButton>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
