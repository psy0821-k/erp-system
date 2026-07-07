'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FieldError } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

import { useSubmitLateReason } from '../hooks/useAttendance';
import { SubmitLateReasonInput } from '../api/attendanceApi';
import { updateUserAttendanceSchema } from '../Schema/updateAttendanceSchema';
import { AttendanceStatus } from '@/config/types/attendanceStatus';

type LateReasonDialogProps = {
  attendance: {
    id: string;
    late_reason?: string | null;
    status: AttendanceStatus;
  };
};

type LateReasonFormInput = {
  lateReason: string;
};
export default function LateReasonDialog({ attendance }: LateReasonDialogProps) {
  const { mutate, isPending } = useSubmitLateReason();
  const [open, setOpen] = useState(false);

  const form = useForm<LateReasonFormInput>({
    resolver: zodResolver(updateUserAttendanceSchema),
    defaultValues: {
      lateReason: attendance.late_reason ?? '',
    },
  });

  const isLate = attendance.status === 'LATE';
  const hasLateReason = Boolean(attendance.late_reason?.trim());

  const lateReasonButtonClassName = isLate
    ? 'w-full cursor-pointer border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100 focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60 font-medium'
    : 'w-full cursor-not-allowed border-border bg-muted/50 text-muted-foreground opacity-60';

  const onSubmit = (values: LateReasonFormInput) => {
    const payload: SubmitLateReasonInput = {
      attendanceId: attendance.id,
      lateReason: values.lateReason,
    };

    mutate(payload, {
      onSuccess: () => {
        form.reset(values);
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={isLate ? 'default' : 'outline'}
          size="sm"
          disabled={!isLate}
          className={lateReasonButtonClassName}
          aria-label={isLate ? (hasLateReason ? '지각 사유 수정하기' : '지각 사유 작성하기') : '지각 상태가 아닙니다'}
        >
          {isLate ? (hasLateReason ? '지각사유 수정하기' : '지각사유 작성하기') : '지각 대상 아님'}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="text-lg font-semibold tracking-tight">지각 사유 작성</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            지각 사유를 상세히 작성해 주세요. 해당 사유는 인사 관리자가 검토하게 됩니다.
          </DialogDescription>
        </DialogHeader>

        <form action="" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <Controller
            name="lateReason"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="space-y-2" data-invalid={fieldState.invalid}>
                <label htmlFor="lateReason" className="text-sm font-medium text-foreground">
                  사유 입력
                </label>

                <Textarea
                  {...field}
                  id="lateReason"
                  placeholder="예: 대중교통(지하철 2호선) 지연으로 인해 10분 늦게 출근 처리가 되었습니다."
                  aria-invalid={fieldState.invalid}
                  className="min-h-25 resize-none focus-visible:ring-2 focus-visible:ring-ring"
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </div>
            )}
          />

          <Button type="submit" disabled={isPending} className="w-full font-medium">
            {isPending ? '제출 요청 중...' : '사유 등록 완료'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
