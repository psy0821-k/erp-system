'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { ResetPasswordFormInput, resetPasswordSchema } from './schema/resetPasswordSchema';
import { useResetPassword } from './hooks/useResetPassword';
import ResetPasswordInput from '../sign-up/ResetPasswordInput';
import { cn } from '@/lib/utils';
import { buttonStyle } from '@/app/style/buttonStyle';

export default function ResetPasswordForm() {
  const { mutate: resetPassword, isPending } = useResetPassword();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = (values: ResetPasswordFormInput) => {
    resetPassword({
      password: values.password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">새 비밀번호 설정</h1>

        <p className="text-sm text-slate-500 dark:text-slate-400">새로운 비밀번호를 입력해 주세요.</p>
      </div>

      <FieldGroup>
        <ResetPasswordInput
          control={control}
          name="password"
          label="새 비밀번호"
          placeholder="새 비밀번호를 입력해 주세요"
          autoComplete="new-password"
        />

        <Field data-invalid={Boolean(errors.passwordConfirm)}>
          <FieldLabel htmlFor="passwordConfirm">새 비밀번호 확인</FieldLabel>

          <Input
            id="passwordConfirm"
            type="password"
            placeholder="새 비밀번호를 다시 입력해 주세요"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.passwordConfirm)}
            {...register('passwordConfirm')}
          />

          {errors.passwordConfirm && <FieldError errors={[errors.passwordConfirm]} />}
        </Field>
      </FieldGroup>

      <Button type="submit" className={cn(buttonStyle.base, buttonStyle.create)} disabled={isPending}>
        {isPending ? '변경 중...' : '비밀번호 변경'}
      </Button>
    </form>
  );
}
