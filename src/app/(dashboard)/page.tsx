import { Package, ShoppingCart, Truck, Users } from 'lucide-react';

import DashboardCard from '@/components/dashboard/dashboard-card';
import { Fragment } from 'react/jsx-runtime';
import SalesChart from '@/components/dashboard/sales-chart';

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
      <section>
        <SalesChart />
      </section>
    </Fragment>
  );
}
