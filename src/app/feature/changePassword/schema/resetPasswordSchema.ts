import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, '비밀번호는 최소 8자 이상 입력해주세요.'),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine(values => values.password === values.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type ResetPasswordFormInput = z.infer<typeof resetPasswordSchema>;
