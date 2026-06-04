'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const todayAttendanceData = [
  { status: '정상', count: 18, fill: '#22c55e' },
  { status: '지각', count: 2, fill: '#facc15' },
  { status: '결근', count: 0, fill: '#ef4444' },
  { status: '휴가', count: 1, fill: '#0032ff' },
];

export default function AttendanceCharts() {
  const totalCount = todayAttendanceData.reduce((sum, item) => sum + item.count, 0);

  return (
    <article className="rounded-xl border bg-background p-5">
      <header className="mb-6 flex items-baseline gap-4">
        <h2 className="text-lg font-semibold">오늘 근태 현황</h2>
        <span className="text-sm text-muted-foreground">총 {totalCount}명</span>
      </header>

      <div className="h-65 w-full md:h-80 xl:h-105">
        <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 1, height: 1 }}>
          <BarChart data={todayAttendanceData}>
            <XAxis dataKey="status" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
