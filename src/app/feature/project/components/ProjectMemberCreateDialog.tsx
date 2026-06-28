'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useCreateProjectMember } from '../hooks/useCreateProjectMember';
import { CreateProjectMemberInput, PROJECT_MEMBER_ROLE } from '../types/projectType';
import { useEmployees } from '../../employees/hooks/useEmployees';

interface Props {
  projectId: string;
}

export default function ProjectMemberCreateDialog({ projectId }: Props) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateProjectMember();

  const { data } = useEmployees({
    page: 1,
    keyword: '',
    department: '',
    position: '',
  });

  const employees = data?.employees ?? [];

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateProjectMemberInput>({
    defaultValues: {
      project_id: projectId,
      employee_id: '',
      role: PROJECT_MEMBER_ROLE.FRONTEND,
    },
  });

  const onSubmit = (values: CreateProjectMemberInput) => {
    mutate(values, {
      onSuccess: () => {
        reset({
          project_id: projectId,
          employee_id: '',
          role: PROJECT_MEMBER_ROLE.FRONTEND,
        });
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserPlus className="mr-2 h-4 w-4" />
          참여자 추가
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>참여자 추가</DialogTitle>
          <DialogDescription>프로젝트에 참여할 직원을 추가합니다.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup>
            <Field>
              <FieldLabel>직원</FieldLabel>

              <Controller
                name="employee_id"
                control={control}
                rules={{ required: '직원을 선택해주세요.' }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="직원을 선택해주세요." />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {employees.map(employee => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.name} · {employee.department}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.employee_id && <FieldError>{errors.employee_id.message}</FieldError>}
            </Field>
          </FieldGroup>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              취소
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? '추가 중...' : '추가'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
