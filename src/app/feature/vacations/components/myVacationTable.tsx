'use client';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { myVacationTableHeaders } from './VacationTableHeader';
import { Vacation } from '../type/vacationType';

type Props = {
  vacations: Vacation[];
};

const MyVacationTable = ({ vacations }: Props) => {
  return (
    <Table>
      <TableCaption className="sr-only">직원 목록</TableCaption>

      <TableHeader>
        <TableRow>
          {myVacationTableHeaders.map(item => (
            <TableHead key={item.key} scope="col" className="text-center">
              {item.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className="border">
        {vacations?.map(vacation => (
          <TableRow key={vacation.id} className="text-center">
            <TableCell>{vacation.vacation_type}</TableCell>
            <TableCell>
              {vacation.start_date} ~ <br />
              {vacation.end_date}
            </TableCell>
            <TableCell>{vacation.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MyVacationTable;
