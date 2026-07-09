import AssetClientList from '@/app/feature/asset/components/assetClientList';
import AssetCreateDialog from '@/app/feature/asset/components/assetCreateDialog';
import AssetFiltering from '@/app/feature/asset/components/assetFiltering';
import EmployeeSearch from '@/app/feature/employees/components/EmployeeSearch';
import { cardStyle, filterStyle } from '@/app/style/tableStyle';
import { textStyle } from '@/app/style/textStyle';
import { cn } from '@/lib/utils';

export default function AssetPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-8 dark:bg-[#0b1120]">
      <section className="max-w-7xl mx-auto space-y-6">
        <div className={cardStyle.pageHeader}>
          <div>
            <h1 className={cn(textStyle.title, 'text-3xl font-bold tracking-tight text-slate-900')}>IT 자산관리</h1>
            <p className={cn(textStyle.subtle)}>사내 IT 장비의 등록, 지급, 반납, 상태를 관리합니다.</p>
          </div>
          <AssetCreateDialog />
        </div>

        <div className={filterStyle.wrapper}>
          <div className={filterStyle.area}>
            <div className="w-full sm:max-w-md">
              <EmployeeSearch placeholder="제품명 혹은 시리얼 넘버를 입력해주세요" />
            </div>
            <AssetFiltering />
          </div>
        </div>

        <AssetClientList />
      </section>
    </div>
  );
}
