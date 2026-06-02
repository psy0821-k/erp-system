import { Input } from '@/components/ui/input';
import { passwordRules } from '@/lib/auth/passwordRules';
import { ChangeEvent } from 'react';

type PasswordProps = {
  value: string;
  type?: 'password' | 'text';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PasswordInput = ({ value, onChange }: PasswordProps) => {
  const isPasswordValid = value.length > 0 && passwordRules.every(rule => rule.validate(value));
  return (
    <div className="space-y-1.5">
      <label htmlFor="password">비밀번호</label>

      <Input id="password" name="password" type="password" value={value} onChange={onChange} placeholder="비밀번호를 입력해주세요" />

      <p className={`mt-1 pl-1 text-xs font-medium ${value.length > 0 ? (isPasswordValid ? 'text-green-500' : 'text-red-500') : 'text-gray-700'}`}>
        비밀번호는 8자 이상, 대/소문자, 숫자, 특수문자를 포함해야 합니다
      </p>
    </div>
  );
};

export default PasswordInput;
