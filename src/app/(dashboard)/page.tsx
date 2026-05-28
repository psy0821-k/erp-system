import { Package, ShoppingCart, Truck, Users } from 'lucide-react';

import DashboardCard from '@/components/dashboard/dashboard-card';
import { Fragment } from 'react/jsx-runtime';
import SalesChart from '@/components/dashboard/sales-chart';
import AttendanceChart from '@/components/dashboard/attendance-chart';
import PartChart from '@/components/dashboard/part-chart';
import ProjectChart from '@/components/dashboard/project-chart';
import RecentLog from '@/components/dashboard/recent-log';
import ApprovalBoard from '@/components/dashboard/approval-board';
// import NoticeBoard from '@/components/dashboard/notice-board';
import TodaySchedule from '@/components/dashboard/todaySchedule';
import AssetBoard from '@/components/dashboard/asset-board';
import QuickMoveBoard from '@/components/dashboard/quickMove';

const stats = [
  {
    title: '총 직원 수',
    value: '124',
    description: '총 직원수',
    icon: ShoppingCart,
  },
  {
    title: '총 프로젝트',
    value: '200',
    description: '현재까지 진행한 프로젝트',
    icon: Truck,
  },
  {
    title: '승인대기',
    value: '3',
    description: '현재 승인 대기 중',
    icon: Package,
  },
  {
    title: '긴급 요청',
    value: '36',
    description: '활성 직원 수',
    icon: Users,
  },
];

export default function DashboardPage() {
  return (
    <Fragment>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(stat => (
          <DashboardCard key={stat.title} title={stat.title} value={stat.value} description={stat.description} icon={stat.icon} />
        ))}
      </section>
      <section className="grid xl:grid-cols-3 sm:grid-cols-1 mt-8 gap-4">
        <h2 className="sr-only">대시보드 요약 정보</h2>
        <SalesChart />
        <AttendanceChart />
        <PartChart />
        <ProjectChart />
        <RecentLog />
        <ApprovalBoard />
        {/* <NoticeBoard /> */}
        <TodaySchedule />
        <AssetBoard />
        <QuickMoveBoard />
      </section>
    </Fragment>
  );
}
