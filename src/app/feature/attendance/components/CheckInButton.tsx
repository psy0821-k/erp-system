'use client';

import { Button } from '@/components/ui/button';
import { useCheckIn } from '../hooks/useCheckIn';

interface Props {
  employeeId: string;
}

export default function CheckInButton({ employeeId }: Props) {
  const { mutate: checkInMutate, isPending } = useCheckIn(employeeId);

  return (
    <Button type="button" onClick={() => checkInMutate()} disabled={isPending}>
      {isPending ? '출근 처리중...' : '출근하기'}
    </Button>
  );
}
