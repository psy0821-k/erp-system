import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { Project, PROJECT_STATUS_LABEL } from '../types/projectType';
import ProjectMemberCreateDialog from './ProjectMemberCreateDialog';
import ProjectDeleteMemberButton from './ProjectDeleteMemberButton';

interface Props {
  project: Project;
}

export default function ProjectDetailDialog({ project }: Props) {
  return (
    <Dialog>
      1
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          상세보기
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{project.project_name}</DialogTitle>
          <DialogDescription>프로젝트 상세 정보를 확인합니다.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <Badge>{PROJECT_STATUS_LABEL[project.status]}</Badge>

          <div>
            <p className="text-muted-foreground text-sm">설명</p>
            <p className="mt-1 text-sm leading-relaxed">{project.description}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm">개발 기간</p>
            <p className="mt-1 text-sm">
              {project.start_date} ~ {project.end_date}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm">참여 인원</p>
            <p className="mt-1 text-sm font-medium">{project.members.length}명</p>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-muted-foreground text-sm">
                참여자 <span className="text-foreground font-medium">{project.members.length}</span>명
              </p>

              <ProjectMemberCreateDialog projectId={project.id} />
            </div>

            {project.members.length > 0 ? (
              <div className="max-h-60 space-y-2 overflow-y-auto pr-1">
                {project.members.map(member => (
                  <div key={member.id} className="rounded-md border p-3 text-sm">
                    <p className="font-medium">{member.employee.name}</p>

                    <p className="text-muted-foreground mt-1">{member.employee.department}</p>

                    <ProjectDeleteMemberButton memberId={member.id} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground rounded-md border p-3 text-sm">등록된 참여자가 없습니다.</p>
            )}
          </div>

          <div className="flex gap-2">
            {project.github_url && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.github_url} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </Button>
            )}

            {project.notion_url && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.notion_url} target="_blank" rel="noreferrer">
                  Notion
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
