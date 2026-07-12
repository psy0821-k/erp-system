import Link from 'next/link';
import { ArrowRight, ShieldX } from 'lucide-react';

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="w-full max-w-md space-y-6 text-center" aria-labelledby="forbidden-title">
        <ShieldX className="mx-auto size-12 text-muted-foreground" aria-hidden="true" />

        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground">오류 403</p>

          <h1 id="forbidden-title" className="text-2xl font-bold tracking-tight">
            접근 권한이 없습니다
          </h1>

          <p className="text-muted-foreground">현재 계정으로는 이 페이지를 이용할 수 없습니다.</p>
        </div>

        <Link href="/" className="inline-flex items-center gap-2 font-medium underline underline-offset-4 hover:text-primary">
          대시보드로 이동
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
