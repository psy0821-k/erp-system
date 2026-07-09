'use client';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Asset, ASSET_STATUS_LABEL, ASSET_TYPE_LABEL } from '@/config/types/asset';
import AssetDeleteButton from './AssetDeleteButton';
import AssetEditButton from './AssetEditButton';
import { cn } from '@/lib/utils';
import { tableStyle } from '@/app/style/tableStyle';
import { ASSET_STATUS_BADGE_MAP } from '@/components/badge';
import StatusBadge from '@/components/ui/statusBadge';

type AssetsTableProps = {
  assets: Asset[];
};

function AssetsTable({ assets }: AssetsTableProps) {
  return (
    <div className="w-full p-4">
      <Table>
        <TableCaption className="sr-only">IT 자산 목록</TableCaption>

        <TableHeader className="bg-slate-50/70 border-b border-slate-200">
          <TableRow className="hover:bg-transparent">
            <TableHead className={cn(tableStyle.header, 'h-11')}>자산명</TableHead>
            <TableHead className={cn(tableStyle.header, 'h-11')}>종류</TableHead>
            <TableHead className={cn(tableStyle.header, 'h-11')}>시리얼 번호</TableHead>
            <TableHead className={cn(tableStyle.header, 'h-11')}>상태</TableHead>
            <TableHead className={cn(tableStyle.header, 'h-11')}>비고</TableHead>
            <TableHead className={cn(tableStyle.header, 'h-11')}>등록일</TableHead>
            <TableHead className={cn(tableStyle.header, 'h-11')}>관리</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100">
          {assets.map(asset => (
            <TableRow key={asset.id} className="hover:bg-slate-50/40 transition-colors">
              <TableCell className={cn(tableStyle.employeeName)}>{asset.asset_name}</TableCell>
              <TableCell className="text-center text-slate-600 text-sm">{ASSET_TYPE_LABEL[asset.asset_type]}</TableCell>
              <TableCell className={cn(tableStyle.employeeNumber)}>{asset.serial_number ?? '-'}</TableCell>
              <TableCell className="text-center">
                <StatusBadge label={ASSET_STATUS_LABEL[asset.status]} variant={ASSET_STATUS_BADGE_MAP[asset.status]} />
              </TableCell>
              <TableCell className="text-center text-slate-500 text-sm max-w-45 truncate">{asset.memo ?? '-'}</TableCell>
              <TableCell className={cn(tableStyle.date)}>{asset.created_at.slice(0, 10)}</TableCell>
              <TableCell className="text-right py-3.5 pr-6">
                <div className="inline-flex items-center gap-1">
                  <AssetEditButton asset={asset} />
                  <AssetDeleteButton assetName={asset.asset_name} id={asset.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AssetsTable;
