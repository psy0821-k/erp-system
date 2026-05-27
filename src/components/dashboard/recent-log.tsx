import { recentLogData } from '@/app/mock-data/recentLog';
import Link from 'next/link';

const RecentLog = () => {
  return (
    <section className="rounded-xl border p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">최근 활동 로그</h2>

        <Link href="#" className="text-sm text-muted-foreground hover:underline">
          전체보기
        </Link>
      </div>

      <div className="mt-4">
        {recentLogData.map(log => {
          const Icon = log.icon;

          return (
            <article key={log.id} className="flex items-center justify-between rounded-lg p-3">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-muted p-2">
                  <Icon className="h-4 w-4" />
                </div>

                <span className="text-sm">{log.message}</span>
              </div>

              <time className="text-xs text-muted-foreground">{log.date}</time>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RecentLog;
