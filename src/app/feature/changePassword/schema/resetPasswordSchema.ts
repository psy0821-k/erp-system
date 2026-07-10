import { passwordSchema } from '@/app/Schema/passwordSchema';
import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    passwordConfirm: z.string().min(1, '비밀번호 확인을 위해 패스워드를 입력해주세요.'),
  })
  .refine(values => values.password === values.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type ResetPasswordFormInput = z.infer<typeof resetPasswordSchema>;
