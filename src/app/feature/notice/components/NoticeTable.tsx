import Link from 'next/link';
import { MoreHorizontal, Pin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const notices = [
  {
    id: '1',
    title: 'ERP 시스템 점검 안내',
    author: '관리자',
    createdAt: '2026.06.29',
    isPinned: true,
  },
  {
    id: '2',
    title: '하반기 휴가 신청 일정 안내',
    author: '인사팀',
    createdAt: '2026.06.28',
    isPinned: false,
  },
];

export default function NoticeTable() {
  return (
    <Table>
      <caption className="sr-only">공지사항 목록</caption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-22.5 text-center">고정</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-35">작성자</TableHead>
          <TableHead className="w-35">작성일</TableHead>
          <TableHead className="w-20 text-center">관리</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {notices.map(notice => (
          <TableRow key={notice.id}>
            <TableCell className="text-center">
              {notice.isPinned ? (
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

            <TableCell>{notice.author}</TableCell>
            <TableCell>{notice.createdAt}</TableCell>

            <TableCell className="text-center">
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">공지사항 관리</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
