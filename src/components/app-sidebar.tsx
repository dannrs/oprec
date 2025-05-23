'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  IconDashboard,
  IconDatabase,
  IconUsers,
  IconFileDescription,
  IconReport,
  IconSettings,
} from '@tabler/icons-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { NavUser } from '@/components/nav-user';
import Image from 'next/image';

const user = {
  name: 'shadcn',
  email: 'm@example.com',
  avatar: '/avatars/shadcn.jpg',
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <a href='#'>
                <Image
                  src='/fojb-logo.png'
                  width={24}
                  height={24}
                  alt='FOJB Logo'
                />
                <span className='text-base font-semibold'>FOJB</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {/* Dashboard */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/dashboard'>
                <IconDashboard className='mr-2 size-4' />
                Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Semua Data */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/data'>
                <IconDatabase className='mr-2 size-4' />
                Semua Data
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Data Anggota */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/anggota'>
                <IconUsers className='mr-2 size-4' />
                Data Anggota
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Data Pengurus */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/data/pengurus'>
                <IconUsers className='mr-2 size-4' />
                Data Pengurus
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Data Pembayaran */}
          <SidebarMenuItem>
            <SidebarMenuButton>
              <IconFileDescription className='mr-2 size-4' />
              Data Pembayaran
            </SidebarMenuButton>
            <SidebarMenu className='ml-4'>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/pembayaran/paid'>Paid</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/pembayaran/unpaid'>Unpaid</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarMenuItem>

          {/* Tracking KTA */}
          <SidebarMenuItem>
            <SidebarMenuButton>
              <IconReport className='mr-2 size-4' />
              Tracking KTA
            </SidebarMenuButton>
            <SidebarMenu className='ml-4'>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/kta/pengurus'>Pengurus</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/kta/anggota'>Anggota</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarMenuItem>

          {/* Setting User */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/settings/user'>
                <IconSettings className='mr-2 size-4' />
                Setting User
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
