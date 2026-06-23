export const DEPARTMENT_TYPE = {
  FRONTEND: 'FRONTEND',
  BACKEND: 'BACKEND',
  DESIGN: 'DESIGN',
  PLANNING: 'PLANNING',
  HR: 'HR',
} as const;

export type DepartmentType = (typeof DEPARTMENT_TYPE)[keyof typeof DEPARTMENT_TYPE];

export const DEPARTMENT_TYPE_OPTIONS = [
  { title: '프론트엔드팀', value: 'FRONTEND' },
  { title: '백엔드팀', value: 'BACKEND' },
  { title: '디자인팀', value: 'DESIGN' },
  { title: '기획팀', value: 'PLANNING' },
  { title: '인사팀', value: 'HR' },
];
