'use client';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Asset, ASSET_STATUS_LABEL, ASSET_TYPE_LABEL } from '@/config/types/asset';
import AssetDeleteButton from './AssetDeleteButton';
import AssetEditButton from './AssetEditButton';
import { cn } from '@/lib/utils';
import { tableStyle } from '@/app/style/tableStyle';
import { textStyle } from '@/app/style/textStyle';
import { ASSET_STATUS_BADGE_MAP } from '@/components/badge';
import StatusBadge from '@/components/ui/statusBadge';

type AssetsTableProps = {
  assets: Asset[];
};

function AssetsTable({ assets }: AssetsTableProps) {
  return (
    <div className={cn(tableStyle.wrapper, 'p-4')}>
      <Table>
        <TableCaption className="sr-only">IT 자산 목록</TableCaption>

        <TableHeader className={tableStyle.header}>
          <TableRow className="hover:bg-transparent">
            {['자산명', '종류', '시리얼 번호', '상태', '비고', '등록일', '관리'].map(header => (
              <TableHead key={header} className={cn(tableStyle.cell, 'h-11 text-center font-semibold', textStyle.secondary)}>
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
          {assets.map(asset => (
            <TableRow key={asset.id} className={tableStyle.row}>
              <TableCell className={cn(tableStyle.employeeName, textStyle.primary)}>{asset.asset_name}</TableCell>

              <TableCell className={cn(tableStyle.cell, 'text-center text-sm', textStyle.body)}>{ASSET_TYPE_LABEL[asset.asset_type]}</TableCell>

              <TableCell className={cn(tableStyle.employeeNumber, textStyle.mono)}>{asset.serial_number ?? '-'}</TableCell>

              <TableCell className={cn(tableStyle.cell, 'text-center')}>
                <StatusBadge label={ASSET_STATUS_LABEL[asset.status]} variant={ASSET_STATUS_BADGE_MAP[asset.status]} />
              </TableCell>

              <TableCell className={cn(tableStyle.cell, 'max-w-45 truncate text-center text-sm', textStyle.muted)}>{asset.memo ?? '-'}</TableCell>

              <TableCell className={cn(tableStyle.cell, tableStyle.date, textStyle.mono)}>{asset.created_at.slice(0, 10)}</TableCell>

              <TableCell className="py-3.5 pr-6 text-right">
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
