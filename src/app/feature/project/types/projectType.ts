export const PROJECT_STATUS = {
  WAITING: 'WAITING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
} as const;

export type ProjectStatus = (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];

export const PROJECT_STATUS_OPTIONS = [
  { title: '대기중', value: PROJECT_STATUS.WAITING },
  { title: '진행중', value: PROJECT_STATUS.IN_PROGRESS },
  { title: '완료', value: PROJECT_STATUS.COMPLETED },
] as const;

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  [PROJECT_STATUS.WAITING]: '대기중',
  [PROJECT_STATUS.IN_PROGRESS]: '진행중',
  [PROJECT_STATUS.COMPLETED]: '완료',
};

export const PROJECT_MEMBER_ROLE = {
  PM: 'PM',
  FRONTEND: 'FRONTEND',
  BACKEND: 'BACKEND',
  DESIGNER: 'DESIGNER',
  QA: 'QA',
  PLANNER: 'PLANNER',
} as const;

export type ProjectMemberRole = (typeof PROJECT_MEMBER_ROLE)[keyof typeof PROJECT_MEMBER_ROLE];

export const PROJECT_MEMBER_ROLE_LABEL: Record<ProjectMemberRole, string> = {
  [PROJECT_MEMBER_ROLE.PM]: 'PM',
  [PROJECT_MEMBER_ROLE.FRONTEND]: '프론트엔드',
  [PROJECT_MEMBER_ROLE.BACKEND]: '백엔드',
  [PROJECT_MEMBER_ROLE.DESIGNER]: '디자이너',
  [PROJECT_MEMBER_ROLE.QA]: 'QA',
  [PROJECT_MEMBER_ROLE.PLANNER]: '기획자',
};

export interface ProjectMember {
  id: string;
  role: ProjectMemberRole;
  employee: {
    id: string;
    name: string;
    email: string;
    department: string;
    position: string;
  };
}

export interface Project {
  id: string;
  project_name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: ProjectStatus;
  github_url: string | null;
  notion_url: string | null;
  created_at: string;
  updated_at: string | null;
  members: ProjectMember[];
}

export interface CreateProjectInput {
  project_name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: ProjectStatus;
  github_url?: string | null;
  notion_url?: string | null;
}

export interface UpdateProjectInput extends CreateProjectInput {
  id: string;
}

export interface ProjectListParams {
  page?: string;
  keyword?: string;
  status?: ProjectStatus | '';
}

export interface CreateProjectMemberInput {
  project_id: string;
  employee_id: string;
  role: ProjectMemberRole;
}
