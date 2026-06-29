import Link from 'next/link';
import { ArrowLeft, ImagePlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function NoticeEditPageView() {
  return (
    <main className="space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/notice/1">
          <ArrowLeft className="mr-2 h-4 w-4" />
          상세로
        </Link>
      </Button>

      <section className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">공지사항 수정</h1>
        <p className="text-sm text-muted-foreground">등록된 공지사항 내용을 수정합니다.</p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">공지 정보 수정</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input id="title" defaultValue="ERP 시스템 점검 안내" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">내용</Label>
            <Textarea
              id="content"
              className="min-h-80"
              defaultValue={`안녕하세요. 시스템 관리자입니다.
ERP 시스템 안정화를 위해 금일 야간 점검이 진행될 예정입니다.
점검 시간 동안 일부 기능 사용이 제한될 수 있습니다.`}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" asChild>
              <Link href="/notice/1">취소</Link>
            </Button>
            <Button type="button">수정 완료</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
