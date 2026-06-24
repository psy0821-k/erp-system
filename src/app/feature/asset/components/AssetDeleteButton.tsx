'use client';

import { Trash2 } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';
import { useDeleteAsset } from '../hooks/useDeleteAsset';

interface Props {
  id: string;
  assetName: string;
}

export default function AssetDeleteButton({ id, assetName }: Props) {
  const { mutate, isPending } = useDeleteAsset();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive" size="sm" className=" ml-3 cursor-pointer bg-red-600 text-white ">
          <Trash2 className="h-4 w-4" />
          삭제
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>자산을 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>{assetName} 자산이 삭제됩니다. 삭제 후에는 목록에서 더 이상 조회되지 않습니다.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction
            className="cursor-pointer bg-red-600 text-white focus-visible:ring-2 ring-black"
            disabled={isPending}
            onClick={() => mutate(id)}
          >
            {isPending ? '삭제 중...' : '삭제'}
          </AlertDialogAction>
          <AlertDialogCancel>취소</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
