'use client';

import DashboardCard from '@/components/dashboard/dashboard-card';
import { useDashboardStats } from '../hooks/useDashboardStats';

export default function TodayAttendanceStatsGrid() {
  const { data, isLoading, isError } = useDashboardStats();

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">근태 요약을 불러오는 중입니다.</p>;
  }

  if (isError || !data) {
    return <p className="text-sm text-muted-foreground">근태 요약을 불러오지 못했습니다.</p>;
  }

  const { totalEmployee, attendanceStats } = data;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      <DashboardCard title={totalEmployee.title} value={totalEmployee.value} description={totalEmployee.description} icon={totalEmployee.icon} />

      {attendanceStats.map(stat => (
        <DashboardCard key={stat.title} title={stat.title} value={stat.value} description={stat.description} icon={stat.icon} />
      ))}
    </div>
  );
}
