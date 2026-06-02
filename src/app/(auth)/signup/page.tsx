import SignupForm from './signupForm';

const SignPage = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12 font-sans md:py-20">
      <div className="w-full max-w-lg rounded-3xl border border-border/50 bg-card p-8 shadow-lg transition-all hover:shadow-xl md:p-12">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">직원 등록</h1>
          <p className="mt-3 text-base text-muted-foreground">사내 ERP 시스템 사용을 위한 계정을 생성하세요.</p>
        </div>
        <SignupForm />
      </div>
    </section>
  );
};

export default SignPage;
