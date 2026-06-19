import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Vacation } from '../type/vacationType';

interface Props {
  vacations: Vacation[];
}

function GetTodayVacationTable({ vacations }: Props) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>금일 휴가자</CardTitle>
      </CardHeader>

      <CardContent>
        <Table className="text-center">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">이름</TableHead>
              <TableHead className="text-center">부서</TableHead>
              <TableHead className="text-center">휴가종류</TableHead>
              <TableHead className="text-center">휴가기간</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="border">
            {vacations.map(vacation => (
              <TableRow key={vacation.id}>
                <TableCell>{vacation.employee?.name}</TableCell>
                <TableCell>{vacation.employee?.department}</TableCell>
                <TableCell>{vacation.vacation_type}</TableCell>
                <TableCell>
                  {vacation.start_date} - {vacation.end_date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default GetTodayVacationTable;
