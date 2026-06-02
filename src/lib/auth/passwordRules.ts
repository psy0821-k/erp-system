export const passwordRules = [
  {
    label: '8자 이상',
    validate: (value: string) => value.length >= 8,
    message: '비밀번호는 8자 이상이어야 합니다.',
  },
  {
    label: '대문자 포함',
    validate: (value: string) => /[A-Z]/.test(value),
    message: '대문자를 포함해야 합니다.',
  },
  {
    label: '소문자 포함',
    validate: (value: string) => /[a-z]/.test(value),
    message: '소문자를 포함해야 합니다.',
  },
  {
    label: '숫자 포함',
    validate: (value: string) => /[0-9]/.test(value),
    message: '숫자를 포함해야 합니다.',
  },
  {
    label: '특수문자 포함',
    validate: (value: string) => /[!@#$%^&*]/.test(value),
    message: '특수문자를 포함해야 합니다.',
  },
  {
    label: '공백 없음',
    validate: (value: string) => value.length > 0 && /^\S+$/.test(value),
    message: '공백은 사용할 수 없습니다.',
  },
];
