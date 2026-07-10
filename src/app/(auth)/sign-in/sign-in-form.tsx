'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

import { createClient } from '@/lib/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  email: z.email('이메일 형식에 맞게 작성해 주세요.'),
  password: z.string().min(8, '비밀번호는 8자 이상 입력해 주세요.'),
});

type SignInFormValues = z.infer<typeof formSchema>;

export function SignInForm() {
  const router = useRouter();
  const [viewPassword, setViewPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    setLoginError('');

    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        form.resetField('password');
        form.setFocus('password');
        setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.');
        return;
      }

      router.replace('/');
      router.refresh();
    } catch {
      setLoginError('로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <section className="w-full max-w-md" aria-labelledby="sign-in-title">
        <Card className="border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              <Lock className="h-6 w-6" aria-hidden="true" />
            </div>

            <div>
              <CardTitle id="sign-in-title" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                로그인
              </CardTitle>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">ERP 시스템에 접속하려면 계정 정보를 입력해 주세요.</p>
            </div>
          </CardHeader>

          <CardContent>
            <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <FieldGroup className="gap-5">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email">이메일</FieldLabel>

                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" aria-hidden="true" />

                        <Input
                          {...field}
                          id="email"
                          type="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="example@company.com"
                          autoComplete="email"
                          className="h-11 border-slate-300 bg-white pl-10 text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                        />
                      </div>

                      {fieldState.invalid && <FieldError className="text-red-700 dark:text-red-400" errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex items-center justify-between gap-4">
                        <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                      </div>

                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" aria-hidden="true" />

                        <Input
                          {...field}
                          id="password"
                          aria-invalid={fieldState.invalid}
                          type={viewPassword ? 'text' : 'password'}
                          placeholder="비밀번호를 입력해 주세요"
                          autoComplete="current-password"
                          className="h-11 border-slate-300 bg-white pl-10 pr-11 text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                        />

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                          onClick={() => setViewPassword(prev => !prev)}
                          aria-label={viewPassword ? '비밀번호 감추기' : '비밀번호 보기'}
                          aria-pressed={viewPassword}
                        >
                          {viewPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                        </Button>
                      </div>

                      {fieldState.invalid && <FieldError className="text-red-700 dark:text-red-400" errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            {loginError && (
              <p
                role="alert"
                aria-live="polite"
                className="w-full rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-center text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950/60 dark:text-red-300"
              >
                {loginError}
              </p>
            )}

            <Button
              type="submit"
              form="sign-in-form"
              disabled={isSubmitting}
              className={cn(
                'h-11 w-full cursor-pointer rounded-xl bg-indigo-700 font-bold text-white',
                'hover:bg-indigo-800',
                'focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2',
                'dark:bg-indigo-600 dark:hover:bg-indigo-700',
                'dark:focus-visible:ring-slate-100 dark:focus-visible:ring-offset-slate-900',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            >
              {isSubmitting ? '로그인 중...' : '로그인'}
            </Button>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">계정 생성이 필요한 경우 관리자에게 문의하세요.</p>
            <Link
              href="/forgot-password"
              className="rounded-sm text-sm font-medium text-indigo-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 dark:text-indigo-300 dark:focus-visible:ring-slate-100 dark:focus-visible:ring-offset-slate-900"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
