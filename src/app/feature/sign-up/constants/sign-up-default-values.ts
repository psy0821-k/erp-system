import { z } from 'zod';
import { employeeCreateSchema } from '../schema/employeeSchema';

export const signUpDefaultValues: z.infer<typeof employeeCreateSchema> = {
  name: '',
  email: '',
  employee_number: '',
  password: 'Password123!',
  department: '',
  position: '',
  role: 'EMPLOYEE',
  status: 'ACTIVE',
  hire_date: '',
  authority_level: 0,
};
