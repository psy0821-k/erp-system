'use client';

import { Button } from '@/components/ui/button';
import { useVacationsInfinite } from '../hooks/useVacationsInfinite';
import AdminVacationTable from './AdminVacationTable';

export default function AdminVacationListClient() {
  const { data, isLoading, error, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useVacationsInfinite();

  const vacations = data?.pages.flatMap(page => page.vacations) ?? [];

  if (isLoading) {
    return <div>휴가 신청 목록을 불러오는 중입니다...</div>;
  }

  if (isError) {
    return (
      <div>
        휴가 신청 목록을 불러오지 못했습니다.
        <pre className="mt-2 text-sm text-red-600">{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  if (vacations.length === 0) {
    return <div>등록된 휴가 신청이 없습니다.</div>;
  }

  return (
    <div className="space-y-4">
      <AdminVacationTable vacations={vacations} />

      {hasNextPage && (
        <div className="flex justify-center">
          <Button type="button" variant="outline" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? '불러오는 중...' : '더보기'}
          </Button>
        </div>
      )}
    </div>
  );
}
