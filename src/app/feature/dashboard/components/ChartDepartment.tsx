'use client';

import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { useDepartment } from '../hooks/useDepartment';
import { DEPARTMENT_LABEL } from '@/config/types/department';

const COLORS = ['#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#7c3aed', '#0891b2'];

export default function DepartmentChartCard() {
  const { data = [], isLoading } = useDepartment();

  const total = data.reduce((sum, item) => sum + item.count, 0);

  const chartData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
    percent: total > 0 ? Math.round((item.count / total) * 100) : 0,
  }));

  return (
    <Card className="h-full">
      <CardHeader className="space-y-1">
        <CardTitle>부서별 직원 비율</CardTitle>
        <p className="text-sm text-muted-foreground">전체 직원 {total}명 기준</p>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-65 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-65 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
            등록된 부서 데이터가 없습니다.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-[1fr_220px]">
            <div className="relative h-65">
              <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} dataKey="count" nameKey="department" cx="50%" cy="50%" innerRadius={58} outerRadius={88} paddingAngle={3} />

                  <Tooltip formatter={(value, name) => [`${value}명`, name]} labelFormatter={() => '부서'} />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">총 직원</p>
                  <p className="text-xl font-bold">{total}명</p>
                </div>
              </div>
            </div>

            <ul className="space-y-3">
              {chartData.map(item => (
                <li key={item.department} className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="truncate text-sm font-medium">{DEPARTMENT_LABEL[item.department]}</span>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold">{item.count}명</p>
                    <p className="text-xs text-muted-foreground">{item.percent}%</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
