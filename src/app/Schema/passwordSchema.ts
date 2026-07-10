// src/lib/schema/passwordSchema.ts

import * as z from 'zod';

export const passwordSchema = z
  .string()
  .min(8, '비밀번호는 8자 이상 입력해 주세요.')
  .refine(val => /[A-Z]/.test(val), {
    message: '영문 대문자가 최소 1개 이상 포함되어야 합니다.',
  })
  .refine(val => /[a-z]/.test(val), {
    message: '영문 소문자가 최소 1개 이상 포함되어야 합니다.',
  })
  .refine(val => /[0-9]/.test(val), {
    message: '숫자가 최소 1개 이상 포함되어야 합니다.',
  })
  .refine(val => /[$@$!%*?&]/.test(val), {
    message: '특수문자가 최소 1개 이상 포함되어야 합니다.',
  });
