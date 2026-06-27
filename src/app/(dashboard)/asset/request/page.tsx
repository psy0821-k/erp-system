import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AssetRequestPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">IT 물품 요청</h1>
        <p className="text-muted-foreground">업무에 필요한 IT 장비를 요청하고 처리 상태를 확인합니다.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>물품 요청 등록</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-10 rounded-md border px-3 py-2 text-sm text-muted-foreground">요청 물품 선택</div>
            <div className="h-10 rounded-md border px-3 py-2 text-sm text-muted-foreground">요청 제목</div>
          </div>

          <div className="min-h-28 rounded-md border px-3 py-2 text-sm text-muted-foreground">요청 사유</div>

          <div className="flex justify-end">
            <Button>요청 접수</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>내 요청 내역</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">아직 등록된 요청이 없습니다.</div>
        </CardContent>
      </Card>
    </div>
  );
}
