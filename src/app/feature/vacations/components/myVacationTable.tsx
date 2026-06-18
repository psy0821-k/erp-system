'use client';

import { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { myVacationTableHeaders } from './VacationTableHeader';
import { Vacation } from '../type/vacationType';
import VacationResultModal from './VacationResultModal';

type Props = {
  vacations: Vacation[];
  isModalBtn?: boolean;
};

const MyVacationTable = ({ vacations, isModalBtn = false }: Props) => {
  const [selectedVacation, setSelectedVacation] = useState<Vacation | null>(null);

  return (
    <>
      <Table>
        <TableCaption className="sr-only">나의 휴가 신청 목록</TableCaption>

        <TableHeader>
          <TableRow>
            {myVacationTableHeaders.map(item => (
              <TableHead key={item.key} scope="col" className="text-center">
                {item.label}
              </TableHead>
            ))}

            {isModalBtn && (
              <TableHead scope="col" className="text-center">
                상세
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody className="border">
          {vacations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={isModalBtn ? 4 : 3} className="text-center py-10 text-muted-foreground">
                휴가 신청 내역이 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            vacations.map(vacation => (
              <TableRow key={vacation.id} className="text-center">
                <TableCell>{vacation.vacation_type}</TableCell>

                <TableCell>
                  {vacation.start_date} ~ <br />
                  {vacation.end_date}
                </TableCell>

                <TableCell>{vacation.status}</TableCell>

                {isModalBtn && (
                  <TableCell>
                    <Button type="button" variant="outline" size="sm" onClick={() => setSelectedVacation(vacation)}>
                      자세히
                    </Button>
                  </TableCell>
                )}
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
    </>
  );
};

export default MyVacationTable;
