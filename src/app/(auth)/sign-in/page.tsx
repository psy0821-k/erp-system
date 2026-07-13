import { SignInForm } from './sign-in-form';

const page = () => {
  return (
    <main className="flex flex-col gap-6 min-h-screen items-center justify-center bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <SignInForm />

      <div className="bg-slate-200 w-full max-w-md p-4">
        <p className="text-2xl font-bold mb-4">테스트용 아이디</p>
        <p>일반 직원: employee@company.com</p>
        <p>인사과: hr@company.com</p>
        <p>팀장: teamleader@company.com</p>
        <p>관리자: admin@company.com</p>
        <p className="text-2xl font-bold mb-4 mt-4">테스트용 공통 패스워드</p>
        <p>공용 패스워드 : Password123!</p>
      </div>
    </main>
  );
};

export default page;
