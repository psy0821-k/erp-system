import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Vacation } from '../type/vacationType';

type Props = {
  vacation: Vacation;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function VacationResultModal({ vacation, open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>휴가 신청 결과</DialogTitle>

          <DialogDescription className="sr-only">휴가 신청 결과 상세 정보</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-md border p-3 text-sm space-y-1">
            <p>신청자: {vacation.employee?.name ?? '-'}</p>
            <p>
              휴가 기간: {vacation.start_date} ~ {vacation.end_date}
            </p>
            <p>사유: {vacation.reason || '-'}</p>
          </div>

          <div className="rounded-md border p-3 text-sm space-y-1">
            <p>승인자: {vacation.approver?.name ?? '-'}</p>
            <p>처리 상태: {vacation.status}</p>
            <p>처리 일시: {vacation.approved_at ?? '-'}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resultMessage">결과 메시지</Label>
            <p id="resultMessage" className="min-h-20 rounded-md border p-3 text-sm text-muted-foreground">
              {vacation.result_message || '등록된 결과 메시지가 없습니다.'}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button className="bg-red-600 hover:bg-red-700 text-white" type="button" variant="outline" onClick={() => onOpenChange(false)}>
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
