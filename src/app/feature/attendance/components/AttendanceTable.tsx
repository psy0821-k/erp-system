'use client';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Attendance } from '../type/attendance';
import { attendanceTableHeaders } from '../type/attendanceheaders';
import AttendanceEditDialog from './AttendanceEditDialog';

interface Props {
  attendances: Attendance[];
}

export default function AttendanceTable({ attendances }: Props) {
  return (
    <Table>
      <TableCaption className="sr-only">근태 목록</TableCaption>

      <TableHeader>
        <TableRow>
          {attendanceTableHeaders.map(item => (
            <TableHead key={item.key} scope="col" className="text-center">
              {item.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className="border">
        {attendances.map(attendance => (
          <TableRow key={attendance.id} className="text-center">
            <TableCell>{attendance.employee?.employee_number}</TableCell>
            <TableCell>{attendance.employee?.name}</TableCell>
            <TableCell>{attendance.employee?.department}</TableCell>
            <TableCell>{attendance.employee?.position}</TableCell>
            <TableCell>{attendance.work_date}</TableCell>
            <TableCell>{attendance.status}</TableCell>
            <TableCell>{attendance.late_reason ? 'O' : 'X'}</TableCell>
            <TableCell>
              <AttendanceEditDialog attendance={attendance} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
