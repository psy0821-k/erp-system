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
