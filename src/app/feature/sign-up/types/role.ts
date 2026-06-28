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

export const departments = {
  title: '부서',
  value: 'department',
  items: [
    { title: '인사팀', value: 'HR' },
    { title: '프론트엔드팀', value: 'FRONTEND' },
    { title: '백엔드팀', value: 'BACKEND' },
    { title: '디자인팀', value: 'DESIGN' },
    { title: '기획팀', value: 'PLANNING' },
    { title: '마케팅팀', value: 'MARKETING' },
    { title: '영업팀', value: 'SALES' },
    { title: '재무팀', value: 'FINANCE' },
  ],
} as const;
