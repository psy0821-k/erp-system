import { pendingApprovalData } from '@/app/mock-data/approval';
import { getBadgeStyle } from '@/app/mock-data/badge';
import Link from 'next/link';

const ApprovalBoard = () => {
  return (
    <section className="rounded-xl border p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">승인대기</h2>

        <Link href="#" className="text-sm text-muted-foreground hover:underline">
          전체보기
        </Link>
      </div>
      {pendingApprovalData.map(item => {
        const Icon = item.icon;

        return (
          <article key={item.id} className="flex items-center justify-between rounded-lg mt-1">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-muted p-2">
                <Icon className="h-4 w-4" />
              </div>

              <span className="text-sm">{item.title}</span>
            </div>

            <div className="flex gap-8 ">
              <div className={`badge p-1 text-[14px] rounded-2xl ${getBadgeStyle(item.status)}`}>{item.status}</div>
              <time className="text-xs text-muted-foreground w-14">{item.date}</time>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default ApprovalBoard;
