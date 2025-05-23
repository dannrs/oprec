'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartLegend, ChartTooltip } from '../ui/chart';

const chartConfig = {
  sma: {
    label: 'SMA',
    color: 'hsl(var(--chart-1))',
  },
  smk: {
    label: 'SMK',
    color: 'hsl(var(--chart-2))',
  },
  ma: {
    label: 'MA',
    color: 'hsl(var(--chart-3))',
  },
};

export default function GenderChart({
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
