// import { employees, employeeTableHeaders } from '@/app/mock-data/hr';
import { employeeTableHeaders } from '@/app/mock-data/hr';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import Link from 'next/link';
import { getAllCurrentEmployee } from '@/app/api/getEmployee';

const TableComponent = async () => {
  const employees = await getAllCurrentEmployee();
  return (
    <Table>
      <TableCaption className="sr-only">직원 목록</TableCaption>

      <TableHeader>
        <TableRow>
          {employeeTableHeaders.map(item => {
            return (
              <TableHead key={item.key} scope="col" className="text-center">
                {item.label}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>

      <TableBody className="border">
        {employees?.map(employee => {
          return (
            <TableRow key={employee.id} className="text-center">
              <TableCell>{employee.employee_number}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>{employee.status}</TableCell>
              <TableCell>
                <Link href={`/employee/${employee.id}`}>자세히보기</Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
