# ERP System

사내 업무를 효율적으로 관리할 수 있는 ERP(Enterprise Resource Planning) 시스템입니다.

인사 관리, 전자결재, 프로젝트 관리, IT 자산 관리 기능을 중심으로 구성하였으며, 실제 기업에서 사용하는 업무 흐름을 참고하여 설계했습니다.

---

## 프로젝트 소개

기존 ERP 시스템은 기능이 많고 복잡하여 학습 난이도가 높습니다.

본 프로젝트는 프론트엔드 개발자로서 실제 업무 시스템을 구현하며 다음 역량을 증명하기 위해 제작되었습니다.

- 대규모 서비스 구조 설계
- 관리자 페이지 UI/UX 구현
- 인증 및 권한 관리
- 데이터 시각화
- 실무형 CRUD 개발
- Supabase 기반 백엔드 연동

---

## 개발 목표

### 1. 실무형 관리자 시스템 구현

쇼핑몰, 커뮤니티 중심의 포트폴리오에서 벗어나 실제 기업에서 사용하는 업무 시스템을 구현하는 것을 목표로 하였습니다.

### 2. 재사용 가능한 컴포넌트 설계

ERP 특성상 유사한 화면이 반복적으로 등장하기 때문에 재사용 가능한 구조를 고려하여 개발하였습니다.

예시

- 테이블 컴포넌트
- 검색 필터
- 모달
- 대시보드 카드
- 차트 컴포넌트

### 3. 유지보수 가능한 구조 설계

메뉴, 권한, API 호출 등을 모듈화하여 확장성을 고려했습니다.

---

## 기술 스택

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI
- Recharts
- Lucide React

### Backend

- Supabase

### State Management

- React Query (TanStack Query)

### Deployment

- Vercel

---

## 폴더 구조

```bash
src
├── app
│   ├── (auth)
│   ├── (dashboard)
│   └── api
│
├── components
│   ├── charts
│   ├── dashboard
│   ├── form
│   ├── layout
│   ├── table
│   └── ui
│
├── hooks
├── lib
├── services
├── store
├── types
├── constants
└── utils
```

---

## 주요 기능

### 대시보드

- 직원 현황 확인
- 근태 통계 확인
- 부서별 인원 비율
- 공지사항 조회
- IT 자산 현황 확인

### 인사 관리

- 직원 목록 조회
- 직원 정보 관리
- 근태 관리
- 휴가 관리

### 전자결재

- 결재 문서 작성
- 승인 및 반려 처리
- 결재 이력 관리
- 결재 상태 조회

### 프로젝트 관리

- 프로젝트 목록
- 프로젝트 진행 상태 관리
- 일정 관리

### IT 자산 관리

- 장비 등록
- 장비 현황 조회
- 자산 상태 관리
- 자산 사용 이력 관리

---

## 인증 및 권한 관리

Supabase Authentication을 활용하여 로그인 기능을 구현하였습니다.

권한별 접근 제어

- 관리자(Admin)
- 인사 담당자(HR Manager)
- 일반 직원(Employee)

로그인 여부 및 권한에 따라 접근 가능한 메뉴를 제한합니다.

---

## 데이터 시각화

Recharts를 활용하여 데이터를 시각적으로 표현했습니다.

제공 차트

- 부서별 인원 분포
- 근태 현황
- 월별 통계
- 프로젝트 진행 현황

---

## UI/UX 설계

### Accordion 기반 사이드바

ERP 메뉴 특성상 깊이가 있는 구조를 가지므로 Accordion UI를 채택했습니다.

장점

- 메뉴 확장성 확보
- 공간 활용 극대화
- 빠른 탐색 가능

### 다크 모드 지원

next-themes를 활용하여

- Light Mode
- Dark Mode

를 지원합니다.

---

## 기술적 의사결정

### Why Next.js?

- SSR 지원
- SEO 최적화
- 이미지 최적화
- App Router 기반 최신 구조

### Why Shadcn UI?

- 접근성(ARIA) 지원
- 높은 커스터마이징 자유도
- 디자인 시스템 구축 용이

### Why Supabase?

- 인증 기능 제공
- PostgreSQL 기반
- 빠른 백엔드 구축 가능
- 프론트엔드 중심 개발에 적합

### Why React Query?

- 서버 상태 관리
- 캐싱 지원
- 데이터 동기화
- 로딩 및 에러 처리 간소화

---

## 성능 최적화

- Server Component 활용
- Dynamic Import 적용
- React Query 캐싱
- 이미지 최적화
- 코드 분할(Code Splitting)
- 메모이제이션 적용

---

## 향후 개선 사항

- 실시간 알림 기능

## 트러블 슈팅 및 회고 요약

노션: (마지막 날 추가 예정)
ai 요약
