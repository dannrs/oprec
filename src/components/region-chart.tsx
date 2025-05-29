'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from '@/components/ui/chart';

const chartConfig = {
  wilayahI: {
    label: 'Wilayah I',
    color: 'hsl(var(--chart-1))',
  },
  wilayahII: {
    label: 'Wilayah II',
    color: 'hsl(var(--chart-2))',
  },
  wilayahIII: {
    label: 'Wilayah III',
    color: 'hsl(var(--chart-3))',
  },
  wilayahIV: {
    label: 'Wilayah IV',
    color: 'hsl(var(--chart-4))',
  },
  wilayahV: {
    label: 'Wilayah V',
    color: 'hsl(var(--chart-5))',
  },
  wilayahVI: {
    label: 'Wilayah VI',
    color: 'hsl(var(--chart-6))',
  },
  wilayahVII: {
    label: 'Wilayah VII',
    color: 'hsl(var(--chart-7))',
  },
  wilayahVIII: {
    label: 'Wilayah VIII',
    color: 'hsl(var(--chart-8))',
  },
  wilayahIX: {
    label: 'Wilayah IX',
    color: 'hsl(var(--chart-9))',
  },
  wilayahX: {
    label: 'Wilayah X',
    color: 'hsl(var(--chart-10))',
  },
  wilayahXI: {
    label: 'Wilayah XI',
    color: 'hsl(var(--chart-11))',
  },
  wilayahXII: {
    label: 'Wilayah XII',
    color: 'hsl(var(--chart-12))',
  },
  wilayahXIII: {
    label: 'Wilayah XIII',
    color: 'hsl(var(--chart-13))',
  },
};

export default function RegionChart({
  data,
}: {
  data: { name: string; total: number }[];
}) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' tickFormatter={(value) => value.slice(8)} />
        <YAxis allowDecimals={false} />
        <ChartTooltip />
        <ChartLegend />
        <Bar dataKey='total' />
      </BarChart>
    </ChartContainer>
  );
}
