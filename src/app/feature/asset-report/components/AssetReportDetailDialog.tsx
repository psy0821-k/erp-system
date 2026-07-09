'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { ASSET_REPORT_STATUS_LABEL, AssetReport } from '../type/assetReportType';
import { cn } from '@/lib/utils';
import { buttonStyle } from '@/app/style/buttonStyle';

interface Props {
  report: AssetReport;
}

export default function AssetReportDetailDialog({ report }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn(buttonStyle.base, buttonStyle.detail)} variant="outline" size="sm">
          상세보기
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>고장 신고 상세</DialogTitle>
          <DialogDescription>고장 신고 내용과 처리 상태를 확인합니다.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-[100px_1fr] gap-3">
            <span className="text-muted-foreground">자산명</span>
            <span className="font-medium">{report.asset?.asset_name ?? '-'}</span>

            <span className="text-muted-foreground">시리얼 번호</span>
            <span>{report.asset?.serial_number ?? '-'}</span>

            <span className="text-muted-foreground">신고자</span>
            <span>{report.reporter?.name ?? '-'}</span>

            <span className="text-muted-foreground">부서</span>
            <span>{report.reporter?.department ?? '-'}</span>

            <span className="text-muted-foreground">제목</span>
            <span className="font-medium">{report.title}</span>

            <span className="text-muted-foreground">처리상태</span>
            <span>
              <Badge variant="outline">{ASSET_REPORT_STATUS_LABEL[report.status]}</Badge>
            </span>

            <span className="text-muted-foreground">신고일</span>
            <span>{new Date(report.created_at).toLocaleDateString('ko-KR')}</span>

            <span className="text-muted-foreground">관리자 메세지</span>
            <span>{report.admin_message || '-'}</span>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground">고장 내용</p>
            <div className="bg-muted min-h-24 rounded-md p-3 leading-6 whitespace-pre-wrap">{report.description}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
