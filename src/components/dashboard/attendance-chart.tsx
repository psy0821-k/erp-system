'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const weeklyAttendanceData = [
  { day: '월', normal: 18, late: 2, absence: 1 },
  { day: '화', normal: 20, late: 1, absence: 0 },
  { day: '수', normal: 17, late: 3, absence: 1 },
  { day: '목', normal: 19, late: 1, absence: 2 },
  { day: '금', normal: 16, late: 4, absence: 1 },
];

export default function AttendanceCharts() {
  return (
    <article className="rounded-xl border bg-background p-5">
      <h2 className="text-lg font-semibold">주간 근태 현황</h2>
      <p className="mt-1 text-sm text-muted-foreground">최근 5일 기준 정상, 지각, 결근 인원입니다.</p>

      <div className="mt-6 h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyAttendanceData}>
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <Tooltip />
            <Legend />

            <Bar dataKey="normal" name="정상" fill="#22c55e" radius={[6, 6, 0, 0]} />
            <Bar dataKey="late" name="지각" fill="#facc15" radius={[6, 6, 0, 0]} />
            <Bar dataKey="absence" name="결근" fill="#ef4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
