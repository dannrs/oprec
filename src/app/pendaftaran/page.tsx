import { RegistrationForm } from '@/components/registration-form';
import { User } from '@/db/schema';
import {
  getRegionNameList,
  getSchoolNameList,
  getUser,
  getUserProfile,
} from '@/lib/actions';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function PendaftaranPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(session?.user);
  if (!session) return <div>no session</div>;
  const user = session.user as User;

  const [profile] = await getUserProfile(session.user.id);
  const { data: sekolah } = await getSchoolNameList();
  const { data: region } = await getRegionNameList();
  // if (!data) return;

  return (
    <div className='bg-muted flex min-h-svh items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-4xl'>
        <RegistrationForm
          user={user}
          profile={profile}
          sekolah={sekolah}
          region={region}
        />
      </div>
    </div>
  );
}
