'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';

import NoticeEditor from './NoticeEditor';
import { noticeUpdateSchema, NoticeUpdateInput } from '../schema/noticeSchema';
import { useNotice } from '../hooks/useNotice';
import { useUpdateNotice } from '../hooks/useUpdateNotice';

interface Props {
  id: string;
}

export default function NoticeEditPageView({ id }: Props) {
  const router = useRouter();
  const { data: notice, isLoading } = useNotice(id);
  const { mutate: updateNotice, isPending } = useUpdateNotice();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<NoticeUpdateInput>({
    resolver: zodResolver(noticeUpdateSchema),
    defaultValues: {
      title: '',
      content: '',
      is_pinned: false,
    },
  });

  useEffect(() => {
    if (!notice) return;

    reset({
      title: notice.title,
      content: notice.content,
      is_pinned: notice.is_pinned,
    });
  }, [notice, reset]);

  const onSubmit = (values: NoticeUpdateInput) => {
    updateNotice(
      {
        id,
        ...values,
      },
      {
        onSuccess: () => {
          router.push(`/notice/${id}`);
        },
      }
    );
  };

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">공지사항을 불러오는 중입니다.</p>;
  }

  if (!notice) {
    return <p className="text-sm text-muted-foreground">공지사항을 찾을 수 없습니다.</p>;
  }

  return (
    <main className="space-y-6">
      <Button variant="ghost" asChild>
        <Link href={`/notice/${id}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          상세로
        </Link>
      </Button>

      <section className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">공지사항 수정</h1>
        <p className="text-sm text-muted-foreground">등록된 공지사항 내용을 수정합니다.</p>
      </section>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">공지 정보 수정</CardTitle>
          </CardHeader>

          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">제목</FieldLabel>
                <Input id="title" placeholder="공지사항 제목을 입력해주세요." {...register('title')} />
                {errors.title && <FieldError>{errors.title.message}</FieldError>}
              </Field>

              <Field>
                <Controller
                  name="is_pinned"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox id="is_pinned" checked={field.value} onCheckedChange={checked => field.onChange(checked === true)} />
                      <FieldLabel htmlFor="is_pinned">상단 고정 공지로 등록</FieldLabel>
                    </div>
                  )}
                />
              </Field>

              <Field>
                <FieldLabel>내용</FieldLabel>
                <NoticeEditor initialValue={notice.content} onChange={value => setValue('content', value)} />
                {errors.content && <FieldError>{errors.content.message}</FieldError>}
              </Field>

              <div className="flex justify-end gap-2">
                <Button variant="outline" asChild>
                  <Link href={`/notice/${id}`}>취소</Link>
                </Button>

                <Button type="submit" disabled={isPending}>
                  {isPending ? '수정 중...' : '수정 완료'}
                </Button>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
