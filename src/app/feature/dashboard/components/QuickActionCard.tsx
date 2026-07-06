'use client';

import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { vacationActions } from '../types/dashBoardType';

export default function QuickActionCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">빠른 실행</CardTitle>
      </CardHeader>

      <CardContent className="pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
          {vacationActions.map(action => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                aria-label={`${action.title} 페이지로 이동`}
                className="flex flex-col items-center justify-center text-center rounded-xl border border-border bg-card p-4 transition-all hover:bg-accent/60 hover:border-accent-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <div className="mb-2 flex p-2.5 rounded-lg bg-muted text-muted-foreground">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                <span className="text-sm font-medium text-foreground tracking-tight whitespace-nowrap">{action.title}</span>

                {action.description && <p className="sr-only">{action.description}</p>}
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
