import { getCurrentEmployee } from '@/app/api/getEmployee';
import AssetReportCreateDialog from '@/app/feature/asset-report/components/AssetReportCreateDialog';
import AssetReportTable from '@/app/feature/asset-report/components/AssetReportTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench } from 'lucide-react';

export default async function AssetReportPage() {
  const employee = await getCurrentEmployee();

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">고장 신고</h1>
          <p className="text-muted-foreground mt-1 text-sm">사용 중인 IT 자산의 고장 및 이상 증상을 신고하고 처리 상태를 확인합니다.</p>
        </div>

        <AssetReportCreateDialog reporterId={employee?.id} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            고장 신고 목록
          </CardTitle>
          <CardDescription>접수된 고장 신고 내역을 확인할 수 있습니다.</CardDescription>
        </CardHeader>

        <CardContent>
          <AssetReportTable />
        </CardContent>
      </Card>
    </section>
  );
}
