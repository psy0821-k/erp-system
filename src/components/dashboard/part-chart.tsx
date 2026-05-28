'use client';

import { Pie, PieChart, Tooltip, Label, LabelList } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

const departmentData = [
  { name: '프론트엔드팀', value: 28, fill: '#3b82f6' },
  { name: '백엔드팀', value: 36, fill: '#22c55e' },
  { name: '디자인팀', value: 20, fill: '#f59e0b' },
  { name: '기획팀', value: 18, fill: '#8b5cf6' },
  { name: '인사팀', value: 14, fill: '#ef4444' },
  { name: '기타', value: 12, fill: '#94a3b8' },
];

export default function DepartmentPieChart() {
  const total = departmentData.reduce((sum, item) => sum + item.value, 0);

  return (
    <article className="rounded-xl border bg-background p-5">
      <h2 className="text-lg font-semibold">부서별 인원 비율</h2>
      <PieChart
        style={{
          width: '100%',
          height: '300px',
          maxWidth: '500px',
          aspectRatio: 1,
          margin: 'auto',
        }}
        responsive
      >
        <Pie data={departmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="60%" outerRadius="80%" isAnimationActive={false}>
          <LabelList dataKey="name" position="outside" className="fill-foreground text-sm" />

          <Label
            position="center"
            content={() => (
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground">
                <tspan x="50%" dy="-1em" className="text-sm">
                  총 인원
                </tspan>
                <tspan x="50%" dy="1.6em" className="text-2xl font-bold">
                  {total}명
                </tspan>
              </text>
            )}
          />
        </Pie>

        <Tooltip />

        <RechartsDevtools />
      </PieChart>
    </article>
  );
}
