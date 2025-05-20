import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getUser } from '@/lib/data/user';
import { LogOut, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

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
        {/* <Bell className='text-muted-foreground h-5 w-5' /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='cursor-pointer'>
              <Avatar>
                <AvatarFallback>
                  {user?.name
                    ?.split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <div className='text-muted-foreground px-3 py-2 text-sm font-medium'>
              {user?.name}
            </div>
            <DropdownMenuItem className='cursor-pointer'>
              <Settings className='mr-2 h-4 w-4' />
              Setting
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer text-red-500'>
              <LogOut className='mr-2 h-4 w-4' />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
