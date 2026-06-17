'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Vacation, ApprovalStatus } from '../type/vacationType';
import { useUpdateVacationStatus } from '../hooks/useUpdateVacationStatus';

type Props = {
  vacation: Vacation;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  approverId: string;
};

export default function VacationReviewModal({ vacation, open, onOpenChange, approverId }: Props) {
  const [status, setStatus] = useState<ApprovalStatus>('APPROVED');
  const [resultMessage, setResultMessage] = useState('');

  const { mutate, isPending } = useUpdateVacationStatus();

  const active = 'bg-blue-600 hover:bg-blue-700 text-white border <border-black></border-black> focus:ring-3 ring-black';

  const handleSubmit = () => {
    mutate(
      {
        id: vacation.id,
        status,
        approver_id: approverId,
        result_message: resultMessage,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          setResultMessage('');
          setStatus('APPROVED');
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>휴가 신청 검토</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-md border p-3 text-sm">
            <p>신청자: {vacation.employee?.name ?? '-'}</p>
            <p>
              휴가 기간: {vacation.start_date} ~ {vacation.end_date}
            </p>
            <p>사유: {vacation.reason}</p>
          </div>

          <div className="space-y-2">
            <Label>처리 상태</Label>

            <div className="flex gap-2">
              <Button
                className={status === 'APPROVED' ? active : ''}
                type="button"
                variant={status === 'APPROVED' ? 'default' : 'outline'}
                onClick={() => setStatus('APPROVED')}
              >
                승인
              </Button>

              <Button
                type="button"
                className={status === 'REJECTED' ? active : ''}
                variant={status === 'REJECTED' ? 'destructive' : 'outline'}
                onClick={() => setStatus('REJECTED')}
              >
                반려
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resultMessage">결과 메시지</Label>
            <Textarea
              id="resultMessage"
              value={resultMessage}
              onChange={e => setResultMessage(e.target.value)}
              placeholder="검토 결과 메시지를 입력하세요."
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" className={active} onClick={handleSubmit} disabled={isPending || !resultMessage.trim()}>
            {isPending ? '처리 중...' : '검토 완료'}
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white focus:ring-3  ring-black"
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            취소
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
