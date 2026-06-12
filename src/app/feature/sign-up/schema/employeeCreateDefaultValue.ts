import { EmployeeCreateInput } from './employeeSchema';

export const employeeCreateDefaultValues: EmployeeCreateInput = {
  name: '',
  email: '',
  password: 'Password123!',
  employee_number: '',
  hire_date: '',
  department: '',
  position: '',
  role: '',
  status: 'ACTIVE',
  authority_level: 0,
};
