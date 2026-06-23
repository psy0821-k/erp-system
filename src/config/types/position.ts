export const POSITION = {
  STAFF: 'STAFF',
  SENIOR: 'SENIOR',
  ASSISTANT_MANAGER: 'ASSISTANT_MANAGER',
  MANAGER: 'MANAGER',
  DEPUTY_GENERAL_MANAGER: 'DEPUTY_GENERAL_MANAGER',
  GENERAL_MANAGER: 'GENERAL_MANAGER',
  DIRECTOR: 'DIRECTOR',
} as const;

export type Position = (typeof POSITION)[keyof typeof POSITION];

export const POSITION_OPTIONS = [
  { title: '사원', value: POSITION.STAFF },
  { title: '주임', value: POSITION.SENIOR },
  { title: '대리', value: POSITION.ASSISTANT_MANAGER },
  { title: '과장', value: POSITION.MANAGER },
  { title: '차장', value: POSITION.DEPUTY_GENERAL_MANAGER },
  { title: '부장', value: POSITION.GENERAL_MANAGER },
  { title: '이사', value: POSITION.DIRECTOR },
] as const;
