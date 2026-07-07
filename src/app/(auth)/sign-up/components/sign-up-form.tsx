'use client';

import { useForm } from 'react-hook-form';
import { Calendar, Lock, Mail, User, ShieldCheck, Briefcase } from 'lucide-react'; // 아이콘 추가

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import PasswordInput from './password-input';
import { FormSelectField } from './SelectField';
import { departments, positions, roles } from '../../../feature/sign-up/types/role';
import { useCreateEmployee } from '@/app/feature/employees/hooks/useCreateEmployee';
import { EmployeeCreateInput, employeeCreateSchema } from '../../../feature/sign-up/schema/employeeSchema';
import { employeeCreateDefaultValues } from '../../../feature/sign-up/schema/employeeCreateDefaultValue';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInputField } from '@/components/ui/form-input-field';

export function SignUpForm() {
  const { mutate, isPending } = useCreateEmployee();

  const onSubmit = (values: EmployeeCreateInput) => {
    mutate(values);
  };
  const form = useForm<EmployeeCreateInput>({
    resolver: zodResolver(employeeCreateSchema),
    defaultValues: employeeCreateDefaultValues,
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50/50 px-4 py-12">
      <Card className="w-full max-w-2xl bg-white border border-slate-200/80 shadow-xl shadow-slate-100/50 rounded-2xl overflow-hidden">
        <CardHeader className="space-y-2 border-b border-slate-100 p-6 sm:p-8 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold tracking-tight text-slate-800">직원 계정 등록</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">새로운 구성원의 기본 정보 및 시스템 권한을 설정합니다.</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          <form
            id="sign-up-form"
            onSubmit={form.handleSubmit(onSubmit, errors => {
              console.log('검증 실패:', errors);
            })}
            className="space-y-6"
          >
            <FieldGroup className=" gap-x-6 gap-y-5">
              <div className="md:col-span-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider -mb-1">기본 인적 사항</div>
              <FormInputField name="name" control={form.control} label="이름" placeholder="이름을 입력해 주세요" autoComplete="off" icon={User} />
              <div className="md:col-span-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mt-2 -mb-1">인사 및 권한 정보</div>
              <FormInputField name="email" control={form.control} label="이메일" placeholder="example@company.com" autoComplete="email" icon={Mail} />
              <PasswordInput control={form.control} />

              <div className="md:col-span-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mt-2 -mb-1">계정 생성</div>
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

              <div className="md:col-span-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mt-2 -mb-1">계정 보안 설정</div>
              <FormSelectField
                name="role"
                label="시스템 권한 역할"
                control={form.control}
                options={roles.items}
                placeholder="권한 역할을 선택해 주세요"
              />
            </FieldGroup>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
              <p className="text-xs text-center sm:text-left">※ 등록 즉시 해당 사번과 이메일로 대시보드 로그인이 가능해집니다.</p>
              <Button
                type="submit"
                form="sign-up-form"
                disabled={isPending}
                className="w-full sm:w-auto min-w-35 h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl cursor-pointer shadow-sm transition-all duration-200 focus-ring"
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
