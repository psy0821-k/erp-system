'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { AssetRequestAdmin } from '../type/assetRequestAdmin';
import { useApproveAssetRequest, useAvailableAssetsByType } from '../hooks/useAdminAssetRequest';
import { buttonStyle } from '@/app/style/buttonStyle';
import { cn } from '@/lib/utils';

interface Props {
  request: AssetRequestAdmin;
}

export default function ApproveAssetRequestDialog({ request }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState('');

  const { data: assets = [], isLoading } = useAvailableAssetsByType(request.asset_type);
  const { mutate: approveRequest, isPending } = useApproveAssetRequest();

  const handleApprove = () => {
    if (!selectedAssetId) return;

    approveRequest(
      {
        requestId: request.id,
        assetId: selectedAssetId,
        requesterId: request.requester_id,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setSelectedAssetId('');
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="sm" className={cn(buttonStyle.base, buttonStyle.create)}>
          승인
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>물품 요청 승인</DialogTitle>
          <DialogDescription>요청자에게 배정할 사용 가능한 물품을 선택하세요.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4 text-sm">
            <p>
              <span className="text-muted-foreground">요청자: </span>
              <strong>{request.requester?.name ?? '-'}</strong>
            </p>

            <p>
              <span className="text-muted-foreground">요청 물품: </span>
              <strong>{request.asset_type}</strong>
            </p>
          </div>

          {isLoading ? (
            <p className="text-sm text-muted-foreground">사용 가능한 물품을 불러오는 중입니다.</p>
          ) : assets.length === 0 ? (
            <p className="rounded-lg border p-4 text-sm text-muted-foreground">현재 배정 가능한 물품이 없습니다.</p>
          ) : (
            <RadioGroup value={selectedAssetId} onValueChange={setSelectedAssetId}>
              <div className="space-y-2">
                {assets.map(asset => (
                  <Label key={asset.id} htmlFor={asset.id} className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-muted/50">
                    <RadioGroupItem id={asset.id} value={asset.id} />

                    <div>
                      <p className="font-medium">{asset.asset_name}</p>
                      <p className="text-xs text-muted-foreground">{asset.serial_number ?? '시리얼 번호 없음'}</p>
                    </div>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          )}
        </div>

        <DialogFooter>
          <Button type="button" className={cn(buttonStyle.delete, buttonStyle.base)} variant="outline" onClick={() => setOpen(false)}>
            취소
          </Button>

          <Button type="button" className={cn(buttonStyle.delete, buttonStyle.base)} disabled={!selectedAssetId || isPending} onClick={handleApprove}>
            {isPending ? '승인 중...' : '배정 승인'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
