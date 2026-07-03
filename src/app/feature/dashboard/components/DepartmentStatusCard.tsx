import { Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const departments = [
  { name: '개발팀', count: 12 },
  { name: '디자인팀', count: 4 },
  { name: '인사팀', count: 2 },
  { name: '영업팀', count: 5 },
];

export default function DepartmentStatusCard() {
  const total = departments.reduce((acc, department) => acc + department.count, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">부서별 인원 현황</CardTitle>
        <Users className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
      </CardHeader>

      <CardContent>
        <ul className="space-y-4">
          {departments.map(department => {
            const percent = total > 0 ? Math.round((department.count / total) * 100) : 0;

            return (
              <li key={department.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{department.name}</span>
                  <span className="text-muted-foreground">{department.count}명</span>
                </div>

                <Progress value={percent} aria-label={`${department.name} 인원 비율 ${percent}%`} />
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
