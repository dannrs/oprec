import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getRegionList } from '@/lib/data/region';
import { getSchoolNameList } from '@/lib/data/school';
import { getUser, getUserProfile } from '@/lib/data/user';

import { InformasiDataForm } from '@/components/fojb/information-data-form';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect('/login');

  const user = await getUser(session.user.id);
  const profile = await getUserProfile(session.user.id);
  const { sekolah } = await getSchoolNameList();
  const { region } = await getRegionList();

  return (
    <InformasiDataForm
      user={user}
      profile={profile}
      sekolah={sekolah}
      region={region}
    />
  );
}
