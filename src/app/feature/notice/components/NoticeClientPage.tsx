'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Megaphone, Plus, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import NoticeTable from './NoticeTable';
import { useNotices } from '../hooks/useNotices';

export default function NoticeClientPage() {
  const searchParams = useSearchParams();

  const params = {
    page: searchParams.get('page') || '1',
    keyword: searchParams.get('keyword') || '',
  };

  const { data, isLoading } = useNotices(params);

  return (
    <main className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Megaphone className="h-6 w-6" />
            <h1 className="text-2xl font-bold tracking-tight">공지사항</h1>
          </div>
          <p className="text-sm text-muted-foreground">사내 주요 공지와 업무 안내를 확인합니다.</p>
        </div>

        <Button asChild>
          <Link href="/notice/create">
            <Plus className="mr-2 h-4 w-4" />
            공지 작성
          </Link>
        </Button>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">공지사항 목록</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="공지 제목 검색" />
          </div>

          <NoticeTable notices={data?.notices ?? []} isLoading={isLoading} />
        </CardContent>
      </Card>
    </main>
  );
}
