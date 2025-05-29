import { AppSidebar } from '@/components/app-sidebar';
import { SectionCards } from '@/components/section-cards';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Views } from '@/components/views';
import GenderChart from '@/components/gender-chart';
import {
  getUsersGenderStats,
  getUsersRegionStats,
  getUsersSchoolStats,
} from '@/lib/data/user';
import SchoolChart from '@/components/gender-chart';
import RegionChart from '@/components/region-chart';

export default async function Page() {
  const totalGender = await getUsersGenderStats();
  const totalSchool = await getUsersSchoolStats();
  const totalRegion = await getUsersRegionStats();

  const genderData = [
    {
      name: 'Laki-laki',
      total: totalGender?.male ?? 0,
    },
    {
      name: 'Perempuan',
      total: totalGender?.female ?? 0,
    },
  ];

  const schoolData = [
    {
      name: 'SMA',
      total: totalSchool?.sma ?? 0,
    },
    {
      name: 'SMK',
      total: totalSchool?.smk ?? 0,
    },
    {
      name: 'MA',
      total: totalSchool?.ma ?? 0,
    },
  ];

  const regionData = [
    {
      name: 'Wilayah I',
      total: totalRegion?.wilayahI ?? 0,
    },
    {
      name: 'Wilayah II',
      total: totalRegion?.wilayahII ?? 0,
    },
    {
      name: 'Wilayah III',
      total: totalRegion?.wilayahIII ?? 0,
    },
    {
      name: 'Wilayah IV',
      total: totalRegion?.wilayahIV ?? 0,
    },
    {
      name: 'Wilayah V',
      total: totalRegion?.wilayahV ?? 0,
    },
    {
      name: 'Wilayah VI',
      total: totalRegion?.wilayahVI ?? 0,
    },
    {
      name: 'Wilayah VII',
      total: totalRegion?.wilayahVII ?? 0,
    },
    {
      name: 'Wilayah VIII',
      total: totalRegion?.wilayahVIII ?? 0,
    },
    {
      name: 'Wilayah IX',
      total: totalRegion?.wilayahIX ?? 0,
    },
    {
      name: 'Wilayah X',
      total: totalRegion?.wilayahX ?? 0,
    },
    {
      name: 'Wilayah XI',
      total: totalRegion?.wilayahXI ?? 0,
    },
    {
      name: 'Wilayah XII',
      total: totalRegion?.wilayahXII ?? 0,
    },
    {
      name: 'Wilayah XIII',
      total: totalRegion?.wilayahXIII ?? 0,
    },
  ];

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant='inset' />
      <SidebarInset>
        <SiteHeader />
        <div className='flex flex-1 flex-col'>
          <div className='@container/main flex flex-1 flex-col gap-2'>
            <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
              <SectionCards />
              <div className='px-4 lg:px-6'>
                <Views />
                <div className='grid grid-cols-2'>
                  <GenderChart data={genderData} />
                  <SchoolChart data={schoolData} />
                </div>
                <RegionChart data={regionData} />
                {/* <ChartAreaInteractive /> */}
              </div>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
