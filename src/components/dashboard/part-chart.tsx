'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const departmentData = [
  { department: '프론트엔드팀', count: 28 },
  { department: '백엔드팀', count: 36 },
  { department: '디자인팀', count: 20 },
  { department: '기획팀', count: 18 },
  { department: '인사팀', count: 14 },
];

export default function DepartmentBarChart() {
  return (
    <div className="h-70">
      <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 1, height: 1 }}>
        <BarChart data={departmentData} layout="vertical" margin={{ top: 8, right: 24, left: 16, bottom: 8 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="department" width={90} tickLine={false} axisLine={false} />
          <Tooltip formatter={value => [`${value}명`, '인원']} />
          <Bar dataKey="count" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
