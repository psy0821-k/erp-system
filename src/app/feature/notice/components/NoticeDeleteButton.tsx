'use client';

import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useDeleteNotice } from '../hooks/useDeleteNotice';

interface Props {
  id: string;
}

export default function NoticeDeleteButton({ id }: Props) {
  const { mutate: deleteNotice, isPending } = useDeleteNotice();

  return (
    <Button type="button" variant="ghost" size="icon" disabled={isPending} onClick={() => deleteNotice(id)}>
      <Trash2 className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">공지사항 삭제</span>
    </Button>
  );
}
