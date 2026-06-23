'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { useState } from 'react';
import { useUpdateEmployee } from '../hooks/useUpdateEmployee';
import { UpdateEmployeeInput } from '../types/employeeType';
import { updateEmployeeSchema } from '@/app/feature/sign-up/schema/updateEmployeeSchema';

import { Controller, useForm } from 'react-hook-form';
import { Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { FormSelectField } from '@/app/(auth)/sign-up/components/SelectField';
import { roles } from '@/app/feature/sign-up/types/role';
import { DEPARTMENT_TYPE_OPTIONS } from '@/config/types/department';
import { POSITION_OPTIONS } from '@/config/types/position';

type EmployeeEditDialogProps = {
  employee: {
    id: string;
    name: string;
    department: string;
    position: string;
    role: string;
    status: string;
    hire_date: string;
    authority_level: number;
  };
};

export default function EmployeeEditDialog({ employee }: EmployeeEditDialogProps) {
  const { mutate, isPending } = useUpdateEmployee();
  const [open, setOpen] = useState(false);

  const form = useForm<UpdateEmployeeInput>({
    resolver: zodResolver(updateEmployeeSchema),
    defaultValues: {
      id: employee.id,
      name: employee.name,
      department: employee.department,
      position: employee.position,
      role: employee.role,
      status: employee.status,
      hire_date: employee.hire_date,
      authority_level: employee.authority_level,
    },
  });

  const onSubmit = (values: UpdateEmployeeInput) => {
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
        <Button type="button" variant="outline" size="sm">
          수정
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-amber-50">
        <DialogHeader>
          <DialogTitle>직원 정보 수정</DialogTitle>
          <DialogDescription>직원 정보를 수정할 수 있습니다.</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-name">이름</FieldLabel>

                <Input {...field} id="edit-name" placeholder="이름을 입력해 주세요" aria-invalid={fieldState.invalid} />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="hire_date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-hire-date">입사일</FieldLabel>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input {...field} id="edit-hire-date" type="date" className="pl-10" aria-invalid={fieldState.invalid} />
                </div>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <FormSelectField name="department" label="부서" control={form.control} options={DEPARTMENT_TYPE_OPTIONS} />

          <FormSelectField name="position" label="직급" control={form.control} options={POSITION_OPTIONS} />

          <FormSelectField name="role" label="역할" control={form.control} options={roles.items} />

          <FormSelectField
            name="status"
            label="재직 상태"
            control={form.control}
            options={[
              { title: '재직', value: 'ACTIVE' },
              { title: '휴직', value: 'LEAVE' },
              { title: '퇴사', value: 'RESIGNED' },
            ]}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? '수정 중...' : '수정 완료'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
