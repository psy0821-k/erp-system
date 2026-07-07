'use client';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { employeesType } from '@/app/feature/employees/types/employeeType';
import { vacationTableHeaders } from './VacationTableHeader';
import { cn } from '@/lib/utils';
import { tableStyle } from '@/app/style/tableStyle';

type Props = {
  employees: employeesType[];
};

const VacationTable = ({ employees }: Props) => {
  return (
    <div className="w-full p-4">
      <Table>
        <TableCaption className="sr-only">직원 목록</TableCaption>

        <TableHeader className="bg-slate-50/70 border-b border-slate-200">
          <TableRow className="hover:bg-transparent">
            {vacationTableHeaders.map(item => (
              <TableHead key={item.key} scope="col" className={cn(tableStyle.header)}>
                {item.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100">
          {employees?.map(employee => (
            <TableRow key={employee.id} className={cn(tableStyle.row)}>
              <TableCell className={cn(tableStyle.employeeNumber)}>{employee.employee_number}</TableCell>
              <TableCell className={cn(tableStyle.employeeName)}>{employee.name}</TableCell>
              <TableCell className={cn(tableStyle.employeeDepartment)}>{employee.department}</TableCell>
              <TableCell className="text-slate-500 text-sm">{employee.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VacationTable;
