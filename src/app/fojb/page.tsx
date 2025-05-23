import { DashboardContent } from '@/components/fojb/dashboard-content';
import { getSession } from '@/lib/data/session';
import { getUser, getUserProfile } from '@/lib/data/user';

export default async function Page() {
  const { userId } = await getSession();
  const user = await getUser(userId);
  const profile = await getUserProfile(userId);

  return <DashboardContent user={user} profile={profile} />;
}
