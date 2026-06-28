'use client';

import { Calendar, ExternalLink, Link, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProjects } from '@/app/feature/project/hooks/useProjects';
import ProjectCreateDialog from '@/app/feature/project/components/ProjectCreateDialog';
import { PROJECT_STATUS_LABEL } from '@/app/feature/project/types/projectType';
import ProjectDetailDialog from '@/app/feature/project/components/ProjectDetailDialog';
import ProjectUpdateDialog from '@/app/feature/project/components/ProjectUpdateDialog';
import ProjectDeleteDialog from '@/app/feature/project/components/ProjectDeleteDialog';

const statusClassName = {
  WAITING: 'bg-slate-100 text-slate-700 border-slate-200',
  IN_PROGRESS: 'bg-blue-50 text-blue-700 border-blue-200',
  COMPLETED: 'bg-green-50 text-green-700 border-green-200',
} as const;

export default function ProjectPage() {
  const { data, isLoading } = useProjects({
    page: '1',
    keyword: '',
    status: '',
  });

  const projects = data?.projects ?? [];

  if (isLoading) {
    return <p className="text-muted-foreground text-sm">프로젝트를 불러오는 중...</p>;
  }

  return (
    <div className="space-y-8 p-1">
      <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">프로젝트 관리</h1>
          <p className="text-muted-foreground mt-1 text-sm">사내 프로젝트 진행 현황과 참여 정보를 한눈에 확인합니다.</p>
        </div>

        <ProjectCreateDialog />
      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          <p className="text-muted-foreground text-sm">등록된 프로젝트가 없습니다.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map(project => (
            <Card
              key={project.id}
              className="flex flex-col justify-between border-slate-200/80 transition-all duration-200 hover:shadow-md dark:border-slate-800"
            >
              <div>
                <CardHeader className="space-y-3 pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="line-clamp-1 text-lg leading-6 font-semibold text-slate-800 dark:text-slate-100">
                      {project.project_name}
                    </CardTitle>

                    <Badge variant="outline" className={`shrink-0 px-2.5 py-0.5 font-medium shadow-none ${statusClassName[project.status]}`}>
                      {PROJECT_STATUS_LABEL[project.status]}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground line-clamp-2 min-h-10 text-sm leading-relaxed">{project.description}</p>
                </CardHeader>

                <CardContent className="space-y-3.5 pb-6">
                  <div className="my-1 h-px bg-slate-100 dark:bg-slate-800" />

                  <div className="flex items-center gap-2.5 text-sm">
                    <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
                    <div className="flex gap-1.5 text-slate-600 dark:text-slate-300">
                      <span className="text-muted-foreground font-medium">기간:</span>
                      <span>
                        {project.start_date} ~ {project.end_date}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-sm">
                    <Users className="h-4 w-4 shrink-0 text-slate-400" />
                    <div className="flex gap-1.5 text-slate-600 dark:text-slate-300">
                      <span className="text-muted-foreground font-medium">인원:</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{project.members.length}명</span>
                    </div>
                  </div>
                </CardContent>
              </div>

              <div className="mt-auto px-6 pt-4 pb-5">
                <div className="grid grid-cols-2 gap-2">
                  {project.github_url && (
                    <Button variant="outline" size="sm" className="gap-1.5 text-slate-600 dark:text-slate-300" asChild>
                      <a href={project.github_url} target="_blank" rel="noreferrer">
                        <Link className="h-3.5 w-3.5" />
                        GitHub
                      </a>
                    </Button>
                  )}

                  {project.notion_url && (
                    <Button variant="outline" size="sm" className="gap-1.5 text-slate-600 dark:text-slate-300" asChild>
                      <a href={project.notion_url} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Notion
                      </a>
                    </Button>
                  )}
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <ProjectDetailDialog project={project} />
                  <ProjectUpdateDialog project={project} />
                  <ProjectDeleteDialog project={project} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
