'use client';

import { UserProfile } from '@/components/user-profile';
import { useSidebar } from '../ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { User } from '@/db/schema';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';

export function DashboardNavbar({ user }: { user: User | null }) {
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <header className='dark:bg-secondary flex items-center justify-between border-b bg-white px-6 py-4'>
      {isMobile && (
        <Button variant='outline' size='sm' onClick={toggleSidebar}>
          <Menu className='size-4' />
        </Button>
      )}
      <div>
        <h1 className='text-xl font-bold'>Halo, {user?.name}👋</h1>
        <p className='text-muted-foreground text-sm'>
          Selamat datang di Website Forum OSIS Jawa Barat.
        </p>
      </div>
      <div className='flex items-center gap-4'>
        {/* <Bell className='text-muted-foreground h-5 w-5' /> */}
        <UserProfile user={user} />
      </div>
    </header>
  );
}
