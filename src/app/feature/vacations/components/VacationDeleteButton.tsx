'use client';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useDeleteVacation } from '../hooks/useDeleteVacation';
import { ApprovalStatus } from '../type/vacationType';

interface Props {
  vacationId: string;
}

export default function VacationDeleteButton({ vacationId }: Props) {
  const { mutate, isPending } = useDeleteVacation();

  return (
    <Button type="button" variant="ghost" size="icon" disabled={isPending} onClick={() => mutate(vacationId)}>
      <X className="h-4 w-4" />
      <span className="sr-only">휴가 신청 삭제</span>
    </Button>
  );
}
