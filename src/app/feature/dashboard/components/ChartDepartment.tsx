'use client';

import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useDepartment } from '../hooks/useDepartment';
import { DEPARTMENT_LABEL, DepartmentType } from '@/config/types/department';
import { Shapes } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#6366f1', '#ec4899', '#f59e0b', '#8b5cf6', '#f97316', '#06b6d4'];

export default function DepartmentChartCard() {
  const { data = [], isLoading } = useDepartment();

  const total = data.reduce((sum, item) => sum + item.count, 0);

  const chartData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
    percent: total > 0 ? Math.round((item.count / total) * 100) : 0,
  }));

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold tracking-tight">부서별 직원 비율</CardTitle>
        <p className="text-sm text-muted-foreground">전체 직원 {total}명 기준</p>
      </CardHeader>

      <CardContent className="flex-1 pb-6">
        {isLoading ? (
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <Skeleton className="mx-auto h-55 w-55 rounded-full sm:h-60 sm:w-60" />
            <div className="flex-1 space-y-3">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-10 w-full rounded-lg" />
              ))}
            </div>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-65 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
            등록된 부서 데이터가 없습니다.
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-stretch lg:gap-2">
            <div className="relative h-50 w-50 shrink-0 sm:h-60 sm:w-60">
              <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 1, height: 1 }}>
                <PieChart>
                  <Pie data={chartData} dataKey="count" nameKey="department" cx="50%" cy="50%" innerRadius={65} outerRadius={95} paddingAngle={3}>
                    {chartData.map((entry, index) => (
                      <Shapes key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--background, #fff)',
                      borderColor: 'var(--border, #e2e8f0)',
                      borderRadius: '8px',
                    }}
                    itemStyle={{ color: 'var(--foreground, #0f172a)' }}
                    formatter={(value, name) => [`${value}명`, DEPARTMENT_LABEL[name as DepartmentType] || name]}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">총 직원</span>
                <span className="text-xl font-bold tracking-tight text-foreground">{total}명</span>
              </div>
            </div>

            <ul className="flex w-full flex-col justify-center gap-2 sm:max-h-60 sm:overflow-y-auto sm:pr-2" aria-label="부서별 직원 상세 비율">
              {chartData.map(item => (
                <li key={item.department} className="flex items-center justify-between gap-4 rounded-lg p-1.5 transition-colors hover:bg-muted/50 ">
                  <div className="grid grid-cols-[16px_1fr_auto] items-center gap-x-2 w-full">
                    <span
                      className="h-3 w-3 shrink-0 rounded-full border border-black/5 dark:border-white/10"
                      style={{ backgroundColor: item.fill }}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-foreground whitespace-nowrap">
                      {DEPARTMENT_LABEL[item.department] || item.department}
                    </span>
                  </div>

                  <div className="flex items-center gap-x-2 text-right shrink-0 ml-auto">
                    <span className="text-sm font-semibold text-foreground">{item.count}명</span>
                    <span className="text-xs font-medium text-muted-foreground min-w-8">{item.percent}%</span>
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
