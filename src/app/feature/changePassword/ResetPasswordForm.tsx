'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { ResetPasswordFormInput, resetPasswordSchema } from './schema/resetPasswordSchema';
import { useResetPassword } from './hooks/useResetPassword';

export default function ResetPasswordForm() {
  const { mutate, isPending } = useResetPassword();

  const {
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
    mutate({
      password: values.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6 rounded-xl border bg-background p-6 shadow-sm">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">새 비밀번호 설정</h1>
        <p className="text-sm text-muted-foreground">새로운 비밀번호를 입력해주세요.</p>
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="password">새 비밀번호</FieldLabel>
          <Input id="password" type="password" placeholder="8자 이상 입력" {...register('password')} />
          {errors.password && <FieldError>{errors.password.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="passwordConfirm">새 비밀번호 확인</FieldLabel>
          <Input id="passwordConfirm" type="password" placeholder="비밀번호 재입력" {...register('passwordConfirm')} />
          {errors.passwordConfirm && <FieldError>{errors.passwordConfirm.message}</FieldError>}
        </Field>
      </FieldGroup>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? '변경 중...' : '비밀번호 변경'}
      </Button>
    </form>
  );
}
