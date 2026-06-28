'use client';

import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '@/components/ui/table';
import { Vacation } from '../type/vacationType';

interface Props {
  vacations: Vacation[];
}

function GetTodayVacationTable({ vacations }: Props) {
  return (
    <div className="w-full">
      <Table>
        <TableHeader className="bg-slate-50/70 border-b border-slate-200">
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-center font-semibold text-slate-600 h-11">이름</TableHead>
            <TableHead className="text-center font-semibold text-slate-600 h-11">부서</TableHead>
            <TableHead className="text-center font-semibold text-slate-600 h-11">휴가종류</TableHead>
            <TableHead className="text-center font-semibold text-slate-600 h-11">휴가기간</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100">
          {vacations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10 text-slate-400 text-sm">
                오늘 휴가 중인 직원이 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            vacations.map(vacation => (
              <TableRow key={vacation.id} className="hover:bg-slate-50/40 transition-colors text-center">
                <TableCell className="font-bold text-slate-800 text-sm py-3.5">{vacation.employee?.name}</TableCell>
                <TableCell className="text-slate-600 text-sm font-medium">{vacation.employee?.department}</TableCell>
                <TableCell className="text-slate-700 text-sm font-medium">{vacation.vacation_type}</TableCell>
                <TableCell className="font-mono text-xs text-slate-500 font-medium">
                  {vacation.start_date} - {vacation.end_date}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default GetTodayVacationTable;
