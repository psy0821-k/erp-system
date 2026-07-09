export const ATTENDANCE_STATUS = {
  PRESENT: 'PRESENT',
  LATE: 'LATE',
  ABSENT: 'ABSENT',
  BUSINESS_TRIP: 'BUSINESS_TRIP',
  VACATION: 'VACATION',
} as const;

export type AttendanceStatus = (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];

export const ATTENDANCE_STATUS_OPTIONS = [
  { title: '정상 출근', value: ATTENDANCE_STATUS.PRESENT },
  { title: '지각', value: ATTENDANCE_STATUS.LATE },
  { title: '결근', value: ATTENDANCE_STATUS.ABSENT },
  { title: '출장', value: ATTENDANCE_STATUS.BUSINESS_TRIP },
  { title: '휴가', value: ATTENDANCE_STATUS.VACATION },
];

export const ATTENDANCE_STATUS_LABEL: Record<AttendanceStatus, string> = {
  [ATTENDANCE_STATUS.PRESENT]: '정상 출근',
  [ATTENDANCE_STATUS.LATE]: '지각',
  [ATTENDANCE_STATUS.ABSENT]: '결근',
  [ATTENDANCE_STATUS.BUSINESS_TRIP]: '출장',
  [ATTENDANCE_STATUS.VACATION]: '휴가',
};
