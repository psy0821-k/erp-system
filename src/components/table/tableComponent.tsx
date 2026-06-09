import { employeeTableHeaders } from '@/app/mock-data/hr';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import Link from 'next/link';
import { getEmployees } from '@/app/(dashboard)/employee/getEmployees';

interface Props {
  keyword: string;
  page: number;
}

const TableComponent = async ({ keyword, page }: Props) => {
  const employees = await getEmployees(keyword, page);
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
        {employees?.map(employee => (
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
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
