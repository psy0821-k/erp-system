'use client';

import Link from 'next/link';
import { Megaphone, Pin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useDashboardNotices } from '../../notice/hooks/useDashboardNotices';

const formatDate = (date?: string | null) => {
  if (!date) return '-';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return '-';

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(parsedDate);
};

export default function NoticeSummaryCard() {
  const { data: notices = [], isLoading, isError } = useDashboardNotices();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-5 w-5" aria-hidden="true" />
          공지사항
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">공지사항을 불러오는 중입니다.</p>
        ) : isError ? (
          <p className="text-sm text-destructive">공지사항을 불러오지 못했습니다.</p>
        ) : notices.length > 0 ? (
          <div className="space-y-3">
            {notices.map(notice => (
              <Link key={notice.id} href={`/notice/${notice.id}`} className="block rounded-md border p-3 hover:bg-muted/50">
                <div className="flex items-center justify-between gap-3">
                  <p className="line-clamp-1 font-medium">{notice.title}</p>

                  {notice.is_pinned && (
                    <Badge variant="secondary" className="gap-1">
                      <Pin className="h-3 w-3" aria-hidden="true" />
                      고정
                    </Badge>
                  )}
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {notice.author?.name ?? '관리자'} · {formatDate(notice.created_at)}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex min-h-32 items-center justify-center text-center">
            <p className="text-sm text-muted-foreground">등록된 공지사항이 없습니다.</p>
          </div>
        )}

        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href="/notice">공지사항 보기</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
