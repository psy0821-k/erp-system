'use client';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { employeesType } from '@/app/feature/employees/types/employeeType';
import { vacationTableHeaders } from './VacationTableHeader';

type Props = {
  employees: employeesType[];
};

const VacationTable = ({ employees }: Props) => {
  return (
    <Table>
      <TableCaption className="sr-only">직원 목록</TableCaption>

      <TableHeader>
        <TableRow>
          {vacationTableHeaders.map(item => (
            <TableHead key={item.key} scope="col" className="text-center">
              {item.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className="border">
        {employees?.map(employee => (
          <TableRow key={employee.id} className="text-center">
            <TableCell>{employee.employee_number}</TableCell>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>{employee.position}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default VacationTable;
