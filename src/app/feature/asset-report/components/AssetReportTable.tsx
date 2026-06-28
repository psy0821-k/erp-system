'use client';

import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '@/components/ui/table';
import { useAssetReports } from '../hooks/useAssetReport';
import { ASSET_REPORT_STATUS_LABEL } from '../type/assetReportType';
import AssetReportDetailDialog from './AssetReportDetailDialog';
import AssetReportDeleteDialog from './AssetReportDeleteDialog';
import AssetReportStatusEditDialog from './AssetReportEditDialog';

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'PROCESSING':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'COMPLETED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="w-full">
      <Table>
        <caption className="sr-only">고장 신고 목록</caption>

        <TableHeader className="bg-slate-50/70 border-b border-slate-200">
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-center font-semibold text-slate-600 h-11 pl-6">신고일</TableHead>
            <TableHead className="text-center font-semibold text-slate-600 h-11">자산</TableHead>
            <TableHead className="text-left font-semibold text-slate-600 h-11">제목</TableHead>
            <TableHead className="text-center font-semibold text-slate-600 h-11">처리상태</TableHead>
            <TableHead className="text-right font-semibold text-slate-600 h-11 pr-6">관리</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100">
          {reports.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-slate-400 h-28 text-center text-sm">
                등록된 고장 신고가 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            reports.map(report => (
              <TableRow key={report.id} className="hover:bg-slate-50/40 transition-colors">
                <TableCell className="text-center font-mono text-xs text-slate-400 py-3.5 pl-6">
                  {new Date(report.created_at).toLocaleDateString('ko-KR')}
                </TableCell>
                <TableCell className="text-center text-slate-600 text-sm font-medium">{report.asset?.asset_name ?? '-'}</TableCell>
                <TableCell className="text-left font-bold text-slate-800 text-sm">{report.title}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className={`rounded-full shadow-none px-2.5 py-0.5 font-medium text-xs ${getStatusColor(report.status)}`}>
                    {ASSET_REPORT_STATUS_LABEL[report.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-3.5 pr-6">
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
