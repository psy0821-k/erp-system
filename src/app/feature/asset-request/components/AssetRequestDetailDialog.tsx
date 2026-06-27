'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { ASSET_TYPE_LABEL } from '@/config/types/asset';
import { ASSET_REQUEST_STATUS_LABEL, AssetRequest } from '../type/assetRequestType';

interface Props {
  request: AssetRequest;
}

export default function AssetRequestDetailDialog({ request }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          상세보기
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>IT 물품 요청 상세</DialogTitle>
          <DialogDescription>요청 내용과 처리 상태를 확인합니다.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-[100px_1fr] gap-3">
            <span className="text-muted-foreground">요청 물품</span>
            <span>{ASSET_TYPE_LABEL[request.asset_type]}</span>

            <span className="text-muted-foreground">요청자</span>
            <span>{request.requester?.name ?? '-'}</span>

            <span className="text-muted-foreground">부서</span>
            <span>{request.requester?.department ?? '-'}</span>

            <span className="text-muted-foreground">제목</span>
            <span className="font-medium">{request.request_title}</span>

            <span className="text-muted-foreground">상태</span>
            <span>
              <Badge variant="outline">{ASSET_REQUEST_STATUS_LABEL[request.status]}</Badge>
            </span>

            <span className="text-muted-foreground">요청일</span>
            <span>{new Date(request.created_at).toLocaleDateString('ko-KR')}</span>

            <span className="text-muted-foreground">관리자 메세지</span>
            <span>{request.admin_message || '-'}</span>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground">요청 사유</p>
            <div className="bg-muted min-h-24 rounded-md p-3 leading-6 whitespace-pre-wrap">{request.reason}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
