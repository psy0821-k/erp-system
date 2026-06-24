import AssetClientList from '@/app/feature/asset/components/assetClientList';
import AssetCreateDialog from '@/app/feature/asset/components/assetCreateDialog';
import AssetFiltering from '@/app/feature/asset/components/assetFiltering';
import EmployeeSearch from '@/app/feature/employees/components/EmployeeSearch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Laptop, Monitor, Mouse, Package } from 'lucide-react';

const assetStats = [
  {
    title: '전체 자산',
    value: 24,
    icon: Package,
  },
  {
    title: '사용 가능',
    value: 8,
    icon: Laptop,
  },
  {
    title: '지급 중',
    value: 14,
    icon: Monitor,
  },
  {
    title: '수리/분실',
    value: 2,
    icon: Mouse,
  },
];

export default function AssetPage() {
  return (
    <section className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">IT 자산관리</h1>
          <p className="text-sm text-muted-foreground">사내 IT 장비의 등록, 지급, 반납, 상태를 관리합니다.</p>
        </div>
        <AssetCreateDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {assetStats.map(stat => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <EmployeeSearch placeholder={'제품명 혹은 시리얼 넘버를 입력해주세요'} />
        <AssetFiltering />
      </div>

      <div>
        <AssetClientList />
      </div>
    </section>
  );
}
