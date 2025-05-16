'use client';

import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CircleX, MailCheck, MoveRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function EmailVerifiedPage() {
  const searchParams = useSearchParams();

  const error = searchParams.get('error')?.toLowerCase() ?? '';

  if (error === 'invalid_token' || error === 'token_expired') {
    return (
      <div className='bg-muted flex min-h-svh flex-col items-center justify-center'>
        <Card className='w-[350px] flex-col items-center justify-center py-10 md:w-[450px]'>
          <CardHeader className='w-full text-center'>
            <CircleX className='mx-auto size-10' />
            <CardTitle className='text-lg'>
              Tautan {error === 'invalid_token' ? 'tidak valid' : 'kedaluwarsa'}
            </CardTitle>
            <CardDescription>
              Tautan verifikasi email ini{' '}
              {error === 'invalid_token' ? 'tidak valid' : 'sudah kedaluwarsa'}.
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
      </div>
    );
  }

  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center'>
      <Card className='flex w-[350px] flex-col items-center justify-center py-10 md:w-[450px]'>
        <CardHeader className='w-full text-center'>
          <MailCheck className='mx-auto size-10' />
          <CardTitle className='text-lg'>Email terverifikasi!</CardTitle>
          <CardDescription>
            Alamat email Anda berhasil terverifikasi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href='/dashboard'
            className={buttonVariants({
              variant: 'default',
            })}
          >
            <span>Dashboard</span>
            <MoveRight className='size-4' />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
