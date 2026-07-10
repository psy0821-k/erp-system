'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useUpdateProject } from '../hooks/useUpdateProject';
import { Project, PROJECT_STATUS_OPTIONS, UpdateProjectInput } from '../types/projectType';
import { buttonStyle } from '@/app/style/buttonStyle';
import { cn } from '@/lib/utils';

interface Props {
  project: Project;
}

export default function ProjectUpdateDialog({ project }: Props) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useUpdateProject();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateProjectInput>({
    defaultValues: {
      id: project.id,
      project_name: project.project_name,
      description: project.description,
      start_date: project.start_date,
      end_date: project.end_date,
      status: project.status,
      github_url: project.github_url ?? '',
      notion_url: project.notion_url ?? '',
    },
  });

  const onSubmit = (values: UpdateProjectInput) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn(buttonStyle.base, buttonStyle.create)} variant="outline" size="sm">
          수정
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>프로젝트 수정</DialogTitle>
          <DialogDescription>프로젝트 정보를 수정합니다.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input type="hidden" {...register('id')} />

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="project_name">프로젝트명</FieldLabel>
              <Input id="project_name" {...register('project_name', { required: '프로젝트명을 입력해주세요.' })} />
              {errors.project_name && <FieldError>{errors.project_name.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="description">설명</FieldLabel>
              <Textarea id="description" className="min-h-28" {...register('description', { required: '설명을 입력해주세요.' })} />
              {errors.description && <FieldError>{errors.description.message}</FieldError>}
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="start_date">시작일</FieldLabel>
                <Input id="start_date" type="date" {...register('start_date', { required: '시작일을 선택해주세요.' })} />
                {errors.start_date && <FieldError>{errors.start_date.message}</FieldError>}
              </Field>

              <Field>
                <FieldLabel htmlFor="end_date">종료일</FieldLabel>
                <Input id="end_date" type="date" {...register('end_date', { required: '종료일을 선택해주세요.' })} />
                {errors.end_date && <FieldError>{errors.end_date.message}</FieldError>}
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="status">상태</FieldLabel>

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue placeholder="상태를 선택해주세요." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {PROJECT_STATUS_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="github_url">GitHub URL</FieldLabel>
              <Input id="github_url" placeholder="https://github.com/..." {...register('github_url')} />
            </Field>

            <Field>
              <FieldLabel htmlFor="notion_url">Notion URL</FieldLabel>
              <Input id="notion_url" placeholder="https://notion.so/..." {...register('notion_url')} />
            </Field>
          </FieldGroup>

          <div className="flex justify-end gap-2">
            <Button className={cn(buttonStyle.base, buttonStyle.delete)} type="button" variant="outline" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button className={cn(buttonStyle.base, buttonStyle.submit)} type="submit" disabled={isPending}>
              {isPending ? '수정 중...' : '수정'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
