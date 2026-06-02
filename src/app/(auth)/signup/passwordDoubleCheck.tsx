import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';

type PasswordProps = {
  password: string;
  confirmPassword: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PasswordDoubleCheck = ({ password, confirmPassword, onChange }: PasswordProps) => {
  return (
    <div className="space-y-1.5">
      <label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground/90">
        비밀번호 확인
      </label>
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        required
        autoComplete="new-password"
        placeholder="비밀번호를 다시 입력하세요"
        value={password}
        onChange={onChange}
      />

      {password.length > 0 && (
        <p className={`mt-1 text-xs ${password === confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
          {password === confirmPassword ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
        </p>
      )}
    </div>
  );
};

export default PasswordDoubleCheck;
