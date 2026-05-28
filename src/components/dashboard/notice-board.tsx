import { getBadgeStyle } from '@/app/mock-data/badge';
import { noticesData } from '@/app/mock-data/notice';
import Link from 'next/link';

const NoticeBoard = () => {
  return (
    <section className="rounded-xl border p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">공지사항</h2>

        <Link href="#" className="text-sm text-muted-foreground hover:underline">
          전체보기
        </Link>
      </div>
      {noticesData.map(item => {
        return (
          <article key={item.id} className="flex items-center justify-between rounded-lg mt-1">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-muted ">
                <div className={`badge p-1 text-[14px] w-20 rounded-2xl ${getBadgeStyle(item.type)}`}>{item.type}</div>
              </div>

              <span className="text-sm">{item.title}</span>
            </div>

            <div className="flex gap-8 ">
              <time className="text-xs text-muted-foreground w-14">{item.date}</time>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default NoticeBoard;
