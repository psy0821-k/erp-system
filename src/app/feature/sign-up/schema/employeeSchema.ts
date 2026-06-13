import { z } from 'zod';

export const employeeCreateSchema = z.object({
  name: z.string().min(2, '이름은 2글자 이상 입력해 주세요.'),
  email: z.email('올바른 이메일을 입력해 주세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상 입력해 주세요.')
    .refine(val => /[A-Z]/.test(val), { message: '영문 대문자가 최소 1개 이상 포함되어야 합니다.' })
    .refine(val => /[a-z]/.test(val), { message: '영문 소문자가 최소 1개 이상 포함되어야 합니다.' })
    .refine(val => /[0-9]/.test(val), { message: '숫자가 최소 1개 이상 포함되어야 합니다.' })
    .refine(val => /[$@$!%*?&]/.test(val), { message: '특수문자가 최소 1개 이상 포함되어야 합니다.' }),

  employee_number: z.string().min(1, '사번을 입력해 주세요.'),

  hire_date: z.string().min(1, '입사일을 선택해 주세요.'),

  department: z.string().min(1, '부서를 선택해 주세요.'),
  position: z.string().min(1, '직급을 선택해 주세요.'),
  role: z.string().min(1, '역할을 선택해 주세요.'),
  status: z.string().min(1),
  authority_level: z.number(),
});

export type EmployeeCreateInput = z.infer<typeof employeeCreateSchema>;
