'use client';
import { Eye, EyeOff, Lock } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen bg-gray-50">
      <div className="hidden md:flex flex-col justify-center items-center bg-amber-300 w-[40%] px-8">
        <p className="font-black text-6xl text-gray-900 tracking-tight text-center leading-none">
          PSY
          <span className="block text-4xl mt-2 font-bold text-amber-900">COMPANY</span>
        </p>
      </div>

      <section className="flex flex-col justify-center items-center w-full md:w-[60%] p-4 min-h-screen">
        <div className="w-full max-w-md bg-white border border-gray-100 p-8 rounded-2xl shadow-xl shadow-gray-200/50">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">로그인</h2>
          <p className="text-center text-sm text-gray-400 mb-8">서비스 이용을 위해 로그인해주세요.</p>

          <div className="flex justify-center mb-8">
            <Image
              src={'/no-profile.svg'}
              alt="psy컴패니"
              width={70}
              height={70}
              className="rounded-full bg-gray-100 p-1 border border-gray-200 shadow-inner"
            />
          </div>

          <form onSubmit={e => e.preventDefault()} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="user_id" className="block text-sm font-semibold text-gray-700">
                이메일
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="user_id"
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all placeholder:text-gray-300"
                />
              </div>
              <p className="text-xs text-red-500 font-medium pl-1 mt-1">이메일이 틀렸습니다. 다시 한번 확인해보세요.</p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-3/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all placeholder:text-gray-300"
                  required
                />
                <p className="text-xs text-red-500 font-medium pl-1 mt-1">비밀번호가 틀렸습니다. 다시 한번 확인해보세요.</p>
                <p className="text-xs text-gray-600 font-medium pl-1 mt-1">비밀번호는 대문자, 소문자, 특수문자를 갖고 있어야 합니다</p>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-0 translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff aria-label="패스워드 감추기" className="w-5 h-5" />
                  ) : (
                    <Eye aria-label="패스워드 보기" className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center pt-1">
              <input
                type="checkbox"
                id="auth_continue"
                className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-400 accent-amber-400 cursor-pointer"
              />
              <label htmlFor="auth_continue" className="ml-2 text-sm font-medium text-gray-600 cursor-pointer select-none">
                로그인 유지하기
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3.5 px-4 rounded-xl shadow-md shadow-amber-400/20 active:scale-[0.99] transition-all mt-4"
            >
              로그인
            </button>
          </form>
          <p className="mt-4">
            회원가입이 필요한 경우 <strong>관리자</strong>에게 문의해주세요
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
