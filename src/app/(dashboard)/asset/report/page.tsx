import { getCurrentEmployee } from '@/app/api/getEmployee';
import AssetReportCreateDialog from '@/app/feature/asset-report/components/AssetReportCreateDialog';
import AssetReportTable from '@/app/feature/asset-report/components/AssetReportTable';
import { Wrench } from 'lucide-react';

export default async function AssetReportPage() {
  const employee = await getCurrentEmployee();

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-8">
      <section className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">고장 신고</h1>
            <p className="text-sm text-slate-500 mt-1">사용 중인 IT 자산의 고장 및 이상 증상을 신고하고 처리 상태를 확인합니다.</p>
          </div>
          <AssetReportCreateDialog reporterId={employee?.id} />
        </div>

        <div className="bg-white p-5 rounded-t-2xl border-t border-x border-slate-200/80 flex items-center gap-2 text-slate-800 -mb-2">
          <Wrench className="h-5 w-5 text-indigo-600" />
          <h2 className="font-bold text-lg">고장 신고 목록</h2>
        </div>

        <div className="bg-white rounded-b-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <AssetReportTable />
        </div>
      </section>
    </div>
  );
}
