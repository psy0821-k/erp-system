'use client';

import { useState } from 'react';
import { Asset } from '@/config/types/asset';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import AssetEditForm from './AssetEditForm';

interface Props {
  asset: Asset;
}

export default function AssetEditButton({ asset }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="bg-green-600 text-white focus-visible:ring-4 ring-offset-2 ring-black">
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
