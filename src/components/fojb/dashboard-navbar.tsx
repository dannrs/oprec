import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from '@/db/schema';
import { getUser } from '@/lib/data/user';
import { Bell } from 'lucide-react';

export async function DashboardNavbar({ userId }: { userId: string }) {
  const user = await getUser(userId);

  return (
    <header className='flex items-center justify-between bg-white px-6 py-4 shadow-sm'>
      <div>
        <h1 className='text-xl font-bold'>Halo, {user?.name}👋</h1>
        <p className='text-muted-foreground text-sm'>
          Selamat datang di Website Forum OSIS Jawa Barat.
        </p>
      </div>
      <div className='flex items-center gap-4'>
        <Bell className='text-muted-foreground h-5 w-5' />
        <Avatar>
          <AvatarFallback>DF</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
