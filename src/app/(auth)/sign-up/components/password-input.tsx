'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Eye, EyeClosed, Lock } from 'lucide-react';
import { useState } from 'react';
import { Control, Controller, useWatch } from 'react-hook-form';
import { EmployeeCreateInput } from '../../../feature/sign-up/schema/employeeSchema';

type PasswordInputProps = {
  control: Control<EmployeeCreateInput>;
};

export default function PasswordInput({ control }: PasswordInputProps) {
  const [viewPassword, setViewPassword] = useState(false);

  const password = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  });

  const passwordChecks = {
    minLength: password.length >= 8,
    hasCombination: /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[$@$!%*?&]/.test(password),
  };

  return (
    <Controller
      name="password"
      control={control}
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
              autoComplete="new-password"
              className="h-11 pl-10 pr-10"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground"
              onClick={() => setViewPassword(prev => !prev)}
              aria-label={viewPassword ? '패스워드 감추기' : '패스워드 보기'}
            >
              {viewPassword ? <Eye className="h-4 w-4" /> : <EyeClosed className="h-4 w-4" />}
            </Button>
          </div>

          <div className="mt-3 rounded-lg bg-muted/60 p-3 text-sm">
            <PasswordCheck active={passwordChecks.minLength}>8자 이상</PasswordCheck>
            <PasswordCheck active={passwordChecks.hasCombination}>소문자, 대문자, 숫자, 특수문자 포함</PasswordCheck>
          </div>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
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
