'use client';

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

import { Trash2 } from 'lucide-react';

import { useDeleteAssetReport } from '../hooks/useDeleteAssetReport';
import { cn } from '@/lib/utils';
import { buttonStyle } from '@/app/style/buttonStyle';

interface Props {
  id: string;
}

export default function AssetReportDeleteDialog({ id }: Props) {
  const { mutate, isPending } = useDeleteAssetReport();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon" className={cn(buttonStyle.base, buttonStyle.delete)}>
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">고장 신고 삭제</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>고장 신고를 삭제하시겠습니까?</AlertDialogTitle>

          <AlertDialogDescription>삭제된 고장 신고는 복구할 수 없습니다.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-red-600 text-white focus-visible:ring-4 ring-black ring-offset-2"
            disabled={isPending}
            onClick={() => mutate(id)}
          >
            삭제
          </AlertDialogAction>
          <AlertDialogCancel>취소</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
