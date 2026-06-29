'use client';

import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
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

import { useDeleteNotice } from '../hooks/useDeleteNotice';

interface Props {
  id: string;
}

export default function NoticeDeleteDialog({ id }: Props) {
  const router = useRouter();
  const { mutate: deleteNotice, isPending } = useDeleteNotice();

  const handleDelete = () => {
    deleteNotice(id, {
      onSuccess: () => {
        router.push('/notice');
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={isPending}>
          <Trash2 className="mr-2 h-4 w-4" />
          삭제
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>공지사항을 삭제할까요?</AlertDialogTitle>
          <AlertDialogDescription>삭제한 공지사항과 본문에 업로드된 이미지는 되돌릴 수 없습니다.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? '삭제 중...' : '삭제'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
