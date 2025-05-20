'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartLegend, ChartTooltip } from '../ui/chart';

const chartConfig = {
  male: {
    label: 'Laki-laki',
    color: 'hsl(var(--chart-1))',
  },
  female: {
    label: 'Perempuan',
    color: 'hsl(var(--chart-2))',
  },
};

export default function SchoolChart({
  data,
}: {
  data: { name: string; total: number }[];
}) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis allowDecimals={false} />
        <ChartTooltip />
        <ChartLegend />
        <Bar dataKey='total' />
      </BarChart>
    </ChartContainer>
  );
}
