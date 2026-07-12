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
import { useDeleteAssetRequest } from '../hooks/useDeleteRequest';
import { cn } from '@/lib/utils';
import { buttonStyle } from '@/app/style/buttonStyle';

interface Props {
  id: string;
}

export default function AssetRequestDeleteDialog({ id }: Props) {
  const { mutate, isPending } = useDeleteAssetRequest();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={cn(buttonStyle.base, buttonStyle.delete, 'px-5')} variant="destructive" size="icon">
          삭제
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>IT 물품 요청을 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>삭제된 요청은 복구할 수 없습니다.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={() => mutate(id)}>
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
