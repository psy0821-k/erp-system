import DashboardCard from '@/components/dashboard/dashboard-card';
import Filtering from '@/components/filtering';
import TableComponent from '@/components/table/tableComponent';
import { Package, ShoppingCart, Truck, Users } from 'lucide-react';

const stats = [
  {
    title: '총 직원 수',
    value: '124',
    description: '총 직원수',
    icon: ShoppingCart,
  },
  {
    title: '출근 인원',
    value: '100',
    description: '현재까지 진행한 프로젝트',
    icon: Truck,
  },
  {
    title: '결근',
    value: '3',
    description: '현재 승인 대기 중',
    icon: Package,
  },
  {
    title: '휴가',
    value: '10',
    description: '활성 직원 수',
    icon: Users,
  },
];

const Page = () => {
  return (
    <div>
      <Filtering />
      <main>
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map(stat => (
            <DashboardCard key={stat.title} title={stat.title} value={stat.value} description={stat.description} icon={stat.icon} />
          ))}
        </section>
        <section>
          <TableComponent />
        </section>
      </main>
    </div>
  );
};

export default Page;
