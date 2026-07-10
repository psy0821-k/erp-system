'use client';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { useDeleteProject } from '../hooks/useDeleteProject';
import { Project } from '../types/projectType';
import { buttonStyle } from '@/app/style/buttonStyle';
import { cn } from '@/lib/utils';

interface Props {
  project: Project;
}

export default function ProjectDeleteDialog({ project }: Props) {
  const { mutate, isPending } = useDeleteProject();

  const handleDelete = () => {
    mutate(project.id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={cn(buttonStyle.base, buttonStyle.delete)} variant="destructive" size="sm">
          삭제
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>프로젝트를 삭제할까요?</AlertDialogTitle>
          <AlertDialogDescription>{project.project_name} 프로젝트가 삭제됩니다. 삭제된 데이터는 복구할 수 없습니다.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction className={cn(buttonStyle.base, buttonStyle.delete)} onClick={handleDelete} disabled={isPending}>
            {isPending ? '삭제 중...' : '삭제'}
          </AlertDialogAction>
          <AlertDialogCancel>취소</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
