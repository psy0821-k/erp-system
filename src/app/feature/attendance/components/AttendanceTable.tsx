'use client';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Attendance } from '../type/attendance';
import { attendanceTableHeaders } from '../type/attendanceheaders';
import AttendanceEditDialog from './AttendanceEditDialog';
import { cn } from '@/lib/utils';
import { tableStyle } from '@/app/style/tableStyle';
import StatusBadge from '@/components/ui/statusBadge';
import { ATTENDANCE_STATUS_LABEL } from '@/config/types/attendanceStatus';
import { ATTENDANCE_STATUS_BADGE_MAP } from '@/components/badge';

interface Props {
  attendances: Attendance[];
}

export default function AttendanceTable({ attendances }: Props) {
  return (
    <div className="w-full p-4">
      <Table>
        <TableCaption className="sr-only">근태 목록</TableCaption>

        <TableHeader className={tableStyle.header}>
          <TableRow className="hover:bg-transparent">
            {attendanceTableHeaders.map(item => (
              <TableHead key={item.key} scope="col" className={cn(tableStyle.cell, 'text-center font-semibold')}>
                {item.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
          {attendances.map(attendance => (
            <TableRow key={attendance.id} className={tableStyle.row}>
              <TableCell className={cn(tableStyle.employeeNumber)}>{attendance.employee?.employee_number}</TableCell>
              <TableCell className={cn(tableStyle.employeeName)}>{attendance.employee?.name}</TableCell>
              <TableCell className={cn(tableStyle.employeeDepartment)}>{attendance.employee?.department}</TableCell>
              <TableCell className={cn(tableStyle.cell, 'text-sm text-slate-500 dark:text-slate-400')}>{attendance.employee?.position}</TableCell>
              <TableCell className={cn(tableStyle.cell, tableStyle.date)}>{attendance.work_date}</TableCell>
              <TableCell className={tableStyle.cell}>
                <StatusBadge label={ATTENDANCE_STATUS_LABEL[attendance.status]} variant={ATTENDANCE_STATUS_BADGE_MAP[attendance.status]} />
              </TableCell>
              <TableCell className={tableStyle.cell}>
                {attendance.late_reason ? <StatusBadge label="O" variant="success" /> : <StatusBadge label="X" variant="danger" />}
              </TableCell>
              <TableCell className="px-6 py-2">
                <div className="inline-flex w-full justify-center">
                  <AttendanceEditDialog attendance={attendance} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
