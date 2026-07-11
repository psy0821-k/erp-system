import { EmployeeRole } from '../../sign-up/schema/employeeSchema';

export interface employeesType {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: string;
  role: EmployeeRole;
  hire_date: string;
  created_at: string;
  employee_number: string;
  authority_level: number;
}

export type CreateEmployeeInput = {
  name: string;
  email: string;
  employee_number: string;
  department: string;
  position: string;
  role: string;
  status: string;
  authority_level: number;
};

export type UpdateEmployeeInput = {
  id: string;
  name: string;
  department: string;
  position: string;
  role: string;
  status: string;
  hire_date: string;
  authority_level: number;
};
