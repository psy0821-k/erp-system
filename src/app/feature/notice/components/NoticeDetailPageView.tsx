import Link from 'next/link';
import { ArrowLeft, Pencil, Trash2, Pin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function NoticeDetailPageView() {
  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/notice">
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로
          </Link>
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/notice/1/edit">
              <Pencil className="mr-2 h-4 w-4" />
              수정
            </Link>
          </Button>

          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            삭제
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Pin className="h-3 w-3" />
              고정 공지
            </Badge>
            <span className="text-sm text-muted-foreground">관리자</span>
            <span className="text-sm text-muted-foreground">·</span>
            <time className="text-sm text-muted-foreground">2026.06.29</time>
          </div>

          <h1 className="text-2xl font-bold tracking-tight">ERP 시스템 점검 안내</h1>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex h-72 items-center justify-center rounded-lg border bg-muted text-sm text-muted-foreground">대표 이미지 영역</div>

          <article className="prose prose-sm max-w-none">
            <p>안녕하세요. 시스템 관리자입니다.</p>
            <p>ERP 시스템 안정화를 위해 금일 야간 점검이 진행될 예정입니다.</p>
            <p>점검 시간 동안 일부 기능 사용이 제한될 수 있습니다.</p>
          </article>
        </CardContent>
      </Card>
    </main>
  );
}
