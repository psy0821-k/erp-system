'use client';
import { employeeTableHeaders } from '@/app/mock-data/hr';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { employeesType } from '@/app/feature/employees/types/employeeType';
import EmployeeEditDialog from './employee-edit-dialog';
import EmployeeDeleteButton from './employee-delete-button';

type Props = {
  employees: employeesType[];
};

const EmployeeTable = ({ employees }: Props) => {
  return (
    <Table>
      <TableCaption className="sr-only">직원 목록</TableCaption>

      <TableHeader>
        <TableRow>
          {employeeTableHeaders.map(item => (
            <TableHead key={item.key} scope="col" className="text-center">
              {item.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className="border">
        {}
        {employees?.map(employee => (
          <TableRow key={employee.id} className="text-center">
            <TableCell>{employee.employee_number}</TableCell>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>{employee.position}</TableCell>
            <TableCell>{employee.role}</TableCell>
            <TableCell>{employee.status}</TableCell>
            <TableCell>
              <Link href={`/employee/${employee.id}`} className="mr-4">
                자세히보기
              </Link>
              <EmployeeEditDialog employee={employee} />
              <EmployeeDeleteButton id={employee.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
