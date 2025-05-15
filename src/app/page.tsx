import { redirect } from 'next/navigation';
import LoginPage from './login/page';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { toast } from 'sonner';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect('/login');

  if (session.user.role === 'anggota') {
    redirect('/fojb');
  } else {
    redirect('/dashboard');
  }
}
