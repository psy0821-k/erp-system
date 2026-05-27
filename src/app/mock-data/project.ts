// mock/projectStatus.ts

export const projectStatusData = [
  {
    id: 1,
    title: '진행중',
    count: 12,
    description: '현재 작업 중인 프로젝트',
    fill: 'bg-[var(--chart-blue)]',
  },
  {
    id: 2,
    title: '협의중',
    count: 5,
    description: '클라이언트 협의 단계',
    fill: 'bg-[var(--warning)]',
  },
  {
    id: 3,
    title: '완료',
    count: 28,
    description: '완료된 프로젝트',
    fill: 'bg-[var(--success)]',
  },
  {
    id: 4,
    title: '지연',
    count: 2,
    description: '일정 지연 프로젝트',
    fill: 'bg-[var(--danger)]',
  },
];
