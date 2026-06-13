type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export const VACATION_TYPE = {
  ANNUAL: 'ANNUAL',
  HALF_DAY_AM: 'HALF_DAY_AM',
  HALF_DAY_PM: 'HALF_DAY_PM',
  SICK: 'SICK',
  OFFICIAL: 'OFFICIAL',
  BUSINESS_TRIP: 'BUSINESS_TRIP',
  COMPENSATORY: 'COMPENSATORY',
  ETC: 'ETC',
} as const;

export type VacationType = (typeof VACATION_TYPE)[keyof typeof VACATION_TYPE];

export interface Vacation {
  id: string;
  employee_id: string;
  name: string;
  vacation_title: string;
  vacation_type: VacationType;
  start_date: string;
  end_date: string;
  reason: string;
  status: ApprovalStatus;
  created_at: string;
}
export interface CreateVacationDTO {
  employee_id: string;
  name: string;
  vacation_title: string;
  vacation_type: VacationType;
  start_date: string;
  end_date: string;
  reason: string;
}

export interface VacationListParams {
  page?: number;
  keyword?: string;
  department?: string;
  status?: ApprovalStatus;
}
