import z from 'zod';

export const formSchema = z.object({
  name: z.string(),
  department: z.string().min(1),
  position: z.string(),
  role: z.string(),
  employee_number: z.string(),
  status: z.string(),
  email: z.email('이메일 형식에 맞게 작성해 주세요'),
  password: z.string().min(8, '비밀번호는 8자 이상 입력해 주세요'),
  hire_date: z.string(),
  authority_value: z.number(),
});
