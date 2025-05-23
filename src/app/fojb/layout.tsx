import { DashboardNavbar } from '@/components/fojb/dashboard-navbar';
import { DashboardSidebar } from '@/components/fojb/dashboard-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getSession } from '@/lib/data/session';
import { getUser } from '@/lib/data/user';

export default async function FOJBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await getSession();
  const user = await getUser(userId);

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <DashboardSidebar variant='inset' />
      <SidebarInset>
        <DashboardNavbar user={user} />
        <main className='bg-muted flex-1 overflow-y-auto p-6'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
