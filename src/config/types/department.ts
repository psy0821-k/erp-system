export const DEPARTMENT_TYPE = {
  HR: 'HR',
  FRONTEND: 'FRONTEND',
  BACKEND: 'BACKEND',
  DESIGN: 'DESIGN',
  PLANNING: 'PLANNING',
  MARKETING: 'MARKETING',
  SALES: 'SALES',
  FINANCE: 'FINANCE',
} as const;

export type DepartmentType = (typeof DEPARTMENT_TYPE)[keyof typeof DEPARTMENT_TYPE];

export const DEPARTMENT_TYPE_OPTIONS = [
  { title: '인사팀', value: 'HR' },
  { title: '프론트엔드팀', value: 'FRONTEND' },
  { title: '백엔드팀', value: 'BACKEND' },
  { title: '디자인팀', value: 'DESIGN' },
  { title: '기획팀', value: 'PLANNING' },
  { title: '마케팅팀', value: 'MARKETING' },
  { title: '영업팀', value: 'SALES' },
  { title: '재무팀', value: 'FINANCE' },
];

export const DEPARTMENT_LABEL: Record<DepartmentType, string> = {
  HR: '인사팀',
  FRONTEND: '프론트엔드팀',
  BACKEND: '백엔드팀',
  DESIGN: '디자인팀',
  PLANNING: '기획팀',
  MARKETING: '마케팅팀',
  SALES: '영업팀',
  FINANCE: '재무팀',
};
