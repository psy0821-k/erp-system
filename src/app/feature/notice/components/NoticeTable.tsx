import Link from 'next/link';
import { Pin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Notice } from '../type/noticeType';

interface Props {
  notices: Notice[];
  isLoading: boolean;
}

export default function NoticeTable({ notices, isLoading }: Props) {
  return (
    <Table>
      <caption className="sr-only">공지사항 목록</caption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-22.5 text-center">고정</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-35">작성자</TableHead>
          <TableHead className="w-35">작성일</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading && (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
              공지사항을 불러오는 중입니다.
            </TableCell>
          </TableRow>
        )}

        {!isLoading && notices.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
              등록된 공지사항이 없습니다.
            </TableCell>
          </TableRow>
        )}

        {notices.map(notice => (
          <TableRow key={notice.id}>
            <TableCell className="text-center">
              {notice.is_pinned ? (
                <Badge variant="secondary" className="gap-1">
                  <Pin className="h-3 w-3" />
                  고정
                </Badge>
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </TableCell>

            <TableCell>
              <Link href={`/notice/${notice.id}`} className="font-medium hover:underline">
                {notice.title}
              </Link>
            </TableCell>

            <TableCell>{notice.author?.name ?? '관리자'}</TableCell>

            <TableCell>{new Date(notice.created_at).toLocaleDateString('ko-KR')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
