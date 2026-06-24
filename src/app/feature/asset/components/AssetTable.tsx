import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { Asset, ASSET_STATUS_LABEL } from '@/config/types/asset';
import AssetDeleteButton from './AssetDeleteButton';

type AssetsTableProps = {
  assets: Asset[];
};

function AssetsTable({ assets }: AssetsTableProps) {
  return (
    <Table>
      <TableCaption className="sr-only">IT 자산 목록</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="text-center">자산명</TableHead>
          <TableHead className="text-center">종류</TableHead>
          <TableHead className="text-center">시리얼 번호</TableHead>
          <TableHead className="text-center">상태</TableHead>
          <TableHead className="text-center">비고</TableHead>
          <TableHead className="text-center">등록일</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="border">
        {assets.map(asset => (
          <TableRow key={asset.id}>
            <TableCell className="text-center font-medium">{asset.asset_name}</TableCell>
            <TableCell className="text-center">{asset.asset_name}</TableCell>
            <TableCell className="text-center">{asset.serial_number ?? '-'}</TableCell>
            <TableCell className="text-center">
              <Badge variant="outline">{ASSET_STATUS_LABEL[asset.status]}</Badge>
            </TableCell>
            <TableCell className="text-center">{asset.memo ?? '-'}</TableCell>
            <TableCell className="text-center">{asset.created_at.slice(0, 10)}</TableCell>
            <TableCell className="text-center">
              <AssetDeleteButton assetName={asset.asset_name} id={asset.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AssetsTable;
