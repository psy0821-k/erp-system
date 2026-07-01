import Link from 'next/link';
import { Pin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

import { Notice } from '../type/noticeType';
import { formatDate } from '../../utils/formatDate';

interface Props {
  notices: Notice[];
  isLoading: boolean;
}

export default function NoticeTable({ notices, isLoading }: Props) {
  return (
    <div className="rounded-md border bg-card shadow-sm overflow-hidden">
      <Table>
        <caption className="sr-only">공지사항 목록</caption>

        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-24 text-center font-semibold text-muted-foreground">구분</TableHead>
            <TableHead className="font-semibold text-muted-foreground">제목</TableHead>
            <TableHead className="w-36 font-semibold text-muted-foreground">작성자</TableHead>
            <TableHead className="w-36 text-right font-semibold text-muted-foreground pr-6">작성일</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">
                  <Skeleton className="h-5 w-12 mx-auto rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-3/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-16" />
                </TableCell>
                <TableCell className="pr-6">
                  <Skeleton className="h-5 w-20 ml-auto" />
                </TableCell>
              </TableRow>
            ))}

          {!isLoading && notices.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center text-sm text-muted-foreground">
                등록된 공지사항이 없습니다.
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            notices.map((notice, i) => {
              const isPinned = notice.is_pinned;

              return (
                <TableRow key={notice.id} className={`transition-colors hover:bg-muted/40 base-row ${isPinned ? 'bg-muted/30 font-medium' : ''}`}>
                  <TableCell className="text-center font-medium">
                    {isPinned ? (
                      <Badge
                        variant="secondary"
                        className="gap-1 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50 pointer-events-none"
                      >
                        <Pin className="h-3 w-3 fill-amber-500 stroke-amber-600 dark:fill-amber-400 dark:stroke-amber-400" />
                        고정
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">{notices.length - i}</span>
                    )}
                  </TableCell>

                  <TableCell className="max-w-75 sm:max-w-none">
                    <Link
                      href={`/notice/${notice.id}`}
                      className="block truncate font-medium text-foreground hover:text-primary hover:underline underline-offset-4 transition-colors"
                    >
                      {notice.title}
                    </Link>
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground font-medium">{notice.author?.name ?? '관리자'}</TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground pr-6 tabular-nums">{formatDate(notice.created_at)}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
