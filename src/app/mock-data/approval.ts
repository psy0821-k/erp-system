import { FileCheck, Laptop, Plane, ShoppingCart } from 'lucide-react';

export const pendingApprovalData = [
  {
    id: 1,
    title: '휴가 승인 요청',
    requester: '송소희',
    department: '디자인팀',
    date: '10분 전',
    status: '긴급',
    icon: Plane,
  },
  {
    id: 2,
    title: '노트북 구매 요청',
    requester: '사쿠라',
    department: '개발팀',
    date: '30분 전',
    status: '일반',
    icon: Laptop,
  },
  {
    id: 3,
    title: '프로젝트 예산 승인',
    requester: '김민수',
    department: '기획팀',
    date: '1시간 전',
    status: '신규',
    icon: FileCheck,
  },
  {
    id: 4,
    title: '비품 구매 요청',
    requester: '이하늘',
    department: '운영팀',
    date: '2시간 전',
    status: '일반',
    icon: ShoppingCart,
  },
];
