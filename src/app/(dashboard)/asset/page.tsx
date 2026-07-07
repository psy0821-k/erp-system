import AssetClientList from '@/app/feature/asset/components/assetClientList';
import AssetCreateDialog from '@/app/feature/asset/components/assetCreateDialog';
import AssetFiltering from '@/app/feature/asset/components/assetFiltering';
import EmployeeSearch from '@/app/feature/employees/components/EmployeeSearch';

export default function AssetPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-8">
      <section className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">IT 자산관리</h1>
            <p className="text-sm text-slate-500 mt-1">사내 IT 장비의 등록, 지급, 반납, 상태를 관리합니다.</p>
          </div>
          <AssetCreateDialog />
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
    </div>
  );
}
