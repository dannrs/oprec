import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface SiteLogoProps {
  href?: string;
  className?: string;
  position?: 'left' | 'right' | 'center';
  size?: 'sm' | 'base';
}

export function SiteLogo({
  href = '/',
  className,
  position = 'center',
  size = 'base',
}: SiteLogoProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center',
        position === 'left'
          ? 'justify-start'
          : position === 'right'
            ? 'justify-end'
            : 'justify-center',
        className
      )}
    >
      <Link href={href} className='flex items-center justify-center gap-2'>
        <Image
          src='/fojb-logo.png'
          alt='FOJB Logo'
          width={size === 'sm' ? 32 : 38}
          height={size === 'sm' ? 32 : 38}
          className='mr-0.5 rounded-sm'
        />
        <div className='grid flex-1 text-sm leading-tight'>
          <span className='truncate font-medium'>FOJB</span>
          <span className='truncate text-xs text-gray-500'>
            Forum OSIS Jawa Barat
          </span>
        </div>
      </Link>
    </div>
  );
}
