'use client';

import { LogIn, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCheckIn } from '../hooks/useCheckIn';

interface Props {
  employeeId: string;
}

export default function CheckInButton({ employeeId }: Props) {
  const { mutate: checkInMutate, isPending } = useCheckIn(employeeId);

  return (
    <Button
      type="button"
      size="lg"
      onClick={() => checkInMutate()}
      disabled={isPending}
      className="relative h-12 w-full sm:w-auto min-w-35 px-6 font-semibold text-base transition-all duration-200 ease-in-out shadow-sm 
        bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white cursor-pointer
        hover:scale-[1.02] active:scale-[0.98] hover:shadow-blue-100 dark:hover:shadow-none"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
          <span>출근 처리 중...</span>
        </>
      ) : (
        <>
          <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
          <span>출근하기</span>
        </>
      )}
    </Button>
  );
}
