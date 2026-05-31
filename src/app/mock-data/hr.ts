export const departments = [
  { id: 'D001', name: '경영지원팀', parentId: null, manager: '김민준', memberCount: 6 },
  { id: 'D002', name: '인사팀', parentId: 'D001', manager: '이서연', memberCount: 4 },
  { id: 'D003', name: '개발팀', parentId: null, manager: '박지훈', memberCount: 8 },
  { id: 'D004', name: '프론트엔드파트', parentId: 'D003', manager: '정하늘', memberCount: 4 },
  { id: 'D005', name: '백엔드파트', parentId: 'D003', manager: '최도윤', memberCount: 4 },
  { id: 'D006', name: '물류운영팀', parentId: null, manager: '한유진', memberCount: 7 },
];

export const employeeTableHeaders = [
  { key: 'id', label: '사번' },
  { key: 'name', label: '이름' },
  { key: 'department', label: '부서' },
  { key: 'position', label: '직급' },
  { key: 'role', label: '역할' },
  { key: 'phone', label: '연락처' },
  { key: 'status', label: '상태' },
];

export const employees = [
  {
    id: 'EMP001',
    name: '김민준',
    email: 'minjun.kim@cycompany.com',
    phone: '010-1234-1001',
    department: '경영지원팀',
    departmentId: 'D001',
    position: '부장',
    role: '팀장',
    hireDate: '2021-03-02',
    status: '재직',
  },
  {
    id: 'EMP002',
    name: '이서연',
    email: 'seoyeon.lee@cycompany.com',
    phone: '010-1234-1002',
    department: '인사팀',
    departmentId: 'D002',
    position: '과장',
    role: '팀장',
    hireDate: '2022-01-10',
    status: '재직',
  },
  {
    id: 'EMP003',
    name: '박지훈',
    email: 'jihoon.park@cycompany.com',
    phone: '010-1234-1003',
    department: '개발팀',
    departmentId: 'D003',
    position: '차장',
    role: '팀장',
    hireDate: '2020-09-14',
    status: '재직',
  },
  {
    id: 'EMP004',
    name: '정하늘',
    email: 'haneul.jung@cycompany.com',
    phone: '010-1234-1004',
    department: '프론트엔드파트',
    departmentId: 'D004',
    position: '대리',
    role: '파트장',
    hireDate: '2023-04-03',
    status: '재직',
  },
  {
    id: 'EMP005',
    name: '최도윤',
    email: 'doyoon.choi@cycompany.com',
    phone: '010-1234-1005',
    department: '백엔드파트',
    departmentId: 'D005',
    position: '대리',
    role: '파트장',
    hireDate: '2023-06-12',
    status: '재직',
  },
  {
    id: 'EMP006',
    name: '한유진',
    email: 'yujin.han@cycompany.com',
    phone: '010-1234-1006',
    department: '물류운영팀',
    departmentId: 'D006',
    position: '과장',
    role: '팀장',
    hireDate: '2021-11-01',
    status: '재직',
  },
  {
    id: 'EMP007',
    name: '오지후',
    email: 'jihu.oh@cycompany.com',
    phone: '010-1234-1007',
    department: '프론트엔드파트',
    departmentId: 'D004',
    position: '사원',
    role: '팀원',
    hireDate: '2024-02-19',
    status: '재직',
  },
  {
    id: 'EMP008',
    name: '강서준',
    email: 'seojun.kang@cycompany.com',
    phone: '010-1234-1008',
    department: '물류운영팀',
    departmentId: 'D006',
    position: '주임',
    role: '팀원',
    hireDate: '2024-05-07',
    status: '휴직',
  },
];

export const attendanceSummary = [
  { label: '정상 출근', count: 18 },
  { label: '지각', count: 2 },
  { label: '결근', count: 1 },
  { label: '휴가', count: 3 },
];

export const weeklyAttendance = [
  { day: '월', normal: 18, late: 2, absent: 1 },
  { day: '화', normal: 19, late: 1, absent: 1 },
  { day: '수', normal: 17, late: 3, absent: 1 },
  { day: '목', normal: 20, late: 1, absent: 0 },
  { day: '금', normal: 18, late: 2, absent: 1 },
];

export const recentHrActivities = [
  {
    id: 1,
    type: '입사',
    title: '오지후 사원 입사 처리',
    description: '프론트엔드파트 신규 입사자 등록 완료',
    date: '2026-05-27',
  },
  {
    id: 2,
    type: '근태',
    title: '강서준 주임 휴직 상태 변경',
    description: '물류운영팀 근무 상태가 휴직으로 변경됨',
    date: '2026-05-26',
  },
  {
    id: 3,
    type: '조직',
    title: '개발팀 하위 파트 정보 수정',
    description: '프론트엔드파트, 백엔드파트 조직 구조 반영',
    date: '2026-05-25',
  },
];

export const organizationTree = [
  {
    id: 'D001',
    name: '경영지원팀',
    manager: '김민준',
    children: [
      {
        id: 'D002',
        name: '인사팀',
        manager: '이서연',
        children: [],
      },
    ],
  },
  {
    id: 'D003',
    name: '개발팀',
    manager: '박지훈',
    children: [
      {
        id: 'D004',
        name: '프론트엔드파트',
        manager: '정하늘',
        children: [],
      },
      {
        id: 'D005',
        name: '백엔드파트',
        manager: '최도윤',
        children: [],
      },
    ],
  },
  {
    id: 'D006',
    name: '물류운영팀',
    manager: '한유진',
    children: [],
  },
];
