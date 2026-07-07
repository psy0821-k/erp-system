'use client';

import { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Vacation } from '../type/vacationType';
import { vacationManageTableHeaders } from './VacationTableHeader';
import VacationReviewModal from './VacationReviewModal';
import { tableStyle } from '@/app/style/tableStyle';
import { cn } from '@/lib/utils';

type Props = {
  vacations: Vacation[];
  approverId: string;
};

const AdminVacationTable = ({ vacations, approverId }: Props) => {
  const [selectedVacation, setSelectedVacation] = useState<Vacation | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'APPROVED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'REJECTED':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="w-full p-4">
      <Table>
        <TableCaption className="sr-only">관리자 휴가 신청 목록</TableCaption>

        <TableHeader className={cn(tableStyle.header)}>
          <TableRow className={cn(tableStyle.row)}>
            {vacationManageTableHeaders.map(item => (
              <TableHead key={item.key} scope="col" className={cn(tableStyle.header)}>
                {item.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100">
          {vacations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={vacationManageTableHeaders.length} className="text-center py-12 text-slate-400 text-sm">
                결재 대기 중인 휴가 신청 내역이 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            vacations.map(vacation => {
              const employee = vacation.employee;
              const isReviewed = vacation.status === 'APPROVED' || vacation.status === 'REJECTED';

              return (
                <TableRow key={vacation.id} className={cn(tableStyle.row)}>
                  <TableCell className={cn(tableStyle.employeeNumber)}>{employee?.employee_number ?? '-'}</TableCell>
                  <TableCell className={cn(tableStyle.employeeName)}>{employee?.name ?? '-'}</TableCell>
                  <TableCell className={cn(tableStyle.employeeDepartment)}>{employee?.department ?? '-'}</TableCell>
                  <TableCell className="text-slate-500 text-sm">{employee?.position ?? '-'}</TableCell>
                  <TableCell className="font-medium text-slate-700 text-sm">{vacation.vacation_type}</TableCell>
                  <TableCell className={cn(tableStyle.date)}>
                    {vacation.start_date} ~ {vacation.end_date}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`rounded-full shadow-none px-2.5 py-0.5 font-medium text-xs ${getStatusBadge(vacation.status)}`}
                    >
                      {vacation.status}
                    </Badge>
                  </TableCell>
                  <TableCell className={cn(tableStyle.date)}>{vacation.created_at.slice(0, 10)}</TableCell>
                  <TableCell className="py-2">
                    <Button
                      type="button"
                      variant={isReviewed ? 'ghost' : 'outline'}
                      size="sm"
                      disabled={isReviewed}
                      className={`h-8 rounded-xl text-xs font-semibold px-3 ${
                        isReviewed ? 'text-slate-400 bg-slate-50' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 shadow-sm'
                      }`}
                      onClick={() => setSelectedVacation(vacation)}
                    >
                      {isReviewed ? '처리완료' : '검토'}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {selectedVacation && (
        <VacationReviewModal
          vacation={selectedVacation}
          approverId={approverId}
          open={!!selectedVacation}
          onOpenChange={open => {
            if (!open) setSelectedVacation(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminVacationTable;
