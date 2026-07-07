'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';

import NoticeEditor from './NoticeEditor';
import { noticeCreateSchema, NoticeCreateInput } from '../schema/noticeSchema';
import { useCreateNotice } from '../hooks/useCreateNotice';

interface Props {
  employee: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export default function NoticeCreatePageView({ employee }: Props) {
  const router = useRouter();
  const { mutate: createNotice, isPending } = useCreateNotice();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NoticeCreateInput>({
    resolver: zodResolver(noticeCreateSchema),
    defaultValues: {
      title: '',
      content: '',
      author_id: employee?.id ?? '',
      is_pinned: false,
    },
  });

  const onSubmit = (values: NoticeCreateInput) => {
    if (!employee) return;

    createNotice(
      {
        ...values,
        author_id: employee.id,
      },
      {
        onSuccess: () => {
          router.push('/notice');
        },
      }
    );
  };
  return (
    <div className="space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/notice">
          <ArrowLeft className="mr-2 h-4 w-4" />
          목록으로
        </Link>
      </Button>

      <section className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">공지사항 작성</h2>
        <p className="text-sm text-muted-foreground">직원들에게 전달할 공지사항을 작성합니다.</p>
      </section>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">공지 정보</CardTitle>
          </CardHeader>

          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">제목</FieldLabel>
                <Input id="title" placeholder="공지사항 제목을 입력해주세요." {...register('title')} />
                {errors.title && <FieldError>{errors.title.message}</FieldError>}
              </Field>

              <Field>
                <div className="flex items-center gap-2">
                  <Checkbox id="is_pinned" onCheckedChange={checked => setValue('is_pinned', checked === true)} />
                  <FieldLabel htmlFor="is_pinned">상단 고정 공지로 등록</FieldLabel>
                </div>
              </Field>

              <Field>
                <FieldLabel>내용</FieldLabel>
                <NoticeEditor onChange={value => setValue('content', value)} />
                {errors.content && <FieldError>{errors.content.message}</FieldError>}
              </Field>

              <div className="flex justify-end gap-2">
                <Button variant="outline" asChild>
                  <Link href="/notice">취소</Link>
                </Button>

                <Button type="submit" disabled={isPending || !employee}>
                  {isPending ? '등록 중...' : '등록'}
                </Button>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
