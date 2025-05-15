import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { getSession } from '@/lib/data/session';
import { getUser } from '@/lib/data/user';
import { LucideMail, MoveRight } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export default async function VerifyEmailPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const user = await getUser(session.userId);
  if (!user) redirect('/login');

  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center'>
      <Card className='w-[350px] flex-col items-center justify-center py-10 md:w-[450px]'>
        <CardHeader className='w-full text-center'>
          <LucideMail className='mx-auto size-10' />
          <CardTitle className='text-lg'>Periksa email Anda</CardTitle>
          <CardDescription>
            Kami telah mengirimkan tautan verifikasi ke {user.email}. Silakan
            klik tautan di dalam email tersebut untuk memverifikasi akun Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href={user.role === 'anggota' ? '/fojb' : '/dashboard'}
            className={buttonVariants({
              variant: 'default',
            })}
          >
            <span>Ke halaman Dashboard</span>
            <MoveRight className='size-4' />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
