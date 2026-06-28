'use client';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { employeesType } from '@/app/feature/employees/types/employeeType';
import { vacationTableHeaders } from './VacationTableHeader';

type Props = {
  employees: employeesType[];
};

const VacationTable = ({ employees }: Props) => {
  return (
    <div className="w-full">
      <Table>
        <TableCaption className="sr-only">직원 목록</TableCaption>

        <TableHeader className="bg-slate-50/70 border-b border-slate-200">
          <TableRow className="hover:bg-transparent">
            {vacationTableHeaders.map(item => (
              <TableHead key={item.key} scope="col" className="text-center font-semibold text-slate-600 h-11">
                {item.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100">
          {employees?.map(employee => (
            <TableRow key={employee.id} className="hover:bg-slate-50/40 transition-colors text-center">
              <TableCell className="font-mono text-xs text-slate-400 py-3.5">{employee.employee_number}</TableCell>
              <TableCell className="font-bold text-slate-800 text-sm">{employee.name}</TableCell>
              <TableCell className="text-slate-600 text-sm font-medium">{employee.department}</TableCell>
              <TableCell className="text-slate-500 text-sm">{employee.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VacationTable;
