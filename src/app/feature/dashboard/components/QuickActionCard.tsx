'use client';

import Link from 'next/link';

import { CalendarPlus, FolderKanban, Laptop, Megaphone } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const actions = [
  {
    title: '휴가 신청',
    description: '연차 및 휴가를 신청합니다.',
    href: '/employee/vacation/create',
    icon: CalendarPlus,
  },
  {
    title: '프로젝트',
    description: '참여 프로젝트를 확인합니다.',
    href: '/project',
    icon: FolderKanban,
  },
  {
    title: '공지사항',
    description: '최신 공지사항을 확인합니다.',
    href: '/notice',
    icon: Megaphone,
  },
  {
    title: 'IT 자산',
    description: '자산 및 요청 현황을 확인합니다.',
    href: '/asset',
    icon: Laptop,
  },
];

export default function QuickActionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>빠른 실행</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map(action => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                aria-label={`${action.title}페이지로 이동`}
                className="flex flex-col items-center justify-center rounded-lg border p-5 transition hover:bg-muted"
              >
                <Icon className="mb-2 h-6 w-6" />

                <span className="text-sm font-medium">{action.title}</span>
                <p className="sr-only">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
