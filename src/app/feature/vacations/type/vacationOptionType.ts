import { VACATION_TYPE } from './vacationType';

export const vacationTypeOptions = [
  { value: VACATION_TYPE.ANNUAL, label: '연차' },
  { value: VACATION_TYPE.HALF_DAY_AM, label: '오전 반차' },
  { value: VACATION_TYPE.HALF_DAY_PM, label: '오후 반차' },
  { value: VACATION_TYPE.SICK, label: '병가' },
  { value: VACATION_TYPE.OFFICIAL, label: '공가' },
  { value: VACATION_TYPE.BUSINESS_TRIP, label: '출장' },
  { value: VACATION_TYPE.COMPENSATORY, label: '대체휴가' },
  { value: VACATION_TYPE.ETC, label: '기타' },
];
