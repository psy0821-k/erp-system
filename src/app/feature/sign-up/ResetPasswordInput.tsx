'use client';

import { useState } from 'react';
import { Control, Controller, FieldPath, FieldValues, useWatch } from 'react-hook-form';
import { CheckCircle2, Eye, EyeOff, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface PasswordInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  autoComplete?: 'new-password' | 'current-password';
}

export default function ResetPasswordInput<TFieldValues extends FieldValues>({
  control,
  name,
  label = '비밀번호',
  placeholder = '비밀번호를 입력해 주세요',
  autoComplete = 'new-password',
}: PasswordInputProps<TFieldValues>) {
  const [viewPassword, setViewPassword] = useState(false);

  const watchedValue = useWatch({
    control,
    name,
    defaultValue: '' as never,
  });

  const password = typeof watchedValue === 'string' ? watchedValue : '';

  const passwordChecks = {
    minLength: password.length >= 8,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialCharacter: /[$@$!%*?&]/.test(password),
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />

            <Input
              {...field}
              value={typeof field.value === 'string' ? field.value : ''}
              id={name}
              aria-invalid={fieldState.invalid}
              type={viewPassword ? 'text' : 'password'}
              placeholder={placeholder}
              autoComplete={autoComplete}
              className="h-11 pl-10 pr-11"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 text-muted-foreground"
              onClick={() => setViewPassword(prev => !prev)}
              aria-label={viewPassword ? '비밀번호 감추기' : '비밀번호 보기'}
              aria-pressed={viewPassword}
            >
              {viewPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
            </Button>
          </div>

          <div className="mt-3 space-y-1 rounded-lg bg-muted/60 p-3 text-sm">
            <PasswordCheck active={passwordChecks.minLength}>8자 이상</PasswordCheck>
            <PasswordCheck
              active={passwordChecks.hasLowercase && passwordChecks.hasUppercase && passwordChecks.hasNumber && passwordChecks.hasSpecialCharacter}
            >
              영문 대,소문자 특수문자, 숫자 포함
            </PasswordCheck>
          </div>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

function PasswordCheck({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <p className={active ? 'flex items-center gap-2 text-emerald-700 dark:text-emerald-400' : 'flex items-center gap-2 text-muted-foreground'}>
      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
      {children}
    </p>
  );
}
