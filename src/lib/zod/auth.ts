import { z } from 'zod';
import { passwordRules } from '@/lib/auth/passwordRules';

export const signUpSchema = z
  .object({
    name: z.string().min(2, '이름은 2자 이상 입력해주세요.'),
    email: z.email('올바른 이메일 형식이 아닙니다.'),
    password: z.string(),
    confirmPassword: z.string(),
    department: z.string().min(1, '직무를 선택해주세요.'),
  })
  .superRefine((data, ctx) => {
    passwordRules.forEach(rule => {
      if (!rule.validate(data.password)) {
        ctx.addIssue({
          code: 'custom',
          path: ['password'],
          message: rule.message,
        });
      }
    });

    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(8, '비밀번호를 입력해주세요.'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
