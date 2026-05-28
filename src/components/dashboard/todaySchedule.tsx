import { todayScheduleData } from '@/app/mock-data/todaySchedule';

const TodaySchedule = () => {
  return (
    <section className="rounded-xl border p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">오늘 일정</h2>

        <button className="text-sm text-muted-foreground hover:underline">전체보기</button>
      </div>

      <div className="mt-6 space-y-4">
        {todayScheduleData.map(schedule => (
          <article key={schedule.id} className="flex items-center gap-4 rounded-lg border p-3">
            <time className="min-w-14 text-sm font-semibold">{schedule.time}</time>

            <span className="text-sm text-muted-foreground">{schedule.title}</span>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TodaySchedule;
