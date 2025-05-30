'use client';

import {
  Home,
  FileText,
  Image as ImageIcon,
  Settings,
  User,
  Key,
  ChevronRight,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { SiteLogo } from '../site-logo';
import { SidebarSubLink } from '../sidebarsub-link';
import { SidebarLink } from '../sidebar-link';

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu className='p-2'>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild className='!bg-transparent'>
              <SiteLogo position='left' size='sm' href='/fojb' />
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

          <Collapsible className='group/collapsible'>
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className='group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground py-2'
              >
                <CollapsibleTrigger>
                  <div className='flex items-center gap-3 rounded-md px-3 text-sm transition-colors'>
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
                      <SidebarSubLink
                        icon={<User className='size-4' />}
                        label='Profil'
                        href='/fojb/profile'
                      />
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarSubLink
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

      {/* <SidebarFooter className='mt-6 border-t pt-6 text-left text-xs text-gray-500'>
        {`© ${new Date().getFullYear()} Forum OSIS Jawa Barat. All rights reserved.`}
      </SidebarFooter> */}
    </Sidebar>
  );
}
