import { Package, ShoppingCart, Truck, Users } from 'lucide-react';

import DashboardCard from '@/components/dashboard/dashboard-card';
import { Fragment } from 'react/jsx-runtime';
import SalesChart from '@/components/dashboard/sales-chart';
import AttendanceChart from '@/components/dashboard/attendance-chart';
import PartChart from '@/components/dashboard/part-chart';

const stats = [
  {
    title: '총 주문',
    value: '1,248',
    description: '이번 달 주문 수',
    icon: ShoppingCart,
  },
  {
    title: '출고 완료',
    value: '892',
    description: '정상 출고 처리',
    icon: Truck,
  },
  {
    title: '재고 부족',
    value: '24',
    description: '확인 필요 품목',
    icon: Package,
  },
  {
    title: '등록 직원',
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
      <section className="grid xl:grid-cols-2 sm:grid-cols-1">
        <h2 className="sr-only">대시보드 요약 정보</h2>
        <article>
          <h3>전년도 대비 실적</h3>
          <SalesChart />
        </article>
        <article>
          <h3>직원 근태 현황</h3>
          <AttendanceChart />
        </article>
        <article>
          <h3>전년도 대비 실적</h3>
          <PartChart />
        </article>
      </section>
    </Fragment>
  );
}
