'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormSelectField } from '@/app/(auth)/sign-up/components/SelectField';
import { useUpdateAttendance } from '../hooks/useUpdateAttendance';
import { Attendance } from '../type/attendance';
import { UpdateAdminAttendanceInput, updateAdminAttendanceSchema } from '../Schema/updateAttendanceSchema';
import { ATTENDANCE_STATUS_OPTIONS } from '@/config/types/attendanceStatus';

type AttendanceEditDialogProps = {
  attendance: Attendance;
};

export default function AttendanceEditDialog({ attendance }: AttendanceEditDialogProps) {
  const { mutate, isPending } = useUpdateAttendance();
  const [open, setOpen] = useState(false);

  const form = useForm<UpdateAdminAttendanceInput>({
    resolver: zodResolver(updateAdminAttendanceSchema),
    defaultValues: {
      id: attendance.id,
      status: attendance.status,
    },
  });

  const onSubmit = (data: UpdateAdminAttendanceInput) => {
    mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          수정
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-amber-50">
        <DialogHeader>
          <DialogTitle>직원 근태 정보 수정</DialogTitle>
          <DialogDescription>직원 정보를 수정할 수 있습니다.</DialogDescription>
        </DialogHeader>

        <div className="space-y-2 my-4 text-sm text-muted-foreground">
          <p>직원 이름 : {attendance.employee?.name ?? '사원정보 없음'}</p>
          <p>직원 부서 : {attendance.employee?.department ?? '부서정보 없음'}</p>
          <p>직원 직급 : {attendance.employee?.position ?? '직급정보 없음'}</p>
          <p>현재 근태 : {attendance.status}</p>
          <p>지각사유 : {attendance.late_reason || '없음'}</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* options는 대개 고정된 값이거나 공통 컴포넌트용 배열이어야 하므로 수정 시 유의하세요 */}
          <FormSelectField name="status" label="근태정보" control={form.control} options={ATTENDANCE_STATUS_OPTIONS} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? '수정 중...' : '수정 완료'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
