'use client';

import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { ArrowLeft, Pencil, Pin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useNotice } from '../hooks/useNotice';
import NoticeDeleteDialog from './NoticeDeleteDialog';

interface Props {
  id: string;
}

export default function NoticeDetailPageView({ id }: Props) {
  const { data: notice, isLoading } = useNotice(id);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">공지사항을 불러오는 중입니다.</p>;
  }

  if (!notice) {
    return <p className="text-sm text-muted-foreground">공지사항을 찾을 수 없습니다.</p>;
  }

  const sanitizedContent = DOMPurify.sanitize(notice.content);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/notice">
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로
          </Link>
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/notice/${notice.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              수정
            </Link>
          </Button>

          <NoticeDeleteDialog id={notice.id} />
        </div>
      </div>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {notice.is_pinned && (
              <Badge variant="secondary" className="gap-1">
                <Pin className="h-3 w-3" />
                고정 공지
              </Badge>
            )}

            <span className="text-sm text-muted-foreground">{notice.author?.name ?? '관리자'}</span>
            <span className="text-sm text-muted-foreground">·</span>
            <time className="text-sm text-muted-foreground">{new Date(notice.created_at).toLocaleDateString('ko-KR')}</time>
          </div>

          <h2 className="text-2xl font-bold tracking-tight">{notice.title}</h2>
        </CardHeader>

        <CardContent>
          <article
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: sanitizedContent,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
