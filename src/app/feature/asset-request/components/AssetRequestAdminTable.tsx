'use client';

import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import EmployeePagination from '../../employees/components/EmployeePagination';
import ApproveAssetRequestDialog from './ApproveAssetRequestDialog';

import { usePendingAssetRequests, useRejectAssetRequest } from '../hooks/useAdminAssetRequest';

import { cn } from '@/lib/utils';
import { tableStyle } from '@/app/style/tableStyle';
import { textStyle } from '@/app/style/textStyle';
import { buttonStyle } from '@/app/style/buttonStyle';

export default function AssetRequestAdminTable() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('requestPage') ?? 1);
  const MAX_PAGE = 10;

  const { data, isLoading } = usePendingAssetRequests(page);
  const { mutate: rejectRequest, isPending: isRejecting } = useRejectAssetRequest();

  const requests = data?.data ?? [];

  if (isLoading) {
    return <p className={cn('text-sm', textStyle.subtle)}>물품 요청 목록을 불러오는 중입니다.</p>;
  }

  return (
    <div className="space-y-4 p-4">
      <div>
        <h2 className={cn('text-lg font-semibold', textStyle.primary)}>관리자 요청 처리</h2>

        <p className={cn('text-sm', textStyle.muted)}>승인 대기 중인 물품 요청만 표시됩니다.</p>
      </div>

      <Table>
        <TableCaption className="sr-only">관리자 물품 요청 처리 목록</TableCaption>

        <TableHeader className={tableStyle.header}>
          <TableRow className="hover:bg-transparent">
            <TableHead className={cn(tableStyle.cell, 'text-center font-semibold', textStyle.secondary)}>요청자</TableHead>

            <TableHead className={cn(tableStyle.cell, 'text-center font-semibold', textStyle.secondary)}>부서</TableHead>

            <TableHead className={cn(tableStyle.cell, 'text-center font-semibold', textStyle.secondary)}>직급</TableHead>

            <TableHead className={cn(tableStyle.cell, 'text-center font-semibold', textStyle.secondary)}>요청 물품</TableHead>

            <TableHead className={cn(tableStyle.cell, 'text-center font-semibold', textStyle.secondary)}>관리</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
          {requests.length === 0 ? (
            <TableRow className={tableStyle.row}>
              <TableCell colSpan={5} className={cn('h-24 text-center text-sm', textStyle.subtle)}>
                승인 대기 중인 물품 요청이 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            requests.map(request => (
              <TableRow key={request.id} className={tableStyle.row}>
                <TableCell className={cn(tableStyle.employeeName, textStyle.primary)}>{request.requester?.name ?? '-'}</TableCell>
                <TableCell className={cn(tableStyle.employeeDepartment, textStyle.body)}>{request.requester?.department ?? '-'}</TableCell>
                <TableCell className={cn(tableStyle.cell, 'text-center', textStyle.body)}>{request.requester?.position ?? '-'}</TableCell>
                <TableCell className={cn(tableStyle.cell, 'text-center', textStyle.secondary)}>{request.asset_type}</TableCell>
                <TableCell className={tableStyle.cell}>
                  <div className="flex justify-center gap-2">
                    <ApproveAssetRequestDialog request={request} />
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(buttonStyle.delete, buttonStyle.base)}
                      size="sm"
                      disabled={isRejecting}
                      onClick={() =>
                        rejectRequest({
                          requestId: request.id,
                          resultMessage: '관리자에 의해 반려되었습니다.',
                        })
                      }
                    >
                      반려
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {data && data.totalPages > 1 && <EmployeePagination currentPage={data.page} totalCount={data.totalPages} pageSize={MAX_PAGE} />}
    </div>
  );
}
