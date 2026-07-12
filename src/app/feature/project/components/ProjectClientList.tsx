'use client';
import React from 'react';
import { useProjects } from '../hooks/useProjects';
import { cn } from '@/lib/utils';
import { cardStyle } from '@/app/style/tableStyle';
import { textStyle } from '@/app/style/textStyle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/ui/statusBadge';
import { PROJECT_STATUS_LABEL } from '../types/projectType';
import { PROJECT_STATUS_BADGE_MAP } from '@/components/badge';
import { Calendar, ExternalLink, LinkIcon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectDetailDialog from './ProjectDetailDialog';
import ProjectUpdateDialog from './ProjectUpdateDialog';
import ProjectDeleteDialog from './ProjectDeleteDialog';
import RoleGuard from '@/components/auth/RoleGuard';
import { EmployeeRole } from '../../sign-up/schema/employeeSchema';

interface Props {
  employeeRole: EmployeeRole;
}

function ProjectClientList({ employeeRole }: Props) {
  const { data, isLoading } = useProjects({ page: '1', keyword: '', status: '' });
  const projects = data?.projects ?? [];

  return (
    <>
      {isLoading ? (
        <div className={cn(cardStyle.wrapper, 'p-12 text-center')}>
          <p className={cn('animate-pulse text-sm', textStyle.subtle)}>프로젝트 데이터를 불러오는 중입니다...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className={cn(cardStyle.wrapper, 'p-16 text-center')}>
          <p className={cn('text-sm', textStyle.subtle)}>현재 등록된 사내 프로젝트가 존재하지 않습니다.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map(project => (
            <Card key={project.id} className={cn(cardStyle.wrapper, 'flex flex-col justify-between transition-all duration-200 hover:shadow-md')}>
              <div>
                <CardHeader className="space-y-3 bg-slate-50/30 p-6 pb-4 dark:bg-slate-900/70">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="line-clamp-1 text-lg font-bold text-slate-800 dark:text-slate-100">{project.project_name}</CardTitle>
                    <StatusBadge label={PROJECT_STATUS_LABEL[project.status]} variant={PROJECT_STATUS_BADGE_MAP[project.status]} />
                  </div>
                  <p className={cn('line-clamp-2 min-h-10 text-sm leading-relaxed', textStyle.muted)}>{project.description}</p>
                </CardHeader>

                <CardContent className="space-y-3 p-6 pt-4">
                  <div className={cn('mb-4 h-px', textStyle.divider)} />
                  <div className={cn('flex items-center gap-2.5 text-sm', textStyle.body)}>
                    <Calendar className={cn('h-4 w-4', textStyle.subtle)} />
                    <div className="flex gap-1.5">
                      <span className={cn('font-medium', textStyle.subtle)}>기간:</span>
                      <span className={cn('font-medium', textStyle.secondary)}>
                        {project.start_date} ~ {project.end_date}
                      </span>
                    </div>
                  </div>
                  <div className={cn('flex items-center gap-2.5 text-sm', textStyle.body)}>
                    <Users className={cn('h-4 w-4', textStyle.subtle)} />
                    <div className="flex gap-1.5">
                      <span className={cn('font-medium', textStyle.subtle)}>인원:</span>
                      <span className={cn('font-bold', textStyle.primary)}>{project.members.length}명</span>
                    </div>
                  </div>
                </CardContent>
              </div>

              <div className="mt-auto border-t border-slate-100 bg-slate-50/50 px-6 pb-6 pt-2 dark:border-slate-800 dark:bg-slate-900/60">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {project.github_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-slate-200 text-slate-600 hover:bg-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 "
                      asChild
                    >
                      <a href={project.github_url} target="_blank" rel="noreferrer">
                        <LinkIcon className={cn('mr-1.5 h-3.5 w-3.5', textStyle.subtle)} />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {project.notion_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-slate-200 text-slate-600 hover:bg-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      asChild
                    >
                      <a href={project.notion_url} target="_blank" rel="noreferrer">
                        <ExternalLink className={cn('mr-1.5 h-3.5 w-3.5', textStyle.subtle)} /> Notion
                      </a>
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <ProjectDetailDialog role={employeeRole} project={project} />
                  <RoleGuard role={employeeRole} permission="PROJECT_MANAGE">
                    <ProjectUpdateDialog project={project} />
                  </RoleGuard>
                  <RoleGuard role={employeeRole} permission="PROJECT_MANAGE">
                    <ProjectDeleteDialog project={project} />
                  </RoleGuard>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default ProjectClientList;
