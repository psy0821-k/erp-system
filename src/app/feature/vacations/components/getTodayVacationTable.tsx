'use client';

import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '@/components/ui/table';
import { Vacation } from '../type/vacationType';
import { cn } from '@/lib/utils';
import { tableStyle } from '@/app/style/tableStyle';

interface Props {
  vacations: Vacation[];
}

function GetTodayVacationTable({ vacations }: Props) {
  return (
    <div className="w-full p-4">
      <Table>
        <TableHeader className="bg-slate-50/70 border-b border-slate-200">
          <TableRow className="hover:bg-transparent">
            <TableHead className={cn(tableStyle.header)}>이름</TableHead>
            <TableHead className={cn(tableStyle.header)}>부서</TableHead>
            <TableHead className={cn(tableStyle.header)}>휴가종류</TableHead>
            <TableHead className={cn(tableStyle.header)}>휴가기간</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100">
          {vacations.length === 0 ? (
            <TableRow className={cn(tableStyle.row)}>
              <TableCell colSpan={4} className="text-center py-10 text-slate-400 text-sm">
                오늘 휴가 중인 직원이 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            vacations.map(vacation => (
              <TableRow key={vacation.id} className={cn(tableStyle.row)}>
                <TableCell className={cn(tableStyle.employeeName)}>{vacation.employee?.name}</TableCell>
                <TableCell className={cn(tableStyle.employeeDepartment)}>{vacation.employee?.department}</TableCell>
                <TableCell className="text-slate-700 text-sm font-medium">{vacation.vacation_type}</TableCell>
                <TableCell className={cn(tableStyle.date)}>
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
