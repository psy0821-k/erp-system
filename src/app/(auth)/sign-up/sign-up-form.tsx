'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { useState } from 'react';
import * as z from 'zod';
import { CheckCircle2, Eye, EyeClosed, Lock, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  name: z.string(),
  department: z.string().min(1),
  position: z.string(),
  role: z.string(),
  status: z.string(),
  email: z.email('이메일 형식에 맞게 작성해 주세요'),
  password: z.string().min(8, '비밀번호는 8자 이상 입력해 주세요'),
  must_change_password: z.boolean(),
});

export function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: 'Password123!',
      department: '',
      position: '',
      role: 'EMPLOYEE',
      status: 'ACTIVE',
      must_change_password: true,
    },
  });
  const [viewPassword, setViewPassword] = useState(false);
  const password = useWatch({
    control: form.control,
    name: 'password',
    defaultValue: '',
  });

  const passwordChecks = {
    minLength: password.length >= 8,
    hasCombination: /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password),
  };

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast('로그인 시도', {
      description: JSON.stringify(data, null, 2),
      position: 'bottom-right',
    });
  }

  function handleToggleView() {
    const toggleState = setViewPassword(!viewPassword);
    return toggleState;
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
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
          <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">비밀번호</FieldLabel>

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        {...field}
                        id="password"
                        aria-invalid={fieldState.invalid}
                        type={viewPassword ? 'text' : 'password'}
                        placeholder="비밀번호를 입력해 주세요"
                        autoComplete="current-password"
                        className="h-11 pl-10"
                      />

                      <Button
                        type="button"
                        className="absolute right-3 h-4 w-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                        onClick={handleToggleView}
                        aria-label={viewPassword ? '패스워드 감추기' : '패스워드 보기'}
                      >
                        {viewPassword ? <Eye /> : <EyeClosed />}
                      </Button>
                    </div>

                    <div className="mt-3 rounded-lg bg-muted/60 p-3 text-sm">
                      <PasswordCheck active={passwordChecks.minLength}>8자 이상</PasswordCheck>
                      <PasswordCheck active={passwordChecks.hasCombination}>소문자, 대문자, 숫자 포함</PasswordCheck>
                    </div>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="department"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>부서</FieldLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="부서를 선택해 주세요" />
                      </SelectTrigger>
                      <SelectContent position="popper" className="bg-white">
                        <SelectItem className="hover:bg-slate-200 cursor-pointer" value="FRONTEND">
                          프론트엔드팀
                        </SelectItem>
                        <SelectItem className="hover:bg-slate-200 cursor-pointer" value="BACKEND">
                          백엔드팀
                        </SelectItem>
                        <SelectItem className="hover:bg-slate-200 cursor-pointer" value="DESIGN">
                          디자인팀
                        </SelectItem>
                        <SelectItem className="hover:bg-slate-200 cursor-pointer" value="HR">
                          인사팀
                        </SelectItem>
                        <SelectItem className="hover:bg-slate-200 cursor-pointer" value="PLANNING">
                          기획팀
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="position"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>직급</FieldLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="직급을 선택해 주세요" />
                      </SelectTrigger>
                      <SelectContent position="popper" className="bg-white">
                        <SelectItem className="hover:bg-slate-200 cursor-pointer" value="STAFF">
                          사원
                        </SelectItem>
                        <SelectItem className="hover:bg-slate-200 cursor-pointer" value="ASSISTANT_MANAGER">
                          대리
                        </SelectItem>
                        <SelectItem className="hover:bg-slate-200 cursor-pointer" value="MANAGER">
                          과장
                        </SelectItem>
                        <SelectItem className="hover:bg-slate-200 cursor-pointer" value="TEAM_LEADER">
                          팀장
                        </SelectItem>
                        <SelectItem className="hover:bg-slate-200 cursor-pointer" value="DIRECTOR">
                          관리자
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="role"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>권한</FieldLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="권한을 선택해 주세요" />
                      </SelectTrigger>
                      <SelectContent position="popper" className="bg-white">
                        <SelectItem className="hover:bg-slate-200 cursor-pointer" value="ADMIN">
                          최고 관리자
                        </SelectItem>
                        <SelectItem className="hover:bg-slate-200 cursor-pointer" value="HR_MANAGER">
                          인사 관리자
                        </SelectItem>
                        <SelectItem className="hover:bg-slate-200 cursor-pointer" value="ASSET_MANAGER">
                          IT 자산 관리자
                        </SelectItem>
                        <SelectItem className="hover:bg-slate-200 cursor-pointer" value="EMPLOYEE">
                          일반 직원
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>계정 상태</FieldLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="계정 상태를 선택해 주세요" />
                      </SelectTrigger>
                      <SelectContent position="popper" className="bg-white">
                        <SelectItem className="hover:bg-slate-200 cursor-pointer" value="ACTIVE">
                          활성
                        </SelectItem>
                        <SelectItem className="hover:bg-slate-200 cursor-pointer" value="INACTIVE">
                          비활성
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full h-11 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3.5 px-4 rounded-xl cursor-pointer shadow-md active:translate-y-0.5 shadow-amber-400/20 mt-2"
          >
            직원 등록
          </Button>

          <p className="text-center text-sm text-muted-foreground">회원가입 필요시 관리자에게 문의하세요</p>
        </CardFooter>
      </Card>
    </section>
  );
}

function PasswordCheck({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <p className={`flex items-center gap-2 ${active ? 'text-green-600' : 'text-muted-foreground'}`}>
      <CheckCircle2 className="h-4 w-4" />
      {children}
    </p>
  );
}
