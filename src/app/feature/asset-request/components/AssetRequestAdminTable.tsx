'use client';

import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EmployeePagination from '../../employees/components/EmployeePagination';
import ApproveAssetRequestDialog from './ApproveAssetRequestDialog';
import { usePendingAssetRequests, useRejectAssetRequest } from '../hooks/useAdminAssetRequest';
import { tableStyle } from '@/app/style/tableStyle';
import { cn } from '@/lib/utils';

export default function AssetRequestAdminTable() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('requestPage') ?? 1);
  const MAX_PAGE = 10;

  const { data, isLoading } = usePendingAssetRequests(page);
  const { mutate: rejectRequest, isPending: isRejecting } = useRejectAssetRequest();

  const requests = data?.data ?? [];

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">물품 요청 목록을 불러오는 중입니다.</p>;
  }

  return (
    <div className="space-y-4 p-4">
      <div>
        <h2 className="text-lg font-semibold">관리자 요청 처리</h2>
        <p className="text-sm text-muted-foreground">승인 대기 중인 물품 요청만 표시됩니다.</p>
      </div>

      <Table>
        <TableCaption className=" sr-only">관리자 물품 요청 처리 목록</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className={cn(tableStyle.header)}>요청자</TableHead>
            <TableHead className={cn(tableStyle.header)}>부서</TableHead>
            <TableHead className={cn(tableStyle.header)}>직급</TableHead>
            <TableHead className={cn(tableStyle.header)}>요청물품</TableHead>
            <TableHead className={cn(tableStyle.header)}>관리</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-sm text-muted-foreground">
                승인 대기 중인 물품 요청이 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            requests.map(request => (
              <TableRow key={request.id} className={cn(tableStyle.row)}>
                <TableCell className={cn(tableStyle.employeeName)}>{request.requester?.name ?? '-'}</TableCell>
                <TableCell className={cn(tableStyle.employeeDepartment)}>{request.requester?.department ?? '-'}</TableCell>
                <TableCell>{request.requester?.position ?? '-'}</TableCell>
                <TableCell>{request.asset_type}</TableCell>

                <TableCell>
                  <div className="flex justify-center gap-2">
                    <ApproveAssetRequestDialog request={request} />

                    <Button
                      type="button"
                      variant="outline"
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
