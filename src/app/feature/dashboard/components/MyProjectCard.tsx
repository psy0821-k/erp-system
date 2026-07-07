'use client';

import Link from 'next/link';
import { FolderKanban } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMyProject } from '../../project/hooks/useProjects';

interface Props {
  employeeId: string;
}

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

export default function MyProjectCard({ employeeId }: Props) {
  const { data: projects = [], isLoading, isError } = useMyProject(employeeId);

  const project = projects[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderKanban className="h-5 w-5" aria-hidden="true" />
          내가 참여 중인 프로젝트
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">프로젝트 정보를 불러오는 중입니다.</p>
        ) : isError ? (
          <p className="text-sm text-destructive">프로젝트 정보를 불러오지 못했습니다.</p>
        ) : project ? (
          <>
            <div className="rounded-md border p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{project.project_name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatDate(project.start_date)} ~ {formatDate(project.end_date)}
                  </p>
                </div>

                <Badge variant="secondary">{project.status}</Badge>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">참여 인원 {project.project_members?.length ?? 0}명</p>
            </div>
          </>
        ) : (
          <div className="flex min-h-32 flex-col items-center justify-center gap-3 text-center">
            <p className="text-sm text-muted-foreground">참여 중인 프로젝트가 없습니다.</p>
          </div>
        )}

        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href="/project" aria-label="프로젝트 페이지로 이동">
            프로젝트 보기
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
