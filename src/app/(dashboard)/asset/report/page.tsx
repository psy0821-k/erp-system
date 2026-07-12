import { Wrench } from 'lucide-react';

import { getCurrentEmployee } from '@/app/api/getEmployee';
import AssetReportCreateDialog from '@/app/feature/asset-report/components/AssetReportCreateDialog';
import AssetReportTable from '@/app/feature/asset-report/components/AssetReportTable';

import { textStyle } from '@/app/style/textStyle';
import { cardStyle } from '@/app/style/tableStyle';

export default async function AssetReportPage() {
  const employee = await getCurrentEmployee();
  if (!employee) return;
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 dark:bg-slate-950 sm:p-8">
      <section className="mx-auto max-w-7xl space-y-6">
        <div className={cardStyle.pageHeader}>
          <div>
            <h2 className={textStyle.title}>고장 신고</h2>

            <p className={textStyle.muted}>사용 중인 IT 자산의 고장 및 이상 증상을 신고하고 처리 상태를 확인합니다.</p>
          </div>

          <AssetReportCreateDialog reporterId={employee?.id} />
        </div>

        <div className={cardStyle.wrapper}>
          <div className={cardStyle.sectionHeader}>
            <Wrench className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />

            <div>
              <h2 className={textStyle.primary}>고장 신고 목록</h2>
              <p className={textStyle.subtle}>등록된 고장 신고 내역과 처리 진행 상태를 확인합니다.</p>
            </div>
          </div>

          <AssetReportTable employeeRole={employee.role} />
        </div>
      </section>
    </div>
  );
}
