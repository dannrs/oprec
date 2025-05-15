import { DashboardContent } from '@/components/fojb/dashboard-content';
import { DashboardNavbar } from '@/components/fojb/dashboard-navbar';
import { DashboardSidebar } from '@/components/fojb/dashboard-sidebar';
import { getSession } from '@/lib/data/session';

export default async function FOJBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await getSession();
  return (
    <div className='bg-muted flex h-screen'>
      <DashboardSidebar />
      <div className='flex flex-1 flex-col'>
        <DashboardNavbar userId={userId} />
        <main className='flex-1 overflow-y-auto p-6'>{children}</main>
      </div>
    </div>
  );
}
