'use client';

import { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import { Vacation } from '../type/vacationType';
import { vacationManageTableHeaders } from './VacationTableHeader';
import VacationReviewModal from './VacationReviewModal';

type Props = {
  vacations: Vacation[];
  approverId: string;
};

const AdminVacationTable = ({ vacations, approverId }: Props) => {
  const [selectedVacation, setSelectedVacation] = useState<Vacation | null>(null);

  return (
    <>
      <Table>
        <TableCaption className="sr-only">관리자 휴가 신청 목록</TableCaption>

        <TableHeader>
          <TableRow>
            {vacationManageTableHeaders.map(item => (
              <TableHead key={item.key} scope="col" className="text-center">
                {item.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="border">
          {vacations.map(vacation => {
            const employee = vacation.employee;
            const isReviewed = vacation.status === 'APPROVED' || vacation.status === 'REJECTED';

            return (
              <TableRow key={vacation.id} className="text-center">
                <TableCell>{employee?.employee_number ?? '-'}</TableCell>
                <TableCell>{employee?.name ?? '-'}</TableCell>
                <TableCell>{employee?.department ?? '-'}</TableCell>
                <TableCell>{employee?.position ?? '-'}</TableCell>
                <TableCell>{vacation.vacation_type}</TableCell>
                <TableCell>
                  {vacation.start_date} ~ {vacation.end_date}
                </TableCell>
                <TableCell>{vacation.status}</TableCell>
                <TableCell>{vacation.created_at.slice(0, 10)}</TableCell>
                <TableCell>
                  <Button type="button" variant="outline" size="sm" disabled={isReviewed} onClick={() => setSelectedVacation(vacation)}>
                    {isReviewed ? '처리완료' : '검토'}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
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
    </>
  );
};

export default AdminVacationTable;
