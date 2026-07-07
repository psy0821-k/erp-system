'use client';

import { Calendar, ExternalLink, Link as LinkIcon, Users } from 'lucide-react';
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
  const { data, isLoading } = useProjects({ page: '1', keyword: '', status: '' });
  const projects = data?.projects ?? [];

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-8">
      <section className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">프로젝트 관리</h2>
            <p className="text-sm text-slate-500 mt-1">사내 프로젝트 진행 현황과 참여 정보를 한눈에 확인합니다.</p>
          </div>
          <ProjectCreateDialog />
        </div>

        {isLoading ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-sm">
            <p className="text-slate-400 text-sm animate-pulse">프로젝트 데이터를 불러오는 중입니다...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-16 text-center shadow-sm">
            <p className="text-slate-400 text-sm">현재 등록된 사내 프로젝트가 존재하지 않습니다.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map(project => (
              <Card
                key={project.id}
                className="flex flex-col justify-between bg-white border border-slate-200/80 shadow-sm rounded-2xl hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div>
                  <CardHeader className="space-y-3 pb-4 p-6 bg-slate-50/30">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="line-clamp-1 text-lg font-bold text-slate-800">{project.project_name}</CardTitle>
                      <Badge
                        variant="outline"
                        className={`shrink-0 px-2.5 py-0.5 font-medium rounded-full shadow-none ${statusClassName[project.status]}`}
                      >
                        {PROJECT_STATUS_LABEL[project.status]}
                      </Badge>
                    </div>
                    <p className="text-slate-500 line-clamp-2 min-h-10 text-sm leading-relaxed">{project.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-3 p-6 pt-4">
                    <div className="h-px bg-slate-100 mb-4" />
                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <div className="flex gap-1.5">
                        <span className="text-slate-400 font-medium">기간:</span>
                        <span className="font-medium text-slate-700">
                          {project.start_date} ~ {project.end_date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <Users className="h-4 w-4 text-slate-400" />
                      <div className="flex gap-1.5">
                        <span className="text-slate-400 font-medium">인원:</span>
                        <span className="font-bold text-slate-800">{project.members.length}명</span>
                      </div>
                    </div>
                  </CardContent>
                </div>

                <div className="mt-auto px-6 pb-6 pt-2 bg-slate-50/50 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {project.github_url && (
                      <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-slate-600 hover:bg-white" asChild>
                        <a href={project.github_url} target="_blank" rel="noreferrer">
                          <LinkIcon className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {project.notion_url && (
                      <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-slate-600 hover:bg-white" asChild>
                        <a href={project.notion_url} target="_blank" rel="noreferrer">
                          <ExternalLink className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                          Notion
                        </a>
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <ProjectDetailDialog project={project} />
                    <ProjectUpdateDialog project={project} />
                    <ProjectDeleteDialog project={project} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
