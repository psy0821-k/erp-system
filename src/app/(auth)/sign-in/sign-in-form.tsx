'use client';

import { createClient } from '@/lib/client';
import { zodResolver } from '@hookform/resolvers/zod';

import { Controller, useForm, useWatch } from 'react-hook-form';
import { useState } from 'react';
import * as z from 'zod';
import { CheckCircle2, Eye, EyeClosed, Lock, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.email('이메일 형식에 맞게 작성해 주세요'),
  password: z.string().min(8, '비밀번호는 8자 이상 입력해 주세요'),
});

export function SignInForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [isWrong, setIsWrong] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        form.resetField('password');
        form.setFocus('password');
        setIsWrong(true);
        return;
      }

      if (data) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      throw new Error(`${error}`);
    }
  };

  const [viewPassword, setViewPassword] = useState(false);
  const password = useWatch({
    control: form.control,
    name: 'password',
    defaultValue: '',
  });

  const passwordChecks = {
    minLength: password.length >= 8,
    hasCombination: /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[$@$!%*?&]/.test(password),
  };

  function handleToggleView() {
    setViewPassword(prev => !prev);
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-muted/40 px-4 p-10">
      <h2 className="hidden">로그인</h2>
      <Card className="w-full max-w-md border-none shadow-xl">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Lock className="h-6 w-6" />
          </div>

          <div>
            <CardTitle className="text-2xl font-bold tracking-tight">로그인</CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">ERP 시스템에 접속하려면 계정 정보를 입력해 주세요.</p>
          </div>
        </CardHeader>

        <CardContent>
          <form action="" id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-5">
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
                      <PasswordCheck active={passwordChecks.hasCombination}>소문자, 대문자, 숫자 특수문자 포함</PasswordCheck>
                    </div>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <p className={isWrong ? 'text-red-700 text-center' : 'hidden'}>이메일 혹은 패스워드가 틀렸습니다</p>

        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            form="sign-in-form"
            className="w-full h-11 bg-white hover:bg-gray-100 text-gray-900 font-bold py-3.5 px-4 rounded-xl cursor-pointer shadow-md active:translate-y-0.5 shadow-white/20 mt-2"
          >
            로그인
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
