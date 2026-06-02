'use client';

import { Pie, PieChart, ResponsiveContainer, Tooltip, Label, Cell } from 'recharts';

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
    <article className="rounded-xl border bg-background p-5 aspect-[1.67]">
      <header>
        <h2 className="text-lg font-semibold">부서별 인원 현황</h2>
        <p className="mt-1 text-sm text-muted-foreground">부서별 인원 구성 비율을 확인합니다.</p>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="h-65 w-full md:h-80 xl:h-105">
          <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 1, height: 1 }}>
            <PieChart>
              <Pie data={departmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="58%" outerRadius="78%" paddingAngle={3}>
                {departmentData.map(item => (
                  <Cell key={item.name} fill={item.fill} />
                ))}

                <Label
                  position="center"
                  content={() => (
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground">
                      <tspan x="50%" dy="-0.4em" className="text-xs">
                        총 직원
                      </tspan>
                      <tspan x="50%" dy="1.5em" className="text-2xl font-bold">
                        {total}명
                      </tspan>
                    </text>
                  )}
                />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="grid content-center [&>*:first-child]:border-t-2">
          {departmentData.map(item => {
            const percent = Math.round((item.value / total) * 100);

            return (
              <li key={item.name} className="border-b-2">
                <div className="flex min-w-0 items-center gap-3 mt-2">
                  <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="truncate font-medium">{item.name}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <p className="font-semibold">{item.value}명</p>
                  <p className="text-xs text-muted-foreground">{percent}%</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
