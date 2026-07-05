'use client';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Attendance } from '../type/attendance';
import { attendanceTableHeaders } from '../type/attendanceheaders';
import AttendanceEditDialog from './AttendanceEditDialog';
import { Badge } from '@/components/ui/badge';

interface Props {
  late_users: Attendance[];
}

export default function AttendanceLateTable({ late_users }: Props) {
  const getAttendanceStatusColor = 'bg-amber-50 text-amber-700 border-amber-200';

  return (
    <div className="w-full">
      <Table>
        <TableCaption className="sr-only">근태 목록</TableCaption>

        <TableHeader className="bg-slate-50/70 border-b border-slate-200">
          <TableRow className="hover:bg-transparent">
            {attendanceTableHeaders.map(item => (
              <TableHead key={item.key} scope="col" className="text-center font-semibold text-slate-600 h-11">
                {item.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100">
          {late_users.map(late_user => (
            <TableRow key={late_user.id} className="hover:bg-slate-50/40 transition-colors text-center">
              <TableCell className="font-mono text-xs text-slate-400 py-3.5">{late_user.employee?.employee_number}</TableCell>
              <TableCell className="font-bold text-slate-800 text-sm">{late_user.employee?.name}</TableCell>
              <TableCell className="text-slate-600 text-sm font-medium">{late_user.employee?.department}</TableCell>
              <TableCell className="text-slate-500 text-sm">{late_user.employee?.position}</TableCell>
              <TableCell className="font-mono text-xs text-slate-600">{late_user.work_date}</TableCell>

              <TableCell>
                <Badge variant="outline" className={`rounded-full shadow-none px-2.5 py-0.5 font-medium text-xs ${getAttendanceStatusColor}`}>
                  {late_user.status}
                </Badge>
              </TableCell>

              <TableCell>
                {late_user.late_reason ? (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
                    O
                  </span>
                ) : (
                  <span className="text-slate-300 font-mono text-sm">X</span>
                )}
              </TableCell>

              <TableCell className="py-2">
                <div className="inline-flex justify-center w-full">
                  <AttendanceEditDialog attendance={late_user} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
