import Link from 'next/link';
import { Pin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Notice } from '../type/noticeType';
import { formatDate } from '../../utils/formatDate';
import { cn } from '@/lib/utils';
import { tableStyle } from '@/app/style/tableStyle';

interface Props {
  notices: Notice[];
}

export default function NoticeTable({ notices }: Props) {
  return (
    <div className="rounded-md border-b border-slate-200 bg-card shadow-sm overflow-hidden p-4">
      <Table>
        <caption className="sr-only">공지사항 목록</caption>

        <TableHeader className="bg-muted/50">
          <TableRow className={cn(tableStyle.row)}>
            <TableHead className={cn(tableStyle.header, 'w-[15%] text-center')}>구분</TableHead>
            <TableHead className={cn(tableStyle.header, 'w-[50%]')}>제목</TableHead>
            <TableHead className={cn(tableStyle.header, 'w-[15%] text-center')}>작성자</TableHead>
            <TableHead className={cn(tableStyle.header, 'w-[20%] text-center')}>작성일</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {notices.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center text-sm text-muted-foreground">
                등록된 공지사항이 없습니다.
              </TableCell>
            </TableRow>
          )}

          {notices.map((notice, i) => {
            const isPinned = notice.is_pinned;

            return (
              <TableRow key={notice.id} className={cn(tableStyle.row)}>
                <TableCell className="w-[15%] text-center font-medium">
                  {isPinned ? (
                    <Badge
                      variant="secondary"
                      className="pointer-events-none gap-1 border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400"
                    >
                      <Pin className="h-3 w-3 fill-amber-500 stroke-amber-600 dark:fill-amber-400 dark:stroke-amber-400" aria-hidden="true" />
                      고정
                    </Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">{notices.length - i}</span>
                  )}
                </TableCell>

                <TableCell className="w-[50%] max-w-0">
                  <Link
                    href={`/notice/${notice.id}`}
                    className="block truncate font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                  >
                    {notice.title}
                  </Link>
                </TableCell>

                <TableCell className={cn(tableStyle.employeeName)}>{notice.author?.name ?? '관리자'}</TableCell>

                <TableCell className={cn(tableStyle.date)}>{formatDate(notice.created_at)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
