'use client';

import { Pie, PieChart, Sector, Tooltip, Label, LabelList, ResponsiveContainer } from 'recharts';

import type { PieSectorDataItem, PieSectorShapeProps, LabelProps } from 'recharts';

const data = [
  {
    name: '프론트엔드',
    value: 12,
  },
  {
    name: '백엔드',
    value: 8,
  },
  {
    name: '인사팀',
    value: 5,
  },
  {
    name: '물류팀',
    value: 10,
  },
];

const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444'];

const CustomPieSector = (
  props: PieSectorShapeProps & {
    payload?: PieSectorDataItem;
  }
) => {
  return <Sector {...props} fill={colors[(props.index ?? 0) % colors.length]} />;
};

const CustomLabel = (props: LabelProps) => {
  return <Label {...props} fill={colors[(props.index ?? 0) % colors.length]} position="outside" offset={12} fontSize={12} />;
};

export default function PartChart({ isAnimationActive = true }: { isAnimationActive?: boolean }) {
  return (
    <article className="rounded-xl border bg-background p-5">
      <div>
        <h2 className="text-lg font-semibold">직군별 인원 비율</h2>

        <p className="mt-1 text-sm text-muted-foreground">현재 부서별 인원 구성 현황입니다.</p>
      </div>

      <div className="mt-6 h-80 w-full" role="img">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} isAnimationActive={isAnimationActive} shape={CustomPieSector}>
              <LabelList content={CustomLabel} />
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-3">
        {data.map((item, index) => (
          <li key={item.name} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: colors[index % colors.length],
              }}
            />

            <span className="text-sm">{item.name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
