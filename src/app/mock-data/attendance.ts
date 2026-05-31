export const attendanceTableHeaders = [
  { key: 'date', label: '일자' },
  { key: 'name', label: '이름' },
  { key: 'department', label: '부서' },
  { key: 'checkIn', label: '출근 시간' },
  { key: 'checkOut', label: '퇴근 시간' },
  { key: 'status', label: '상태' },
];

export const attendanceRecords = [
  {
    id: 'ATT001',
    employeeId: 'EMP001',
    name: '김민준',
    department: '경영지원팀',
    date: '2026-05-29',
    checkIn: '09:00',
    checkOut: '18:05',
    status: '정상',
  },
  {
    id: 'ATT002',
    employeeId: 'EMP002',
    name: '이서연',
    department: '인사팀',
    date: '2026-05-29',
    checkIn: '09:12',
    checkOut: '18:00',
    status: '지각',
  },
  {
    id: 'ATT003',
    employeeId: 'EMP008',
    name: '강서준',
    department: '물류운영팀',
    date: '2026-05-29',
    checkIn: '-',
    checkOut: '-',
    status: '휴직',
  },
];
