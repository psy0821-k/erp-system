'use client';

import { useForm } from 'react-hook-form';
import { Briefcase, Calendar, Mail, ShieldCheck, User } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { FormInputField } from '@/components/ui/form-input-field';

import PasswordInput from './password-input';
import { FormSelectField } from './SelectField';

import { departments, positions, roles } from '../../../feature/sign-up/types/role';
import { useCreateEmployee } from '@/app/feature/employees/hooks/useCreateEmployee';
import { EmployeeCreateInput, employeeCreateSchema } from '../../../feature/sign-up/schema/employeeSchema';
import { employeeCreateDefaultValues } from '../../../feature/sign-up/schema/employeeCreateDefaultValue';

import { buttonStyle } from '@/app/style/buttonStyle';
import { cn } from '@/lib/utils';

export function SignUpForm() {
  const { mutate: createEmployee, isPending } = useCreateEmployee();

  const form = useForm<EmployeeCreateInput>({
    resolver: zodResolver(employeeCreateSchema),
    defaultValues: employeeCreateDefaultValues,
  });

  const onSubmit = (values: EmployeeCreateInput) => {
    createEmployee(values);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50/50 px-4 py-12 dark:bg-slate-950">
      <Card className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <CardHeader className="space-y-2 border-b border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/70 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </div>

            <div>
              <CardTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">직원 계정 등록</CardTitle>

              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">새로운 구성원의 기본 정보 및 시스템 권한을 설정합니다.</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <FieldGroup className="gap-x-6 gap-y-5">
              <div className="-mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 md:col-span-2">
                기본 인적 사항
              </div>

              <FormInputField name="name" control={form.control} label="이름" placeholder="이름을 입력해 주세요" autoComplete="off" icon={User} />

              <div className="-mb-1 mt-2 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 md:col-span-2">
                인사 및 권한 정보
              </div>

              <FormInputField name="email" control={form.control} label="이메일" placeholder="example@company.com" autoComplete="email" icon={Mail} />

              <PasswordInput control={form.control} />

              <div className="-mb-1 mt-2 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 md:col-span-2">
                계정 생성
              </div>

              <FormInputField
                name="employee_number"
                control={form.control}
                label="사번"
                placeholder="EMP-year-number"
                autoComplete="off"
                icon={Briefcase}
              />

              <FormInputField name="hire_date" control={form.control} label="입사일" type="date" autoComplete="off" icon={Calendar} />

              <FormSelectField name="position" label="직급" control={form.control} options={positions.items} placeholder="직급을 선택해 주세요" />

              <FormSelectField
                name={departments.value}
                label={departments.title}
                control={form.control}
                options={departments.items}
                placeholder="부서를 선택해 주세요"
              />

              <div className="-mb-1 mt-2 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 md:col-span-2">
                계정 보안 설정
              </div>

              <FormSelectField
                name="role"
                label="시스템 권한 역할"
                control={form.control}
                options={roles.items}
                placeholder="권한 역할을 선택해 주세요"
              />
            </FieldGroup>

            <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-center text-xs text-slate-500 dark:text-slate-400 sm:text-left">
                ※ 등록 즉시 해당 사번과 이메일로 대시보드 로그인이 가능해집니다.
              </p>

              <Button
                type="submit"
                form="sign-up-form"
                disabled={isPending}
                className={cn(buttonStyle.base, buttonStyle.create, 'h-11 w-full min-w-35 rounded-xl px-6 font-semibold sm:w-auto')}
              >
                {isPending ? '등록 중...' : '직원 등록 완료'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
