'use client';

import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import PasswordInput from '../signup/password';
import { createClient } from '@/lib/client';

const LoginPage = () => {
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setErrorMessage('');

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setErrorMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMessage('이메일 또는 비밀번호를 확인해주세요.');
      return;
    }

    router.push('/');
  };

  return (
    <main className="flex min-h-screen bg-gray-50">
      <div className="hidden w-[40%] flex-col items-center justify-center bg-amber-300 px-8 md:flex">
        <p className="text-center text-8xl font-black leading-none tracking-tight text-gray-900">
          PSY
          <span className="mt-2 block text-8xl font-bold text-gray-900">COMPANY</span>
        </p>
      </div>

      <section className="flex min-h-screen w-full flex-col items-center justify-center p-4 md:w-[60%]">
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50">
          <h2 className="mb-2 text-center text-3xl font-extrabold text-gray-800">로그인</h2>
          <p className="mb-8 text-center text-sm text-gray-400">서비스 이용을 위해 로그인해주세요.</p>

          <div className="mb-8 flex justify-center">
            <Image
              src="/no-profile.svg"
              alt="psy컴패니"
              width={70}
              height={70}
              className="rounded-full border border-gray-200 bg-gray-100 p-1 shadow-inner"
            />
          </div>

          <form
            onSubmit={async e => {
              e.preventDefault();
              await handleLogin();
            }}
            className="space-y-5"
          >
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                이메일
              </label>

              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 placeholder:text-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <div className="relative">
                <PasswordInput value={formData.password} onChange={handleChange} type={showPassword ? 'text' : 'password'} />

                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 -translate-1/3 text-gray-400 transition-colors hover:text-gray-600"
                >
                  {showPassword ? (
                    <Eye aria-label="패스워드 감추기" className="h-5 w-5" />
                  ) : (
                    <EyeOff aria-label="패스워드 보기" className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center pt-1">
              <input type="checkbox" id="auth_continue" className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-amber-400" />

              <label htmlFor="auth_continue" className="ml-2 cursor-pointer select-none text-sm font-medium text-gray-600">
                로그인 유지하기
              </label>
            </div>

            {errorMessage && <p className="text-xs font-medium text-red-500">{errorMessage}</p>}

            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-amber-400 px-4 py-3.5 font-bold text-gray-900 shadow-md shadow-amber-400/20 transition-all hover:bg-amber-500 active:scale-[0.99]"
            >
              로그인
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">계정이 없으신가요? 관리자에게 요청하세요</div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
