'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

import { useUpdateLateReason } from '../hooks/useUpdateAttendance';
import { UpdateLateReasonInput } from '../api/lateReasonApi';
import { updateUserAttendanceSchema } from '../Schema/updateAttendanceSchema';
import { AttendanceStatus } from '@/config/types/attendanceStatus';

type LateReasonDialogProps = {
  attendance: {
    id: string;
    late_reason?: string | null;
    status: AttendanceStatus;
  };
};

export default function LateReasonDialog({ attendance }: LateReasonDialogProps) {
  const { mutate, isPending } = useUpdateLateReason();
  const [open, setOpen] = useState(false);

  const form = useForm<UpdateLateReasonInput>({
    resolver: zodResolver(updateUserAttendanceSchema),
    defaultValues: {
      id: attendance.id,
      late_reason: attendance.late_reason ?? '',
    },
  });

  const isLate = attendance.status === 'LATE';
  const hasLateReason = Boolean(attendance.late_reason?.trim());

  const lateReasonButtonClassName = isLate
    ? 'cursor-pointer border-amber-700 bg-amber-100 text-amber-950 hover:bg-amber-200 hover:text-amber-950 focus-visible:ring-2 focus-visible:ring-amber-700'
    : 'cursor-not-allowed border-muted bg-muted text-muted-foreground opacity-70';

  const onSubmit = (values: UpdateLateReasonInput) => {
    mutate(values, {
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
          variant="outline"
          size="sm"
          disabled={!isLate}
          className={lateReasonButtonClassName}
          aria-label={isLate ? (hasLateReason ? '지각 사유 수정하기' : '지각 사유 작성하기') : '지각 상태가 아니므로 지각 사유를 작성할 수 없습니다'}
        >
          {isLate ? (hasLateReason ? '지각사유 수정' : '지각사유 작성') : '지각 아님'}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>지각 사유 작성</DialogTitle>
          <DialogDescription>지각한 사유를 입력해주세요. 관리자가 확인할 수 있습니다.</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="late_reason"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="late_reason">지각 사유</FieldLabel>

                <Textarea {...field} id="late_reason" placeholder="예: 대중교통 지연으로 인해 지각했습니다." aria-invalid={fieldState.invalid} />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? '등록 중...' : '등록 완료'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
