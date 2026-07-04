'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { useForgotPassword } from './hooks/useForgotPassword';
import { ForgotPasswordFormInput, forgotPasswordSchema } from './schema/forgotPasswordSchema';

export default function ForgotPasswordForm() {
  const { mutate, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: ForgotPasswordFormInput) => {
    mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6 rounded-xl border bg-background p-6 shadow-sm">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">비밀번호 재설정</h1>
        <p className="text-sm text-muted-foreground">가입한 이메일을 입력하면 비밀번호 재설정 메일을 보내드립니다.</p>
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">이메일</FieldLabel>
          <Input id="email" type="email" placeholder="name@example.com" {...register('email')} />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>
      </FieldGroup>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? '메일 발송 중...' : '비밀번호 재설정 메일 받기'}
      </Button>
    </form>
  );
}
