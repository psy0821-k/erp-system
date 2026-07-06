import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Props {
  columns?: number;
  rows?: number;
}

export default function TableSkeleton({ columns = 8, rows = 5 }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Array.from({ length: columns }).map((_, index) => (
            <TableHead key={index}>
              <Skeleton className="mx-auto h-4 w-16" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton className="h-5 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
