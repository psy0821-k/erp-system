export interface employeesType {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: string;
  role: string;
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
