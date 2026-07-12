'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/ui/statusBadge';

import { useAssetRequests } from '../hooks/useAssetRequests';
import { ASSET_REQUEST_STATUS_LABEL } from '../type/assetRequestType';

import AssetRequestDetailDialog from './AssetRequestDetailDialog';
import AssetRequestStatusEditDialog from './AssetRequestStatusEditDialog';
import AssetRequestDeleteDialog from './AssetRequestDeleteDialog';

import { ASSET_TYPE_LABEL } from '@/config/types/asset';
import { ASSET_REQUEST_STATUS_BADGE_MAP } from '@/components/badge';

import { cn } from '@/lib/utils';
import { tableStyle } from '@/app/style/tableStyle';
import { textStyle } from '@/app/style/textStyle';
import RoleGuard from '@/components/auth/RoleGuard';
import { EmployeeRole } from '../../sign-up/schema/employeeSchema';

interface Props {
  employeeRole: EmployeeRole;
}

export default function AssetRequestTable({ employeeRole }: Props) {
  const { data, isLoading } = useAssetRequests({
    page: '1',
  });

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <p className={cn('animate-pulse text-sm', textStyle.subtle)}>요청 내역을 불러오는 중입니다...</p>
      </div>
    );
  }

  const requests = data?.requests ?? [];

  return (
    <div className="w-full p-4">
      <Table>
        <caption className="sr-only">IT 물품 요청 목록</caption>

        <TableHeader className={tableStyle.header}>
          <TableRow className="hover:bg-transparent">
            <TableHead className={cn(tableStyle.cell, 'w-[15%] text-center font-semibold', textStyle.secondary)}>요청일</TableHead>
            <TableHead className={cn(tableStyle.cell, 'w-[15%] text-center font-semibold', textStyle.secondary)}>요청 물품</TableHead>
            <TableHead className={cn(tableStyle.cell, 'w-[40%] font-semibold', textStyle.secondary)}>제목</TableHead>
            <TableHead className={cn(tableStyle.cell, 'w-[10%] text-center font-semibold', textStyle.secondary)}>상태</TableHead>
            <TableHead className={cn(tableStyle.cell, 'w-[20%] text-center font-semibold', textStyle.secondary)}>관리</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
          {requests.length === 0 ? (
            <TableRow className={tableStyle.row}>
              <TableCell colSpan={5} className={cn('h-28 text-center text-sm', textStyle.subtle)}>
                요청 내역이 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            requests.map(request => (
              <TableRow key={request.id} className={tableStyle.row}>
                <TableCell className={cn(tableStyle.cell, 'w-[15%] text-center', textStyle.mono)}>
                  {new Date(request.created_at).toLocaleDateString('ko-KR')}
                </TableCell>
                <TableCell className={cn(tableStyle.cell, 'w-[15%] text-center text-sm', textStyle.secondary)}>
                  {ASSET_TYPE_LABEL[request.asset_type]}
                </TableCell>
                <TableCell className={cn(tableStyle.cell, 'w-[40%]')}>
                  <p className={cn('truncate', textStyle.primary)}>{request.request_title}</p>
                </TableCell>
                <TableCell className={cn(tableStyle.cell, 'w-[10%] text-center')}>
                  <StatusBadge label={ASSET_REQUEST_STATUS_LABEL[request.status]} variant={ASSET_REQUEST_STATUS_BADGE_MAP[request.status]} />
                </TableCell>
                <TableCell className={cn(tableStyle.cell, 'w-[20%]')}>
                  <div className="flex justify-end gap-1.5">
                    <AssetRequestDetailDialog request={request} />
                    <RoleGuard role={employeeRole} permission="ASSET_MANAGE">
                      <AssetRequestStatusEditDialog request={request} />
                      {request.status === 'PENDING' && <AssetRequestDeleteDialog id={request.id} />}
                    </RoleGuard>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
