export type NoticeType = 'SYSTEM' | 'HR' | 'PROJECT' | 'SECURITY';

export interface Notice {
  id: number;
  title: string;
  type: NoticeType;
  date: string;
  isNew: boolean;
}

export const noticesData: Notice[] = [
  {
    id: 1,
    title: 'ERP 시스템 정기 점검 안내',
    type: 'SYSTEM',
    date: '2026.05.27',
    isNew: true,
  },
  {
    id: 2,
    title: '6월 근태 마감 일정 안내',
    type: 'HR',
    date: '2026.05.26',
    isNew: true,
  },
  {
    id: 3,
    title: '신규 프로젝트 킥오프 일정 공유',
    type: 'PROJECT',
    date: '2026.05.25',
    isNew: false,
  },
  {
    id: 4,
    title: '사내 보안 교육 필수 이수 안내',
    type: 'SECURITY',
    date: '2026.05.24',
    isNew: false,
  },
  {
    id: 5,
    title: '휴가 신청 승인 프로세스 변경 안내',
    type: 'HR',
    date: '2026.05.23',
    isNew: false,
  },
];
