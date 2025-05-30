import { usePathname } from 'next/navigation';
import { SidebarMenuSubButton } from './ui/sidebar';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function SidebarSubLink({
  icon,
  label,
  href,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <SidebarMenuSubButton asChild isActive={isActive} className='h-9'>
      <Link
        href={href}
        className={cn(
          'flex items-center gap-3 px-3 text-sm transition-colors',
          className
        )}
      >
        {icon}
        {label}
      </Link>
    </SidebarMenuSubButton>
  );
}
