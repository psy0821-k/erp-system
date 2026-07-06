'use client';

import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { UserPlus, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useDebounce } from '@/hooks/useDebounce';
import { useCreateProjectMember } from '../hooks/useCreateProjectMember';
import { CreateProjectMemberInput, PROJECT_MEMBER_ROLE, PROJECT_MEMBER_ROLE_LABEL } from '../types/projectType';
import { useEmployees } from '../../employees/hooks/useEmployees';

interface Props {
  projectId: string;
}

export default function ProjectMemberCreateDialog({ projectId }: Props) {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const debouncedKeyword = useDebounce(keyword, 250);

  const { mutate, isPending } = useCreateProjectMember();

  const { data, isLoading } = useEmployees({
    page: 1,
    keyword: debouncedKeyword,
    department: '',
    position: '',
  });

  const employees = data?.employees ?? [];

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateProjectMemberInput>({
    defaultValues: {
      project_id: projectId,
      employee_id: '',
      role: PROJECT_MEMBER_ROLE.FRONTEND,
    },
  });

  const selectedEmployeeId = useWatch({
    control,
    name: 'employee_id',
  });

  const selectedEmployee = employees.find(employee => employee.id === selectedEmployeeId);

  const onSubmit = (values: CreateProjectMemberInput) => {
    mutate(
      {
        ...values,
        project_id: projectId,
      },
      {
        onSuccess: () => {
          reset({
            project_id: projectId,
            employee_id: '',
            role: PROJECT_MEMBER_ROLE.FRONTEND,
          });
          setKeyword('');
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserPlus className="mr-2 h-4 w-4" />
          참여자 추가
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>참여자 추가</DialogTitle>
          <DialogDescription>프로젝트에 참여할 직원을 검색하고 역할을 지정합니다.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="project-member-search">직원 검색</FieldLabel>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="project-member-search"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  placeholder="이름, 이메일, 부서로 검색"
                  className="pl-9"
                />
              </div>

              <Controller
                name="employee_id"
                control={control}
                rules={{ required: '직원을 선택해주세요.' }}
                render={({ field }) => <input type="hidden" value={field.value} onChange={field.onChange} />}
              />

              <div className="max-h-64 space-y-2 overflow-y-auto rounded-md border p-2">
                {isLoading && <p className="py-6 text-center text-sm text-muted-foreground">직원을 검색하는 중입니다.</p>}

                {!isLoading && employees.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">검색 결과가 없습니다.</p>}

                {!isLoading &&
                  employees.map(employee => {
                    const isSelected = selectedEmployeeId === employee.id;

                    return (
                      <button
                        key={employee.id}
                        type="button"
                        onClick={() => setValue('employee_id', employee.id)}
                        className={`w-full rounded-md border p-3 text-left transition hover:bg-muted ${isSelected ? 'border-primary bg-muted' : ''}`}
                      >
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {employee.department} | {employee.position}
                        </div>
                        <div className="text-xs text-muted-foreground">{employee.email}</div>
                      </button>
                    );
                  })}
              </div>

              {selectedEmployee && (
                <p className="text-sm text-muted-foreground">
                  선택된 직원: <span className="font-medium text-foreground">{selectedEmployee.name}</span>
                </p>
              )}

              {errors.employee_id && <FieldError>{errors.employee_id.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel>프로젝트 역할</FieldLabel>

              <Controller
                name="role"
                control={control}
                rules={{ required: '역할을 선택해주세요.' }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="역할을 선택해주세요." />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {Object.entries(PROJECT_MEMBER_ROLE_LABEL).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.role && <FieldError>{errors.role.message}</FieldError>}
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
