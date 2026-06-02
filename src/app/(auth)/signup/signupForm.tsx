'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PasswordInput from './password';
import PasswordDoubleCheck from './passwordDoubleCheck';
import SelectDepartment from './selectDepartment';
import { ChangeEvent, SubmitEvent, useState } from 'react';
import { signUpSchema } from '@/lib/zod/auth';
import { createUser } from '@/app/actions/createUser';
import Link from 'next/link';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    department: '',
    terms: false,
  });
  const router = useRouter();

  const handleSelectChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = signUpSchema.safeParse(formData);

    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    try {
      await createUser(result.data);

      alert('등록 완료');
      router.push('/employee');
    } catch (error) {
      alert(error instanceof Error ? error.message : '회원가입 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-semibold text-foreground/90">
          이름
        </label>
        <Input id="name" name="name" type="text" required placeholder="홍길동" value={formData.name} onChange={handleChange} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-semibold text-foreground/90">
          사내 이메일
        </label>
        <div className="flex gap-2">
          <Input id="email" name="email" type="email" required placeholder="example@company.com" value={formData.email} onChange={handleChange} />
          <Button
            type="button"
            className="h-11 mt-2 border border-primary/20 px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 active:bg-primary/10"
          >
            중복확인
          </Button>
        </div>
      </div>

      <PasswordInput value={formData.password} onChange={handleChange} />
      <PasswordDoubleCheck password={formData.confirmPassword} confirmPassword={formData.password} onChange={handleChange} />
      <SelectDepartment value={formData.department} onValueChange={value => handleSelectChange('department', value)} />

      <div className="flex items-center space-x-2 pt-2">
        <Input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          required
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="terms" className="text-sm text-muted-foreground">
          <Link href="#" className="font-medium text-primary hover:underline">
            개인정보 처리방침
          </Link>
          에 동의합니다.
        </label>
      </div>
      <Button
        type="submit"
        className="mt-6 h-12 w-full rounded-xl bg-amber-400 px-4 text-base font-bold text-gray-900 shadow-md shadow-amber-400/20 transition-all hover:bg-amber-500 hover:shadow-lg active:scale-[0.98]"
      >
        회원가입 완료
      </Button>
    </form>
  );
}
