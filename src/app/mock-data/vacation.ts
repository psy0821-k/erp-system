import { CalendarDays, CheckCircle2, Clock3, XCircle } from 'lucide-react';

export const vacationSummary = [
  {
    title: '오늘 휴가자',
    value: '3명',
    description: '오늘 휴가 사용 직원',
    icon: CalendarDays,
  },
  {
    title: '승인 완료',
    value: '18건',
    description: '승인 처리 완료',
    icon: CheckCircle2,
  },
  {
    title: '승인 대기',
    value: '4건',
    description: '결재 대기 중',
    icon: Clock3,
  },
  {
    title: '반려',
    value: '2건',
    description: '반려된 신청',
    icon: XCircle,
  },
];

export const todayVacationEmployees = [
  {
    id: 'EMP002',
    name: '이서연',
    department: '인사팀',
    vacationType: '연차',
  },
  {
    id: 'EMP007',
    name: '오지후',
    department: '프론트엔드파트',
    vacationType: '반차',
  },
  {
    id: 'EMP009',
    name: '김민지',
    department: '물류운영팀',
    vacationType: '병가',
  },
];
