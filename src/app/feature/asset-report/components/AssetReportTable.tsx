'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/ui/statusBadge';

import { useAssetReports } from '../hooks/useAssetReport';
import { ASSET_REPORT_STATUS_LABEL } from '../type/assetReportType';

import AssetReportDetailDialog from './AssetReportDetailDialog';
import AssetReportDeleteDialog from './AssetReportDeleteDialog';
import AssetReportStatusEditDialog from './AssetReportEditDialog';

import { ASSET_REPORT_STATUS_BADGE_MAP } from '@/components/badge';

import { cn } from '@/lib/utils';
import { tableStyle } from '@/app/style/tableStyle';
import { textStyle } from '@/app/style/textStyle';

export default function AssetReportTable() {
  const { data, isLoading } = useAssetReports({
    page: '1',
  });

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <p className={cn('animate-pulse text-sm', textStyle.subtle)}>고장 신고 목록을 불러오는 중입니다...</p>
      </div>
    );
  }

  const reports = data?.reports ?? [];

  return (
    <div className="w-full p-4">
      <Table>
        <caption className="sr-only">고장 신고 목록</caption>

        <TableHeader className={tableStyle.header}>
          <TableRow className="hover:bg-transparent">
            <TableHead className={cn(tableStyle.cell, 'w-[15%] text-center font-semibold', textStyle.secondary)}>신고일</TableHead>
            <TableHead className={cn(tableStyle.cell, 'w-[15%] text-center font-semibold', textStyle.secondary)}>자산</TableHead>
            <TableHead className={cn(tableStyle.cell, 'w-[40%] font-semibold', textStyle.secondary)}>제목</TableHead>
            <TableHead className={cn(tableStyle.cell, 'w-[10%] text-center font-semibold', textStyle.secondary)}>처리 상태</TableHead>
            <TableHead className={cn(tableStyle.cell, 'w-[20%] text-center font-semibold', textStyle.secondary)}>관리</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
          {reports.length === 0 ? (
            <TableRow className={tableStyle.row}>
              <TableCell colSpan={5} className={cn('h-28 text-center text-sm', textStyle.subtle)}>
                등록된 고장 신고가 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            reports.map(report => (
              <TableRow key={report.id} className={tableStyle.row}>
                <TableCell className={cn(tableStyle.cell, 'w-[15%] text-center', textStyle.mono)}>
                  {new Date(report.created_at).toLocaleDateString('ko-KR')}
                </TableCell>
                <TableCell className={cn(tableStyle.employeeName, textStyle.primary)}>{report.asset?.asset_name ?? '-'}</TableCell>
                <TableCell className={cn(tableStyle.cell, 'w-[40%] text-left')}>
                  <p className={cn('truncate', textStyle.primary)}>{report.title}</p>
                </TableCell>
                <TableCell className={cn(tableStyle.cell, 'w-[10%] text-center')}>
                  <StatusBadge label={ASSET_REPORT_STATUS_LABEL[report.status]} variant={ASSET_REPORT_STATUS_BADGE_MAP[report.status]} />
                </TableCell>

                <TableCell className={cn(tableStyle.cell, 'w-[20%]')}>
                  <div className="flex justify-end gap-1.5">
                    <AssetReportDetailDialog report={report} />
                    <AssetReportStatusEditDialog report={report} />
                    {report.status === 'PENDING' && <AssetReportDeleteDialog id={report.id} />}
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
