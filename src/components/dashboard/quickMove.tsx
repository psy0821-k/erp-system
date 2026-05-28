// components/dashboard/QuickActionBoard.tsx

import { CalendarPlus, ClipboardCheck, FolderPlus, Laptop } from 'lucide-react';

const quickActions = [
  {
    id: 1,
    title: '일정 추가',
    icon: CalendarPlus,
  },
  {
    id: 2,
    title: '승인 요청',
    icon: ClipboardCheck,
  },
  {
    id: 3,
    title: '프로젝트 생성',
    icon: FolderPlus,
  },
  {
    id: 4,
    title: '자산 등록',
    icon: Laptop,
  },
];

const QuickMoveBoard = () => {
  return (
    <section className="rounded-xl border p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">빠른 작업</h2>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {quickActions.map(action => {
          const Icon = action.icon;

          return (
            <button
              key={action.id}
              className="
                flex flex-col items-center justify-center
                rounded-xl border bg-card p-5
                transition-all duration-200
                hover:-translate-y-1
                hover:border-primary
                hover:shadow-md
              "
            >
              <div className="rounded-full bg-muted p-3">
                <Icon className="h-5 w-5" />
              </div>

              <span className="mt-3 text-sm font-medium">{action.title}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default QuickMoveBoard;
