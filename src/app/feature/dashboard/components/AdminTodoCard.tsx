import { AlertTriangle, Laptop, PlaneTakeoff } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const todoItems = [
  {
    title: '휴가 승인 대기',
    description: '승인 또는 반려가 필요한 휴가 신청',
    count: 4,
    icon: PlaneTakeoff,
  },
  {
    title: 'IT 물품 요청',
    description: '지급 검토가 필요한 물품 요청',
    count: 3,
    icon: Laptop,
  },
  {
    title: '고장 신고',
    description: '확인이 필요한 자산 고장 신고',
    count: 2,
    icon: AlertTriangle,
  },
];

export default function AdminTodoCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>오늘 처리할 업무</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3">
        {todoItems.map(item => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
                  <Icon className="size-5" aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-medium">{item.title}</p>
                  <p className="truncate text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>

              <strong className="shrink-0 text-2xl">{item.count}</strong>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
