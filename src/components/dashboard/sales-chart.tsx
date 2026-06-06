'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: '1월', current: 4000, previous: 2400 },
  { month: '2월', current: 3000, previous: 1398 },
  { month: '3월', current: 2000, previous: 9800 },
  { month: '4월', current: 2780, previous: 3908 },
  { month: '5월', current: 1890, previous: 4800 },
  { month: '6월', current: 2390, previous: 3800 },
  { month: '7월', current: 3490, previous: 4300 },
  { month: '8월', current: 4200, previous: 3900 },
  { month: '9월', current: 3700, previous: 4100 },
  { month: '10월', current: 4800, previous: 4500 },
  { month: '11월', current: 5200, previous: 4900 },
  { month: '12월', current: 6100, previous: 5300 },
];

export default function PerformanceChart() {
  return (
    <article className="rounded-xl border bg-background p-5">
      <header className="mb-6">
        <h2 className="text-lg font-semibold">전년도 대비 실적</h2>
        <p className="text-sm text-muted-foreground">월별 실적 비교 현황</p>
      </header>

      <div className="h-65 w-full md:h-80 xl:h-105">
        <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 1, height: 1 }}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis width={50} />

            <Tooltip />

            <Area type="monotone" dataKey="current" name="올해" stroke="var(--chart-blue)" fill="var(--chart-blue)" fillOpacity={0.2} />

            <Area type="monotone" dataKey="previous" name="작년" stroke="var(--chart-green)" fill="var(--chart-green)" fillOpacity={0.15} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
