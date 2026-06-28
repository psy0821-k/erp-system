'use client';

import { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { myVacationTableHeaders } from './VacationTableHeader';
import { Vacation } from '../type/vacationType';
import VacationResultModal from './VacationResultModal';
import { Badge } from '@/components/ui/badge';

type Props = {
  vacations: Vacation[];
  isModalBtn?: boolean;
};

const MyVacationTable = ({ vacations, isModalBtn = false }: Props) => {
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
    <div className="w-full">
      <Table>
        <TableCaption className="sr-only">나의 휴가 신청 목록</TableCaption>

        <TableHeader className="bg-slate-50/70 border-b border-slate-200">
          <TableRow className="hover:bg-transparent">
            {myVacationTableHeaders.map(item => (
              <TableHead key={item.key} scope="col" className="text-center font-semibold text-slate-600 h-11">
                {item.label}
              </TableHead>
            ))}
            {isModalBtn && (
              <TableHead scope="col" className="text-center font-semibold text-slate-600 h-11">
                상세
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100">
          {vacations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={isModalBtn ? 4 : 3} className="text-center py-12 text-slate-400 text-sm">
                휴가 신청 내역이 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            vacations.map(vacation => (
              <TableRow key={vacation.id} className="hover:bg-slate-50/40 transition-colors text-center">
                <TableCell className="font-bold text-slate-700 text-sm py-3.5">{vacation.vacation_type}</TableCell>

                <TableCell className="text-xs text-slate-600 font-medium leading-relaxed">
                  <span className="font-mono text-slate-700">{vacation.start_date}</span>
                  <span className="text-slate-300 mx-1">~</span>
                  <br className="sm:hidden" />
                  <span className="font-mono text-slate-700">{vacation.end_date}</span>
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className={`rounded-full shadow-none px-2 py-0.5 font-medium text-xs ${getStatusBadge(vacation.status)}`}>
                    {vacation.status}
                  </Badge>
                </TableCell>

                {isModalBtn && (
                  <TableCell className="py-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-xl border-slate-200 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50"
                      onClick={() => setSelectedVacation(vacation)}
                    >
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
    </div>
  );
};

export default MyVacationTable;
