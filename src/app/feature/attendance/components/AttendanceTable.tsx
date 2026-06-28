'use client';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Attendance } from '../type/attendance';
import { attendanceTableHeaders } from '../type/attendanceheaders';
import AttendanceEditDialog from './AttendanceEditDialog';
import { Badge } from '@/components/ui/badge';

interface Props {
  attendances: Attendance[];
}

export default function AttendanceTable({ attendances }: Props) {
  const getAttendanceStatusColor = (status: string) => {
    switch (status) {
      case '출근':
      case '정상':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case '지각':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case '결근':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

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
          {attendances.map(attendance => (
            <TableRow key={attendance.id} className="hover:bg-slate-50/40 transition-colors text-center">
              <TableCell className="font-mono text-xs text-slate-400 py-3.5">{attendance.employee?.employee_number}</TableCell>
              <TableCell className="font-bold text-slate-800 text-sm">{attendance.employee?.name}</TableCell>
              <TableCell className="text-slate-600 text-sm font-medium">{attendance.employee?.department}</TableCell>
              <TableCell className="text-slate-500 text-sm">{attendance.employee?.position}</TableCell>
              <TableCell className="font-mono text-xs text-slate-600">{attendance.work_date}</TableCell>

              <TableCell>
                <Badge
                  variant="outline"
                  className={`rounded-full shadow-none px-2.5 py-0.5 font-medium text-xs ${getAttendanceStatusColor(attendance.status)}`}
                >
                  {attendance.status}
                </Badge>
              </TableCell>

              <TableCell>
                {attendance.late_reason ? (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
                    O
                  </span>
                ) : (
                  <span className="text-slate-300 font-mono text-sm">X</span>
                )}
              </TableCell>

              <TableCell className="py-2">
                <div className="inline-flex justify-center w-full">
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
