'use client';

import { TriangleAlert } from 'lucide-react';

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

import { buttonStyle } from '@/app/style/buttonStyle';
import { useDeleteEmployee } from '../hooks/useDeleteEmployee';
import { cn } from '@/lib/utils';

type EmployeeDeleteButtonProps = {
  id: string;
};

export default function EmployeeDeleteButton({ id }: EmployeeDeleteButtonProps) {
  const { mutate: deleteEmployee, isPending } = useDeleteEmployee();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive" size="sm" className={cn(buttonStyle.base, buttonStyle.delete, 'ml-2')} disabled={isPending}>
          삭제
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="border-red-200 bg-red-100 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            <TriangleAlert className="h-5 w-5" aria-hidden="true" />
          </AlertDialogMedia>

          <AlertDialogTitle>직원을 삭제하시겠습니까?</AlertDialogTitle>

          <AlertDialogDescription>
            삭제한 직원 정보는 복구할 수 없습니다.
            <br />
            계속 진행하려면 <strong>삭제</strong> 버튼을 눌러주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>취소</AlertDialogCancel>

          <AlertDialogAction
            className={cn(buttonStyle.delete, buttonStyle.base)}
            variant="destructive"
            disabled={isPending}
            onClick={() => deleteEmployee(id)}
          >
            {isPending ? '삭제 중...' : '삭제'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
