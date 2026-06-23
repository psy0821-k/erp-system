export interface OptionItem {
  title: string;
  value: string;
}

export interface OptionGroup {
  title: string;
  value: string;
  items: OptionItem[];
}

export const positions = {
  title: '직급',
  value: 'position',
  items: [
    { title: '사원', value: 'STAFF' },
    { title: '주임', value: 'ASSISTANT_MANAGER' },
    { title: '대리', value: 'MANAGER' },
    { title: '과장', value: 'SENIOR_MANAGER' },
    { title: '부장', value: 'DIRECTOR' },
  ],
} as const;

export const roles = {
  title: '권한',
  value: 'role',
  items: [
    { title: '관리자', value: 'ADMIN' },
    { title: '인사담당자', value: 'HR_MANAGER' },
    { title: '팀장', value: 'TEAM_LEADER' },
    { title: '일반직원', value: 'EMPLOYEE' },
  ],
} as const;
