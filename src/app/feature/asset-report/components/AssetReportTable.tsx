'use client';

import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
    return <p className="text-muted-foreground text-sm">고장 신고 목록을 불러오는 중...</p>;
  }

  const reports = data?.reports ?? [];

  return (
    <div className="rounded-md border">
      <Table>
        <caption className="sr-only">고장 신고 목록</caption>

        <TableHeader>
          <TableRow>
            <TableHead>신고일</TableHead>
            <TableHead>자산</TableHead>
            <TableHead>제목</TableHead>
            <TableHead>처리상태</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reports.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-muted-foreground h-24 text-center">
                등록된 고장 신고가 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            reports.map(report => (
              <TableRow key={report.id}>
                <TableCell>{new Date(report.created_at).toLocaleDateString('ko-KR')}</TableCell>
                <TableCell>{report.asset?.asset_name ?? '-'}</TableCell>
                <TableCell className="font-medium">{report.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{ASSET_REPORT_STATUS_LABEL[report.status]}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
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
