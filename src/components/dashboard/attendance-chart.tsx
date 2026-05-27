'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const todayAttendanceData = [
  {
    status: '정상',
    count: 18,
    fill: '#22c55e',
  },
  {
    status: '지각',
    count: 2,
    fill: '#facc15',
  },
  {
    status: '결근',
    count: 0,
    fill: '#ef4444',
  },
  {
    status: '휴가',
    count: 1,
    fill: '#0032ff',
  },
];

export default function AttendanceCharts() {
  return (
    <article className="rounded-xl border bg-background p-5">
      <div className="flex items-baseline gap-4">
        <h2 className="text-lg font-semibold">오늘 근태 현황</h2>
        <span>총 {'n'}명</span>
      </div>
      <div className="p-8 h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
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
