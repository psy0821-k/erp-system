import { getCurrentEmployee } from '@/app/api/getEmployee';
import AssetRequestCreateDialog from '@/app/feature/asset-request/components/AssetRequestCreateDialog';
import AssetRequestTable from '@/app/feature/asset-request/components/AssetRequestTable.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AssetRequestPage() {
  const employee = await getCurrentEmployee();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">IT 물품 요청</h1>
          <p className="text-muted-foreground">업무에 필요한 IT 장비를 요청하고 처리 상태를 확인합니다.</p>
        </div>

        <AssetRequestCreateDialog requesterId={employee?.id} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>내 요청 내역</CardTitle>
        </CardHeader>

        <CardContent>
          <AssetRequestTable />
        </CardContent>
      </Card>
    </div>
  );
}
