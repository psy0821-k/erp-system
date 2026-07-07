import { getCurrentEmployee } from '@/app/api/getEmployee';
import AssetRequestAdminTable from '@/app/feature/asset-request/components/AssetRequestAdminTable';
import AssetRequestCreateDialog from '@/app/feature/asset-request/components/AssetRequestCreateDialog';
import AssetRequestTable from '@/app/feature/asset-request/components/AssetRequestTable.tsx';
import AssetFiltering from '@/app/feature/asset/components/assetFiltering';
import { Laptop } from 'lucide-react';

export default async function AssetRequestPage() {
  const employee = await getCurrentEmployee();

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-8">
      <section className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">IT 물품 요청</h2>
            <p className="text-sm text-slate-500 mt-1">업무에 필요한 IT 장비를 요청하고 실시간 처리 상태를 확인합니다.</p>
          </div>

          <AssetRequestCreateDialog requesterId={employee?.id} />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mt-10">
          <div className="p-5 border-b border-slate-100 bg-slate-50/30 flex items-center gap-2">
            <Laptop className="h-5 w-5 text-indigo-600" />
            <div>
              <h2 className="text-base font-bold text-slate-800">기기 요청 내역</h2>
              <p className="text-xs text-slate-400 mt-0.5">직원 중 신청한 IT 자산의 승인이 필요한 목록입니다.</p>
            </div>
          </div>

          <div className="p-0">
            <AssetRequestAdminTable />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between mt-10">
          <div className="w-full sm:w-auto flex justify-end">
            <AssetFiltering />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mt-10">
          <div className="p-5 border-b border-slate-100 bg-slate-50/30 flex items-center gap-2">
            <Laptop className="h-5 w-5 text-indigo-600" />
            <div>
              <h2 className="text-base font-bold text-slate-800">내 요청 내역</h2>
              <p className="text-xs text-slate-400 mt-0.5">본인이 신청한 IT 자산의 세부 승인 현황 목록입니다.</p>
            </div>
          </div>

          <div className="p-0">
            <AssetRequestTable />
          </div>
        </div>
      </section>
    </div>
  );
}
