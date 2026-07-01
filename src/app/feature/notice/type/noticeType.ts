export interface Notice {
  id: string;
  title: string;
  content: string;
  author_id: string | null;
  is_pinned: boolean;
  created_at: string;
  updated_at: string | null;
  author?: {
    id: string;
    name: string;
    email: string;
    department: string;
    position: string;
  } | null;
}

export interface NoticeListParams {
  page?: string;
  keyword?: string;
}

export type DashboardNotice = {
  id: string;
  title: string;
  is_pinned: boolean;
  created_at: string;
  author: {
    id: string;
    name: string;
  } | null;
};
