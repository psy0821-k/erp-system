import { Laptop } from 'lucide-react';

import { getCurrentEmployee } from '@/app/api/getEmployee';
import AssetRequestAdminTable from '@/app/feature/asset-request/components/AssetRequestAdminTable';
import AssetRequestCreateDialog from '@/app/feature/asset-request/components/AssetRequestCreateDialog';
import AssetRequestTable from '@/app/feature/asset-request/components/AssetRequestTable.tsx';
import AssetFiltering from '@/app/feature/asset/components/assetFiltering';

import { textStyle } from '@/app/style/textStyle';
import { cardStyle } from '@/app/style/tableStyle';

export default async function AssetRequestPage() {
  const employee = await getCurrentEmployee();

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 dark:bg-slate-950 sm:p-8">
      <section className="mx-auto max-w-7xl space-y-10">
        <div className={cardStyle.pageHeader}>
          <div>
            <h2 className={textStyle.title}>IT 물품 요청</h2>
            <p className={textStyle.muted}>업무에 필요한 IT 장비를 요청하고 실시간 처리 상태를 확인합니다.</p>
          </div>
          <AssetRequestCreateDialog requesterId={employee?.id} />
        </div>
        <div className={cardStyle.wrapper}>
          <div className={cardStyle.sectionHeader}>
            <Laptop className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h2 className={textStyle.primary}>기기 요청 내역</h2>
              <p className={textStyle.subtle}>직원이 신청한 IT 자산의 승인 대상 목록입니다.</p>
            </div>
          </div>
          <AssetRequestAdminTable />
        </div>
        <div className={cardStyle.toolbar}>
          <div className="flex w-full justify-end">
            <AssetFiltering />
          </div>
        </div>
        <div className={cardStyle.wrapper}>
          <div className={cardStyle.sectionHeader}>
            <Laptop className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h2 className={textStyle.primary}>내 요청 내역</h2>
              <p className={textStyle.subtle}>본인이 신청한 IT 자산의 승인 진행 현황입니다.</p>
            </div>
          </div>

          <AssetRequestTable />
        </div>
      </section>
    </div>
  );
}
