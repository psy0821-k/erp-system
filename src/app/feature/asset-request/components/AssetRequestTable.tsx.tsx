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
    return <div className="py-10 text-center text-sm text-muted-foreground">요청 내역을 불러오는 중...</div>;
  }

  const requests = data?.requests ?? [];

  return (
    <div className="rounded-md border">
      <Table>
        <caption className="sr-only">IT 물품 요청 목록</caption>

        <TableHeader>
          <TableRow>
            <TableHead>요청일</TableHead>
            <TableHead>요청 물품</TableHead>
            <TableHead>제목</TableHead>
            <TableHead>상태</TableHead>
            <TableHead className="text-right">관리</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                요청 내역이 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            requests.map(request => (
              <TableRow key={request.id}>
                <TableCell>{new Date(request.created_at).toLocaleDateString('ko-KR')}</TableCell>
                <TableCell>{ASSET_TYPE_LABEL[request.asset_type]}</TableCell>
                <TableCell className="font-medium">{request.request_title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{ASSET_REQUEST_STATUS_LABEL[request.status]}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
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
