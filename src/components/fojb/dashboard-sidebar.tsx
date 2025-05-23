'use client';

import { usePathname } from 'next/navigation';
import {
  Home,
  FileText,
  Image as ImageIcon,
  Settings,
  User,
  Key,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '../ui/sidebar';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { SiteLogo } from '../site-logo';

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu className='p-2'>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              asChild
              className='hover:bg-transparent'
            >
              <SiteLogo position='left' size='sm' />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className='px-4'>
          <SidebarMenuItem>
            <SidebarLink
              icon={<Home className='size-4' />}
              label='Home'
              href='/fojb'
            />
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarLink
              icon={<FileText className='size-4' />}
              label='Informasi Data'
              href='/fojb/informasi-data'
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarLink
              icon={<ImageIcon className='size-4' />}
              label='Twibbon'
              href='/fojb/twibbon'
            />
          </SidebarMenuItem>

          <Collapsible
            defaultOpen={collapsibleOpen}
            onOpenChange={setCollapsibleOpen}
            className='group/collapsible'
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className='group/label py-2 text-gray-700 hover:bg-green-50 hover:text-green-700'
              >
                <CollapsibleTrigger>
                  <div
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 text-sm transition-colors'
                    )}
                  >
                    <Settings className='inline size-4' />
                    <span>Pengaturan</span>
                  </div>
                  <ChevronRight className='mr-1 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarLink
                        icon={<User className='size-4' />}
                        label='Profil'
                        href='/fojb/profile'
                      />
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarLink
                        icon={<Key className='size-4' />}
                        label='Ganti Password'
                        href='/fojb/ganti-password'
                      />
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className='mt-6 border-t pt-6 text-left text-xs text-gray-500'>
        <p className='leading-snug'>
          Copyright ©2025
          <br />
          Forum OSIS Jawa Barat
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}

function SidebarLink({
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
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
        isActive
          ? 'bg-green-100 font-semibold text-green-700'
          : 'text-gray-700 hover:bg-green-50 hover:text-green-700',
        className
      )}
    >
      {icon}
      {label}
    </Link>
  );
}
