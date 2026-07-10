'use client';

import { TriangleAlert, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { useDeleteVacation } from '../hooks/useDeleteVacation';
import { buttonStyle } from '@/app/style/buttonStyle';

interface Props {
  vacationId: string;
}

export default function VacationDeleteButton({ vacationId }: Props) {
  const { mutate: deleteVacation, isPending } = useDeleteVacation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="ghost" size="icon" className={buttonStyle.delete} disabled={isPending}>
          <X className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">휴가 신청 삭제</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="border-red-200 bg-red-100 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            <TriangleAlert className="h-5 w-5" />
          </AlertDialogMedia>

          <AlertDialogTitle>휴가 신청을 삭제하시겠습니까?</AlertDialogTitle>

          <AlertDialogDescription>
            삭제한 휴가 신청은 복구할 수 없습니다.
            <br />
            계속 진행하려면 <strong>삭제</strong> 버튼을 눌러주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>취소</AlertDialogCancel>

          <AlertDialogAction variant="destructive" disabled={isPending} onClick={() => deleteVacation(vacationId)}>
            {isPending ? '삭제 중...' : '삭제'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
