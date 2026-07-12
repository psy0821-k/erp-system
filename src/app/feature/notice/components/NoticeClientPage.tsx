'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Megaphone, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import NoticeTable from './NoticeTable';
import { useNotices } from '../hooks/useNotices';
import EmployeeSearch from '../../employees/components/EmployeeSearch';
import TableSkeleton from '@/components/ui/tableSkelleton';
import { buttonStyle } from '@/app/style/buttonStyle';
import { cn } from '@/lib/utils';
import { EmployeeRole } from '../../sign-up/schema/employeeSchema';
import RoleGuard from '@/components/auth/RoleGuard';

interface Props {
  employeeRole: EmployeeRole;
}

export default function NoticeClientPage({ employeeRole }: Props) {
  const searchParams = useSearchParams();

  const params = {
    page: searchParams.get('page') || '1',
    keyword: searchParams.get('keyword') || '',
  };

  const { data, isLoading } = useNotices(params);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Megaphone className="h-6 w-6" />
            <h1 className="text-2xl font-bold tracking-tight">공지사항</h1>
          </div>
          <p className="text-sm text-muted-foreground">사내 주요 공지와 업무 안내를 확인합니다.</p>
        </div>

        <RoleGuard role={employeeRole} permission="NOTICE_MANAGE">
          <Button className={cn(buttonStyle.base, buttonStyle.createNew)} asChild>
            <Link href="/notice/create">
              <Plus className="mr-2 h-4 w-4" />
              공지 작성
            </Link>
          </Button>
        </RoleGuard>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">공지사항 목록</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <EmployeeSearch placeholder="공지사항 검색" />
          {isLoading ? <TableSkeleton columns={6} rows={5} /> : <NoticeTable notices={data?.notices ?? []} />}
        </CardContent>
      </Card>
    </div>
  );
}
