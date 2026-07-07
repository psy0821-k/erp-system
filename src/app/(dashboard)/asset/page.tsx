import AssetClientList from '@/app/feature/asset/components/assetClientList';
import AssetCreateDialog from '@/app/feature/asset/components/assetCreateDialog';
import AssetFiltering from '@/app/feature/asset/components/assetFiltering';
import EmployeeSearch from '@/app/feature/employees/components/EmployeeSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Laptop, Monitor, Mouse, Package } from 'lucide-react';

const assetStats = [
  { title: '전체 자산', value: 24, icon: Package },
  { title: '사용 가능', value: 8, icon: Laptop },
  { title: '지급 중', value: 14, icon: Monitor },
  { title: '수리/분실', value: 2, icon: Mouse },
];

export default function AssetPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 p-6 sm:p-8">
      <section className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">IT 자산관리</h1>
            <p className="text-sm text-slate-500 mt-1">사내 IT 장비의 등록, 지급, 반납, 상태를 관리합니다.</p>
          </div>
          <AssetCreateDialog />
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {assetStats.map(stat => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="bg-white border border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-slate-400" aria-hidden="true" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:max-w-md">
            <EmployeeSearch placeholder="제품명 혹은 시리얼 넘버를 입력해주세요" />
          </div>
          <div className="w-full sm:w-auto flex justify-end">
            <AssetFiltering />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <AssetClientList />
        </div>
      </section>
    </main>
  );
}
