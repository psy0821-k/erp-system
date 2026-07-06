// src/app/feature/dashboard/components/AdminTodoCard.tsx

'use client';

import Link from 'next/link';
import { AlertTriangle, ClockAlert, Laptop, PlaneTakeoff } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { useTodoSummary } from '../hooks/useTodoSummary';

export default function AdminTodoCard() {
  const { data, isLoading } = useTodoSummary();

  const todoItems = [
    {
      title: '휴가 승인 대기',
      description: '승인 또는 반려가 필요한 휴가 신청',
      count: data?.vacationPendingCount ?? 0,
      href: '/employee/vacation',
      icon: PlaneTakeoff,
    },
    {
      title: 'IT 물품 요청',
      description: '지급 검토가 필요한 물품 요청',
      count: data?.assetRequestPendingCount ?? 0,
      href: '/asset/request',
      icon: Laptop,
    },
    {
      title: '고장 신고',
      description: '확인이 필요한 자산 고장 신고',
      count: data?.assetRepairPendingCount ?? 0,
      href: '/asset/report',
      icon: AlertTriangle,
    },
    {
      title: '지각 사유 입력',
      description: '지각 사유 작성이 필요한 근태 기록',
      count: data?.lateReasonRequiredCount ?? 0,
      href: '/employee/attendance',
      icon: ClockAlert,
    },
  ];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">오늘 처리할 업무</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3 flex-1">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-18 w-full rounded-lg" />)
          : todoItems.map(item => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:bg-accent/50 hover:border-accent-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>

                  <strong className="shrink-0 text-2xl font-bold tracking-tight text-foreground tabular-nums ml-4">{item.count}</strong>
                </Link>
              );
            })}
      </CardContent>
    </Card>
  );
}
