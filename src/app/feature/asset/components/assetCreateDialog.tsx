'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AssetCreateForm from './AssetCreateForm';

export default function AssetCreateDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="bg-blue-600 text-white focus-visible:ring-4 ring-offset-2 ring-black">
          <Plus className="h-4 w-4" />
          자산 등록
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>자산 등록</DialogTitle>
          <DialogDescription>회사 IT 자산 정보를 등록합니다.</DialogDescription>
        </DialogHeader>

        <AssetCreateForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
