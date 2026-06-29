import Link from 'next/link';
import { ArrowLeft, ImagePlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function NoticeCreatePageView() {
  return (
    <main className="space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/notice">
          <ArrowLeft className="mr-2 h-4 w-4" />
          목록으로
        </Link>
      </Button>

      <section className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">공지사항 작성</h1>
        <p className="text-sm text-muted-foreground">직원들에게 전달할 공지사항을 작성합니다.</p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">공지 정보</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input id="title" placeholder="공지사항 제목을 입력해주세요." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">대표 이미지</Label>

            <label
              htmlFor="thumbnail"
              className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 text-sm text-muted-foreground hover:bg-muted"
            >
              <ImagePlus className="mb-2 h-6 w-6" />
              이미지를 업로드해주세요.
              <span className="mt-1 text-xs">PNG, JPG, WEBP / 최대 5MB</span>
            </label>

            <Input id="thumbnail" type="file" accept="image/*" className="sr-only" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">내용</Label>
            <Textarea id="content" className="min-h-80" placeholder="공지사항 내용을 입력해주세요." />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" asChild>
              <Link href="/notice">취소</Link>
            </Button>
            <Button type="button">등록</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
