'use client';

import dynamic from 'next/dynamic';
import DashboardChartSkeleton from './DashboardChartSkeleton';

const DepartmentChartCard = dynamic(() => import('./ChartDepartment'), {
  ssr: false,
  loading: () => <DashboardChartSkeleton />,
});

export default function DashboardDepartmentChart() {
  return <DepartmentChartCard />;
}
