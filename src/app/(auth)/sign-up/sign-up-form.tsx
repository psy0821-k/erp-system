'use client';

import { Controller, useForm } from 'react-hook-form';
import { Calendar, Lock, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import PasswordInput from './password-input';
import { FormSelectField } from './SelectField';
import { departments, positions, roles } from './role';
import { useCreateEmployee } from '@/app/(dashboard)/employee/hooks/useCreateEmployee';
import { EmployeeCreateInput, employeeCreateSchema } from './schema/employeeSchema';
import { employeeCreateDefaultValues } from './schema/employeeCreateDefaultValue';
import { zodResolver } from '@hookform/resolvers/zod';

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
    <section className="flex min-h-screen items-center justify-center bg-muted/40 px-4 p-10">
      <Card className="w-full max-w-md border-none shadow-xl">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Lock className="h-6 w-6" />
          </div>

          <div>
            <CardTitle className="text-2xl font-bold tracking-tight">직원등록</CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">직원의 대시보드 접근을 위하여 회원가입을 진행합니다</p>
          </div>
        </CardHeader>

        <CardContent>
          <form
            id="sign-up-form"
            onSubmit={form.handleSubmit(onSubmit, errors => {
              console.log('검증 실패:', errors);
            })}
          >
            <FieldGroup className="gap-5">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">이메일</FieldLabel>

                    <div className="relative">
                      <Input {...field} id="name" aria-invalid={fieldState.invalid} placeholder="이름을 입력해 주세요" autoComplete="off" />
                    </div>

                    {fieldState.invalid && <FieldError className="text-red-600" errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">이메일</FieldLabel>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        {...field}
                        id="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="example@company.com"
                        autoComplete="email"
                        className="h-11 pl-10"
                      />
                    </div>

                    {fieldState.invalid && <FieldError className="text-red-600" errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="employee_number"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="employee_number">사번</FieldLabel>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        {...field}
                        id="employee_number"
                        aria-invalid={fieldState.invalid}
                        placeholder="EMP-year-number"
                        autoComplete="cc-number"
                        className="h-11 pl-10"
                      />
                    </div>

                    {fieldState.invalid && <FieldError className="text-red-600" errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="hire_date"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="hire_date">입사일</FieldLabel>

                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        {...field}
                        id="hire_date"
                        aria-invalid={fieldState.invalid}
                        autoComplete="bday-year"
                        type="date"
                        className="h-11 pl-10"
                      />
                    </div>

                    {fieldState.invalid && <FieldError className="text-red-600" errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <PasswordInput control={form.control} />
              <FormSelectField name="position" label="직급" control={form.control} options={positions.items} />
              <FormSelectField name="role" label="역할" control={form.control} options={roles.items} />
              <FormSelectField name={departments.value} label={departments.title} control={form.control} options={departments.items} />
            </FieldGroup>
          </form>
          <Button
            type="submit"
            form="sign-up-form"
            disabled={isPending}
            className="w-full h-11 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3.5 px-4 rounded-xl cursor-pointer shadow-md active:translate-y-0.5 shadow-amber-400/20 mt-2"
          >
            {isPending ? '등록 중...' : '직원 등록'}
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <p className="text-center text-sm text-muted-foreground">회원가입 필요시 관리자에게 문의하세요</p>
        </CardFooter>
      </Card>
    </section>
  );
}
