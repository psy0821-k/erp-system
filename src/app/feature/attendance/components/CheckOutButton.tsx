'use client';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

import { useCheckOut } from '../hooks/useCheckOut';

interface Props {
  attendanceId: string;
  employeeId: string;
}

export default function CheckOutButton({ attendanceId, employeeId }: Props) {
  const { mutate: checkOutMutate, isPending } = useCheckOut(attendanceId, employeeId);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>퇴근하기</Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>퇴근 처리</AlertDialogTitle>

          <AlertDialogDescription>퇴근 처리 후에는 수정할 수 없습니다. 정말 퇴근하시겠습니까?</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="bg-red-600 text-white hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2">
            취소
          </AlertDialogCancel>

          <AlertDialogAction
            className="bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            disabled={isPending}
            onClick={() => checkOutMutate()}
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
