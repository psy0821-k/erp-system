export type AttendanceStatus = null | 'PRESENT' | 'LATE' | 'ABSENT' | 'BUSINESS_TRIP' | 'VACATION';
export type EmployeeRole = 'ADMIN' | 'HR_MANAGER' | 'INVENTORY_MANAGER' | 'EMPLOYEE';

export interface Employee {
  id: number;
  employeeNumber: string;
  name: string;
  department: string;
  position: string;
  role: EmployeeRole;
  status: AttendanceStatus;

  checkIn: string | null;
  checkOut: string | null;
  workHours: number;
}

export const employees: Employee[] = [
  {
    id: 1,
    employeeNumber: 'EMP-1001',
    name: '김성윤',
    department: '프론트엔드팀',
    position: '주니어 개발자',
    role: 'EMPLOYEE',
    status: 'PRESENT',
    checkIn: '08:57',
    checkOut: null,
    workHours: 7.5,
  },
  {
    id: 2,
    employeeNumber: 'EMP-1002',
    name: '이민호',
    department: '백엔드팀',
    position: '시니어 개발자',
    role: 'EMPLOYEE',
    status: 'PRESENT',
    checkIn: '08:43',
    checkOut: null,
    workHours: 8.1,
  },
  {
    id: 3,
    employeeNumber: 'EMP-1003',
    name: '박지수',
    department: '디자인팀',
    position: 'UI/UX 디자이너',
    role: 'EMPLOYEE',
    status: 'LATE',
    checkIn: '09:18',
    checkOut: null,
    workHours: 6.9,
  },
  {
    id: 4,
    employeeNumber: 'EMP-1004',
    name: '최현우',
    department: '인사팀',
    position: 'HR 매니저',
    role: 'HR_MANAGER',
    status: 'ABSENT',
    checkIn: null,
    checkOut: null,
    workHours: 0,
  },
  {
    id: 5,
    employeeNumber: 'EMP-1005',
    name: '정하늘',
    department: '물류관리팀',
    position: '운영 담당자',
    role: 'INVENTORY_MANAGER',
    status: 'PRESENT',
    checkIn: '08:51',
    checkOut: null,
    workHours: 7.8,
  },
  {
    id: 6,
    employeeNumber: 'EMP-1006',
    name: '윤태준',
    department: '기획팀',
    position: '서비스 기획자',
    role: 'EMPLOYEE',
    status: 'VACATION',
    checkIn: null,
    checkOut: null,
    workHours: 0,
  },
  {
    id: 7,
    employeeNumber: 'EMP-1007',
    name: '강민석',
    department: '프론트엔드팀',
    position: '시니어 개발자',
    role: 'ADMIN',
    status: 'PRESENT',
    checkIn: '08:39',
    checkOut: null,
    workHours: 8.4,
  },
  {
    id: 8,
    employeeNumber: 'EMP-1008',
    name: '서유진',
    department: '마케팅팀',
    position: '마케팅 매니저',
    role: 'EMPLOYEE',
    status: 'LATE',
    checkIn: '09:27',
    checkOut: null,
    workHours: 6.4,
  },
  {
    id: 9,
    employeeNumber: 'EMP-1009',
    name: '오지훈',
    department: '재무팀',
    position: '재무 담당자',
    role: 'EMPLOYEE',
    status: 'PRESENT',
    checkIn: '08:48',
    checkOut: null,
    workHours: 7.9,
  },
  {
    id: 10,
    employeeNumber: 'EMP-1010',
    name: '한소희',
    department: '고객지원팀',
    position: 'CS 담당자',
    role: 'EMPLOYEE',
    status: 'VACATION',
    checkIn: null,
    checkOut: null,
    workHours: 0,
  },
];
