import { passwordSchema } from '@/app/Schema/passwordSchema';
import { z } from 'zod';

export const employeeCreateSchema = z.object({
  name: z.string().min(2, '이름은 2글자 이상 입력해 주세요.'),
  email: z.email('올바른 이메일을 입력해 주세요.'),
  password: passwordSchema,
  employee_number: z.string().min(1, '사번을 입력해 주세요.'),

  hire_date: z.string().min(1, '입사일을 선택해 주세요.'),

  department: z.string().min(1, '부서를 선택해 주세요.'),
  position: z.string().min(1, '직급을 선택해 주세요.'),
  role: z.string().min(1, '역할을 선택해 주세요.'),
  status: z.string().min(1),
  authority_level: z.number(),
});

export const EmployeeRoleSchema = z.enum(['ADMIN', 'HR_MANAGER', 'APPROVAL_MANAGER', 'ASSET_MANAGER', 'EMPLOYEE', 'TEAM_LEADER']);

export type EmployeeCreateInput = z.infer<typeof employeeCreateSchema>;
export type EmployeeRole = z.infer<typeof EmployeeRoleSchema>;
