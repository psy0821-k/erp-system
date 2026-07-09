import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EmployeeDetailDialog from './EmployeeDetailDialog';
import EmployeeEditDialog from './employee-edit-dialog';
import EmployeeDeleteButton from './employee-delete-button';
import { employeesType } from '../types/employeeType';
import { cn } from '@/lib/utils';
import { tableStyle } from '@/app/style/tableStyle';
type Props = {
  employees: employeesType[];
};

export const EmployeeTable = ({ employees }: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm p-4">
      <Table>
        <caption className="sr-only">직원 목록</caption>

        <TableHeader>
          <TableRow className="border-b border-slate-200 hover:bg-transparent">
            <TableHead className={cn(tableStyle.header)}>사번</TableHead>
            <TableHead className={cn(tableStyle.header)}>이름</TableHead>
            <TableHead className={cn(tableStyle.header)}>부서 / 직위</TableHead>
            <TableHead className={cn(tableStyle.header)}>권한</TableHead>
            <TableHead className={cn(tableStyle.header)}>상태</TableHead>
            <TableHead className={cn(tableStyle.header)}>관리</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees?.map(employee => (
            <TableRow key={employee.id} className={cn(tableStyle.employeeRow, tableStyle.row)}>
              <TableCell className={cn(tableStyle.employeeNumber)}>{employee.employee_number}</TableCell>
              <TableCell className={cn(tableStyle.employeeName)}>{employee.name}</TableCell>
              <TableCell className={cn(tableStyle.employeeDepartment)}>
                <span className="font-medium text-slate-700">{employee.department}</span>
                <span aria-hidden className="mx-1.5 text-slate-400">
                  |
                </span>
                <span className="text-xs text-slate-500">{employee.position}</span>
              </TableCell>

              <TableCell className="">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{employee.role}</span>
              </TableCell>

              <TableCell className="w-full md:w-[15%] md:text-center">
                <span
                  className={`mr-2 inline-block h-2 w-2 rounded-full ${
                    employee.status === '재직' ? 'bg-emerald-500' : employee.status === '휴직' ? 'bg-amber-400' : 'bg-slate-300'
                  }`}
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-slate-700">{employee.status}</span>
              </TableCell>

              <TableCell className="w-full text-right md:w-[20%] pr-11">
                <EmployeeDetailDialog employee={employee} />
                <EmployeeEditDialog employee={employee} />
                <EmployeeDeleteButton id={employee.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
