'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { FormSelectField } from '@/app/(auth)/sign-up/components/SelectField';
import { useUpdateAttendance } from '../hooks/useUpdateAttendance';
import { Attendance } from '../type/attendance';
import { UpdateAdminAttendanceInput, updateAdminAttendanceSchema } from '../Schema/updateAttendanceSchema';
import { ATTENDANCE_STATUS_LABEL, ATTENDANCE_STATUS_OPTIONS } from '@/config/types/attendanceStatus';

import { buttonStyle } from '@/app/style/buttonStyle';
import { textStyle } from '@/app/style/textStyle';
import { cn } from '@/lib/utils';

type AttendanceEditDialogProps = {
  attendance: Attendance;
};

export default function AttendanceEditDialog({ attendance }: AttendanceEditDialogProps) {
  const { mutate: updateAttendance, isPending } = useUpdateAttendance();
  const [open, setOpen] = useState(false);

  const form = useForm<UpdateAdminAttendanceInput>({
    resolver: zodResolver(updateAdminAttendanceSchema),
    defaultValues: {
      id: attendance.id,
      status: attendance.status,
    },
  });

  const onSubmit = (data: UpdateAdminAttendanceInput) => {
    updateAttendance(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className={cn(buttonStyle.base, buttonStyle.edit)}>
          수정
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>직원 근태 정보 수정</DialogTitle>
          <DialogDescription>직원의 근태 상태를 확인하고 수정할 수 있습니다.</DialogDescription>
        </DialogHeader>

        <div className="my-2 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
          <dl className="grid grid-cols-[88px_1fr] gap-x-3 gap-y-3 text-sm">
            <dt className={textStyle.muted}>직원 이름</dt>
            <dd className={cn('font-medium', textStyle.primary)}>{attendance.employee?.name ?? '사원 정보 없음'}</dd>

            <dt className={textStyle.muted}>직원 부서</dt>
            <dd className={textStyle.secondary}>{attendance.employee?.department ?? '부서 정보 없음'}</dd>

            <dt className={textStyle.muted}>직원 직급</dt>
            <dd className={textStyle.secondary}>{attendance.employee?.position ?? '직급 정보 없음'}</dd>

            <dt className={textStyle.muted}>현재 근태</dt>
            <dd className={textStyle.secondary}>{ATTENDANCE_STATUS_LABEL[attendance.status]}</dd>

            <dt className={textStyle.muted}>지각 사유</dt>
            <dd className={cn('`wrap-break-word', textStyle.secondary)}>{attendance.late_reason || '없음'}</dd>
          </dl>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormSelectField name="status" label="근태 정보" control={form.control} options={ATTENDANCE_STATUS_OPTIONS} />

          <DialogFooter className="mt-2">
            <Button type="submit" className={cn(buttonStyle.base, buttonStyle.submit)} disabled={isPending}>
              {isPending ? '저장 중...' : '수정 완료'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
