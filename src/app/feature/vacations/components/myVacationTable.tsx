'use client';

import { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { myVacationTableHeaders } from './VacationTableHeader';
import { Vacation } from '../type/vacationType';
import VacationResultModal from './VacationResultModal';
import VacationDeleteButton from './VacationDeleteButton';
import { cn } from '@/lib/utils';
import { tableStyle } from '@/app/style/tableStyle';
import StatusBadge from '@/components/ui/statusBadge';
import { APPROVAL_STATUS_LABEL } from '@/config/types/approvalStatus';
import { APPROVAL_BADGE_MAP, statusBadgeStyle } from '@/components/badge';

type Props = {
  vacations: Vacation[];
  isModalBtn?: boolean;
};

const MyVacationTable = ({ vacations, isModalBtn = false }: Props) => {
  const [selectedVacation, setSelectedVacation] = useState<Vacation | null>(null);

  return (
    <div className="w-full p-4">
      <Table>
        <TableCaption className="sr-only">나의 휴가 신청 목록</TableCaption>

        <TableHeader className={cn(tableStyle.header)}>
          <TableRow className="hover:bg-transparent">
            {myVacationTableHeaders.map(item => (
              <TableHead key={item.key} scope="col" className={cn(tableStyle.header)}>
                {item.label}
              </TableHead>
            ))}

            <TableHead scope="col" className={cn(tableStyle.header)}>
              기타
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100">
          {vacations.length === 0 ? (
            <TableRow className={cn(tableStyle.row)}>
              <TableCell colSpan={isModalBtn ? 4 : 3} className="text-center py-12 text-slate-400 text-sm">
                휴가 신청 내역이 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            vacations.map(vacation => (
              <TableRow key={vacation.id} className={cn(tableStyle.row)}>
                <TableCell className="font-bold text-slate-700 text-sm py-3.5 dark:text-slate-100">{vacation.vacation_type}</TableCell>

                <TableCell className="text-xs text-slate-600 font-medium leading-relaxed">
                  <span className={cn(tableStyle.date)}>{vacation.start_date}</span>
                  <span aria-hidden className="text-slate-300 mx-1">
                    ~
                  </span>
                  <br className="sm:hidden" />
                  <span className={cn(tableStyle.date)}>{vacation.end_date}</span>
                </TableCell>

                <TableCell>
                  <StatusBadge label={APPROVAL_STATUS_LABEL[vacation.status]} variant={APPROVAL_BADGE_MAP[vacation.status]} />
                </TableCell>

                <TableCell className="py-2">
                  {isModalBtn && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className={statusBadgeStyle.progress}
                      onClick={() => setSelectedVacation(vacation)}
                    >
                      자세히
                    </Button>
                  )}
                  {vacation.status === 'PENDING' && <VacationDeleteButton vacationId={vacation.id} />}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {selectedVacation && (
        <VacationResultModal
          vacation={selectedVacation}
          open={!!selectedVacation}
          onOpenChange={open => {
            if (!open) setSelectedVacation(null);
          }}
        />
      )}
    </div>
  );
};

export default MyVacationTable;
