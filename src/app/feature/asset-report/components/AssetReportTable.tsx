'use client';

import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '@/components/ui/table';
import { useAssetReports } from '../hooks/useAssetReport';
import { ASSET_REPORT_STATUS_LABEL } from '../type/assetReportType';
import AssetReportDetailDialog from './AssetReportDetailDialog';
import AssetReportDeleteDialog from './AssetReportDeleteDialog';
import AssetReportStatusEditDialog from './AssetReportEditDialog';
import { cn } from '@/lib/utils';
import { tableStyle } from '@/app/style/tableStyle';
import StatusBadge from '@/components/ui/statusBadge';
import { ASSET_REPORT_STATUS_BADGE_MAP } from '@/components/badge';

export default function AssetReportTable() {
  const { data, isLoading } = useAssetReports({
    page: '1',
  });

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-400 text-sm animate-pulse">고장 신고 목록을 불러오는 중입니다...</p>
      </div>
    );
  }

  const reports = data?.reports ?? [];

  return (
    <div className="w-full p-4">
      <Table>
        <caption className="sr-only">고장 신고 목록</caption>

        <TableHeader className="bg-slate-50/70 border-b border-slate-200">
          <TableRow className="hover:bg-transparent">
            <TableHead className={cn(tableStyle.header, 'w-[15%]')}>신고일</TableHead>
            <TableHead className={cn(tableStyle.header, 'w-[15%]')}>자산</TableHead>
            <TableHead className={cn(tableStyle.header, 'w-[40%]')}>제목</TableHead>
            <TableHead className={cn(tableStyle.header, 'w-[10%]')}>처리상태</TableHead>
            <TableHead className={cn(tableStyle.header, 'w-[20%]')}>관리</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100">
          {reports.length === 0 ? (
            <TableRow className={cn(tableStyle.row)}>
              <TableCell colSpan={5} className="text-slate-400 h-28 text-center text-sm">
                등록된 고장 신고가 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            reports.map(report => (
              <TableRow key={report.id} className={cn(tableStyle.row)}>
                <TableCell className={cn(tableStyle.date, 'w-[15%]')}>{new Date(report.created_at).toLocaleDateString('ko-KR')}</TableCell>
                <TableCell className={cn(tableStyle.employeeName, 'w-[15%]')}>{report.asset?.asset_name ?? '-'}</TableCell>
                <TableCell className="text-left text-slate-800 text-sm w-[40%]">{report.title}</TableCell>
                <TableCell className="text-center">
                  <StatusBadge label={ASSET_REPORT_STATUS_LABEL[report.status]} variant={ASSET_REPORT_STATUS_BADGE_MAP[report.status]} />
                </TableCell>
                <TableCell className="text-right py-3.5 pr-6 w-[20%]">
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
