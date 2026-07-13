import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardChartSkeleton() {
  return (
    <Card className="flex h-full flex-col" aria-busy="true" aria-label="부서별 직원 비율을 불러오는 중">
      <CardHeader className="space-y-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-28" />
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 pb-6 sm:flex-row sm:items-center">
        <Skeleton className="mx-auto h-50 w-50 shrink-0 rounded-full sm:h-60 sm:w-60" />

        <div className="w-full flex-1 space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full rounded-lg" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
