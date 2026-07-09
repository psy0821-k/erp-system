'use client';

import { useState } from 'react';
import { Asset } from '@/config/types/asset';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import AssetEditForm from './AssetEditForm';
import { buttonStyle } from '@/app/style/buttonStyle';
import { cn } from '@/lib/utils';

interface Props {
  asset: Asset;
}

export default function AssetEditButton({ asset }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className={cn(buttonStyle.base, buttonStyle.create)}>
          수정
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>자산 수정</DialogTitle>
          <DialogDescription>회사 IT 자산 정보를 수정합니다.</DialogDescription>
        </DialogHeader>
        <AssetEditForm asset={asset} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
