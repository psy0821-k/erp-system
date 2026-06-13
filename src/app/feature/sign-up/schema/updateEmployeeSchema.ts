import { z } from 'zod';

export const updateEmployeeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2, '이름은 2글자 이상 입력해 주세요.'),
  department: z.string().min(1, '부서를 선택해 주세요.'),
  position: z.string().min(1, '직급을 선택해 주세요.'),
  role: z.string().min(1, '역할을 선택해 주세요.'),
  status: z.string().min(1, '재직 상태를 선택해 주세요.'),
  hire_date: z.string().min(1, '입사일을 선택해 주세요.'),
  authority_level: z.number(),
});

export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
