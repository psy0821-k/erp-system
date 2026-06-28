'use client';

import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ASSET_TYPE_LABEL } from '@/config/types/asset';
import { useAssetRequests } from '../hooks/useAssetRequests';
import { ASSET_REQUEST_STATUS_LABEL } from '../type/assetRequestType';
import AssetRequestDetailDialog from './AssetRequestDetailDialog';
import AssetRequestStatusEditDialog from './AssetRequestStatusEditDialog';
import AssetRequestDeleteDialog from './AssetRequestDeleteDialog';

export default function AssetRequestTable() {
  const { data, isLoading } = useAssetRequests({
    page: '1',
  });

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-400 text-sm animate-pulse">요청 내역을 불러오는 중입니다...</p>
      </div>
    );
  }

  const requests = data?.requests ?? [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'APPROVED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'REJECTED':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="w-full">
      <Table>
        <caption className="sr-only">IT 물품 요청 목록</caption>

        <TableHeader className="bg-slate-50/70 border-b border-slate-200">
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-center font-semibold text-slate-600 h-11 pl-6">요청일</TableHead>
            <TableHead className="text-center font-semibold text-slate-600 h-11">요청 물품</TableHead>
            <TableHead className="text-left font-semibold text-slate-600 h-11">제목</TableHead>
            <TableHead className="text-center font-semibold text-slate-600 h-11">상태</TableHead>
            <TableHead className="text-right font-semibold text-slate-600 h-11 pr-6">관리</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100">
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-28 text-center text-slate-400 text-sm">
                요청 내역이 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            requests.map(request => (
              <TableRow key={request.id} className="hover:bg-slate-50/40 transition-colors">
                <TableCell className="text-center font-mono text-xs text-slate-400 py-3.5 pl-6">
                  {new Date(request.created_at).toLocaleDateString('ko-KR')}
                </TableCell>
                <TableCell className="text-center text-slate-600 text-sm font-medium">{ASSET_TYPE_LABEL[request.asset_type]}</TableCell>
                <TableCell className="text-left font-bold text-slate-800 text-sm">{request.request_title}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className={`rounded-full shadow-none px-2.5 py-0.5 font-medium text-xs ${getStatusColor(request.status)}`}>
                    {ASSET_REQUEST_STATUS_LABEL[request.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-3.5 pr-6">
                  <div className="flex justify-end gap-1.5">
                    <AssetRequestDetailDialog request={request} />
                    <AssetRequestStatusEditDialog request={request} />
                    {request.status === 'PENDING' && <AssetRequestDeleteDialog id={request.id} />}
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
